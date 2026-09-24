import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AvailabilityBadge } from '@/components/ui/badges';
import { Modal } from '@/components/ui/modal';
import { EmptyState, LoadingState } from '@/components/ui/states';
import { Pill, Plus, Edit2, Trash2, ShieldAlert } from 'lucide-react';
import { apiFetch } from '@/lib/api';

export const PharmacyInventoryPage: React.FC = () => {
  const [verificationStatus] = useState<'VERIFIED' | 'PENDING'>('VERIFIED');
  const [medicines, setMedicines] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<any | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [genericName, setGenericName] = useState('');
  const [category, setCategory] = useState('General');
  const [requiresPrescription, setRequiresPrescription] = useState(false);
  const [availability, setAvailability] = useState<'AVAILABLE' | 'LIMITED' | 'UNAVAILABLE'>('AVAILABLE');
  const [internalQty, setInternalQty] = useState(100);

  const sampleInventory = [
    {
      id: 'm1111111-1111-1111-1111-111111111111',
      name: 'Paracetamol 500mg',
      generic_name: 'Paracetamol / Acetaminophen',
      category: 'Analgesic',
      requires_prescription: false,
      availability: 'AVAILABLE' as const,
      internal_stock_qty: 120,
    },
    {
      id: 'm2222222-2222-2222-2222-222222222222',
      name: 'Amoxicillin 500mg Capsules',
      generic_name: 'Amoxicillin Trihydrate',
      category: 'Antibiotics',
      requires_prescription: true,
      availability: 'LIMITED' as const,
      internal_stock_qty: 15,
    },
    {
      id: 'm5555555-5555-5555-5555-555555555555',
      name: 'Cetirizine 10mg Allergy Relief',
      generic_name: 'Cetirizine Hydrochloride',
      category: 'Allergy',
      requires_prescription: false,
      availability: 'AVAILABLE' as const,
      internal_stock_qty: 200,
    },
  ];

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const data = await apiFetch('/api/pharmacy/medicines');
      if (data.success && Array.isArray(data.data)) {
        setMedicines(data.data);
        setIsLoading(false);
        return;
      }
    } catch (e) {}
    setMedicines(sampleInventory);
    setIsLoading(false);
  };

  const handleOpenAdd = () => {
    setEditingMedicine(null);
    setName('');
    setGenericName('');
    setCategory('General');
    setRequiresPrescription(false);
    setAvailability('AVAILABLE');
    setInternalQty(100);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingMedicine(item);
    setName(item.name);
    setGenericName(item.generic_name);
    setCategory(item.category);
    setRequiresPrescription(item.requires_prescription);
    setAvailability(item.availability);
    setInternalQty(item.internal_stock_qty || 0);
    setIsModalOpen(true);
  };

  const handleSaveMedicine = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingMedicine) {
      setMedicines((prev) =>
        prev.map((m) =>
          m.id === editingMedicine.id
            ? {
                ...m,
                name,
                generic_name: genericName,
                category,
                requires_prescription: requiresPrescription,
                availability,
                internal_stock_qty: internalQty,
              }
            : m
        )
      );
    } else {
      const newItem = {
        id: `m-${Date.now()}`,
        name,
        generic_name: genericName,
        category,
        requires_prescription: requiresPrescription,
        availability,
        internal_stock_qty: internalQty,
      };
      setMedicines((prev) => [newItem, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteMedicine = (id: string) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <DashboardLayout role="PHARMACY">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-medilink-navy font-heading">Medicine Inventory Management</h1>
            <p className="text-xs text-medilink-muted">Configure qualitative stock signals for public patient discovery</p>
          </div>

          {verificationStatus === 'VERIFIED' && (
            <Button variant="primary" onClick={handleOpenAdd}>
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Add New Medicine</span>
            </Button>
          )}
        </div>

        {/* Unverified Pharmacy Guard Notice */}
        {verificationStatus !== 'VERIFIED' && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 text-xs text-amber-800 font-medium">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>
              Unverified pharmacies cannot manage publicly visible inventory until administrative verification is complete.
            </span>
          </div>
        )}

        {/* Inventory List */}
        {isLoading ? (
          <LoadingState message="Loading inventory records..." />
        ) : medicines.length === 0 ? (
          <EmptyState
            title="No inventory records"
            description="Add medicines to your pharmacy catalog to allow local patients to discover availability."
            actionText="Add First Medicine"
            onAction={handleOpenAdd}
          />
        ) : (
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-medilink-surface border-b border-medilink-border text-medilink-navy font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Medicine Name</th>
                    <th className="p-4">Generic Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Prescription</th>
                    <th className="p-4">Qualitative Availability</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {medicines.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 font-bold text-medilink-navy">{item.name}</td>
                      <td className="p-4 text-medilink-muted">{item.generic_name}</td>
                      <td className="p-4 text-slate-700 font-medium">{item.category}</td>
                      <td className="p-4">
                        {item.requires_prescription ? (
                          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                            Required
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                            OTC
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <AvailabilityBadge status={item.availability} />
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-slate-600 hover:text-medilink-teal hover:bg-white rounded transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMedicine(item.id)}
                          className="p-1.5 text-slate-600 hover:text-medilink-danger hover:bg-white rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Add / Edit Medicine Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingMedicine ? 'Edit Medicine Stock' : 'Add New Medicine'}
        >
          <form onSubmit={handleSaveMedicine} className="space-y-4 text-xs">
            <Input label="Medicine Brand Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label="Generic Name" value={genericName} onChange={(e) => setGenericName(e.target.value)} required />

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block font-semibold uppercase text-medilink-navy">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-white border border-medilink-border rounded-lg text-xs font-medium focus:ring-2 focus:ring-medilink-teal"
                >
                  <option value="Analgesic">Analgesic</option>
                  <option value="Antibiotics">Antibiotics</option>
                  <option value="Diabetes Care">Diabetes Care</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Allergy">Allergy</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold uppercase text-medilink-navy">Qualitative Status</label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value as any)}
                  className="w-full p-2.5 bg-white border border-medilink-border rounded-lg text-xs font-medium focus:ring-2 focus:ring-medilink-teal"
                >
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="LIMITED">LIMITED</option>
                  <option value="UNAVAILABLE">UNAVAILABLE</option>
                </select>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={requiresPrescription}
                onChange={(e) => setRequiresPrescription(e.target.checked)}
                className="rounded text-medilink-teal"
              />
              <span className="font-semibold text-medilink-navy">Requires Prescription Upload</span>
            </label>

            <div className="flex justify-end gap-2 pt-4 border-t border-medilink-border">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Medicine
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};
