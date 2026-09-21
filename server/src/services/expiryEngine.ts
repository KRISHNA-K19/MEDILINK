import { supabaseAdmin, isSupabaseConfigured } from '../config/supabase.js';

/**
 * Database-Driven Background Reservation Expiry Engine
 *
 * Scans PostgreSQL database for PENDING reservations where `expires_at < NOW()`.
 * Transitions status to 'EXPIRED' and creates persistent notifications.
 * Works seamlessly across server restarts, deployments, and background workers.
 */
export async function runReservationExpiryCheck(): Promise<number> {
  if (!isSupabaseConfigured()) {
    return 0; // Return gracefully if Supabase environment variables are unconfigured
  }

  try {
    const nowISO = new Date().toISOString();

    // Query pending expired reservations
    const { data: expiredReservations, error: fetchError } = await supabaseAdmin
      .from('reservations')
      .select('id, patient_id, pharmacy_id, reservation_number')
      .eq('status', 'PENDING')
      .lt('expires_at', nowISO);

    if (fetchError || !expiredReservations || expiredReservations.length === 0) {
      return 0;
    }

    const expiredIds = expiredReservations.map((r) => r.id);

    // Update status to EXPIRED
    const { error: updateError } = await supabaseAdmin
      .from('reservations')
      .update({ status: 'EXPIRED', status_reason: 'Reservation window expired without pharmacy review' })
      .in('id', expiredIds);

    if (updateError) {
      console.error('[EXPIRY_ENGINE] Failed to update reservation statuses:', updateError);
      return 0;
    }

    // Persist user notifications for expired reservations
    const notificationPayloads = expiredReservations.map((res) => ({
      user_id: res.patient_id,
      type: 'RESERVATION_EXPIRED',
      title: 'Reservation Expired',
      message: `Your reservation request ${res.reservation_number} has expired.`,
      reference_type: 'RESERVATION',
      reference_id: res.id,
      is_read: false,
    }));

    await supabaseAdmin.from('notifications').insert(notificationPayloads);

    console.log(`[EXPIRY_ENGINE] Successfully expired ${expiredReservations.length} pending reservations.`);
    return expiredReservations.length;
  } catch (error) {
    console.error('[EXPIRY_ENGINE_ERROR]', error);
    return 0;
  }
}

/**
 * Initializes recurring database check interval
 */
export function startExpiryCron(intervalMs = 60000) {
  // Execute initial scan
  runReservationExpiryCheck();

  // Schedule recurring check
  const timer = setInterval(() => {
    runReservationExpiryCheck();
  }, intervalMs);

  return () => clearInterval(timer);
}
