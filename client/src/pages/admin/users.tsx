import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badges';
import { Modal } from '@/components/ui/modal';
import { Users, ShieldAlert, CheckCircle2, UserCheck, UserX, AlertTriangle } from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  const [users, setUsers] = useState<any[]>([]);
  const [currentAdminId, setCurrentAdminId] = useState<string>('11111111-1111-1111-1111-111111111111');

  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sampleUsers = [
    {
      id: '11111111-1111-1111-1111-111111111111',
      full_name: 'MediLink System Admin',
      email: 'admin@demo.medilink.local',
      role: 'ADMIN',
      account_status: 'ACTIVE' as const,
      created_at: '2026-08-01',
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      full_name: 'Apollo Community Pharmacy Lead',
      email: 'apollo@demo.medilink.local',
      role: 'PHARMACY',
      account_status: 'ACTIVE' as const,
      created_at: '2026-08-10',
    },
    {
      id: '55555555-5555-5555-5555-555555555555',
      full_name: 'Sarah Jenkins',
      email: 'patient@demo.medilink.local',
      role: 'PATIENT',
      account_status: 'ACTIVE' as const,
      created_at: '2026-08-15',
    },
    {
      id: '66666666-6666-6666-6666-666666666666',
      full_name: 'Suspended Account User',
      email: 'suspended@demo.medilink.local',
      role: 'PATIENT',
      account_status: 'SUSPENDED' as const,
      created_at: '2026-08-20',
    },
  ];

  useEffect(() => {
    setUsers(sampleUsers);
  }, []);

  const handleToggleStatus = (targetUser: any) => {
    setErrorMessage(null);

    // Prevent Admin Self-Suspension
    if (targetUser.id === currentAdminId) {
      setErrorMessage('Security Violation: Administrators are prohibited from suspending their own admin account.');
      return;
    }

    setSelectedUser(targetUser);
    setShowModal(true);
  };

  const confirmToggleStatus = async () => {
    if (!selectedUser) return;

    const nextStatus = selectedUser.account_status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';

    try {
      await fetch(`/api/admin/users/${selectedUser.id}/${nextStatus.toLowerCase()}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('medilink_token') || ''}` },
      });
    } catch (e) {}

    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? { ...u, account_status: nextStatus } : u))
    );

    setShowModal(false);
  };

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-medilink-navy font-heading">User Account Management</h1>
          <p className="text-xs text-medilink-muted">Manage system authentication access and role status enforcement</p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-medilink-danger flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-medilink-surface border-b border-medilink-border text-medilink-navy font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">User Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Account Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((item) => {
                  const isSelf = item.id === currentAdminId;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 font-bold text-medilink-navy flex items-center gap-2">
                        <span>{item.full_name}</span>
                        {isSelf && (
                          <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            You (Current)
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-medilink-muted font-mono">{item.email}</td>
                      <td className="p-4 font-semibold text-medilink-navy">{item.role}</td>
                      <td className="p-4">
                        {item.account_status === 'ACTIVE' ? (
                          <Badge variant="success">Active</Badge>
                        ) : (
                          <Badge variant="danger">Suspended</Badge>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant={item.account_status === 'ACTIVE' ? 'danger' : 'success'}
                          size="sm"
                          disabled={isSelf}
                          onClick={() => handleToggleStatus(item)}
                        >
                          {item.account_status === 'ACTIVE' ? 'Suspend' : 'Reinstate'}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Confirmation Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={`Confirm ${selectedUser?.account_status === 'ACTIVE' ? 'Suspension' : 'Reinstatement'}`}
        >
          <div className="space-y-4 text-xs">
            <p className="text-medilink-muted">
              Are you sure you want to {selectedUser?.account_status === 'ACTIVE' ? 'suspend' : 'reinstate'}{' '}
              <strong>{selectedUser?.full_name}</strong> ({selectedUser?.email})?
            </p>

            <div className="flex justify-end gap-2 pt-2 border-t border-medilink-border">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button
                variant={selectedUser?.account_status === 'ACTIVE' ? 'danger' : 'success'}
                onClick={confirmToggleStatus}
              >
                Confirm {selectedUser?.account_status === 'ACTIVE' ? 'Suspend' : 'Reinstate'}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};
