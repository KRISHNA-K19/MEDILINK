import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { SearchBar, FilterBar } from '@/components/ui/search-bar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AvailabilityBadge, VerificationBadge } from '@/components/ui/badges';
import { EmptyState, LoadingState } from '@/components/ui/states';
import { Building2, Pill, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import { apiFetch } from '@/lib/api';

export const PatientSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [availabilityFilter, setAvailabilityFilter] = useState('ALL');
  const [prescriptionFilter, setPrescriptionFilter] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [medicines, setMedicines] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Demo fallback medicines matching seed database
  const sampleMedicines = [
    {
      id: 'm1111111-1111-1111-1111-111111111111',
      name: 'Paracetamol 500mg',
      generic_name: 'Paracetamol / Acetaminophen',
      category: 'Analgesic',
      requires_prescription: false,
      availability: 'AVAILABLE' as const,
      pharmacy_name: 'Apollo Community Pharmacy',
      city: 'Chennai',
      address: '104 Healthcare Boulevard',
      verification_status: 'VERIFIED' as const,
    },
    {
      id: 'm2222222-2222-2222-2222-222222222222',
      name: 'Amoxicillin 500mg Capsules',
      generic_name: 'Amoxicillin Trihydrate',
      category: 'Antibiotics',
      requires_prescription: true,
      availability: 'LIMITED' as const,
      pharmacy_name: 'Apollo Community Pharmacy',
      city: 'Chennai',
      address: '104 Healthcare Boulevard',
      verification_status: 'VERIFIED' as const,
    },
    {
      id: 'm3333333-3333-3333-3333-333333333333',
      name: 'Metformin 850mg Tablets',
      generic_name: 'Metformin Hydrochloride',
      category: 'Diabetes Care',
      requires_prescription: true,
      availability: 'AVAILABLE' as const,
      pharmacy_name: 'MedPlus Wellness Pharmacy',
      city: 'Bengaluru',
      address: '55 Park Street, Sector 4',
      verification_status: 'VERIFIED' as const,
    },
    {
      id: 'm4444444-4444-4444-4444-444444444444',
      name: 'Atorvastatin 20mg Tablets',
      generic_name: 'Atorvastatin Calcium',
      category: 'Cardiology',
      requires_prescription: true,
      availability: 'UNAVAILABLE' as const,
      pharmacy_name: 'MedPlus Wellness Pharmacy',
      city: 'Bengaluru',
      address: '55 Park Street, Sector 4',
      verification_status: 'VERIFIED' as const,
    },
    {
      id: 'm5555555-5555-5555-5555-555555555555',
      name: 'Cetirizine 10mg Allergy Relief',
      generic_name: 'Cetirizine Hydrochloride',
      category: 'Allergy',
      requires_prescription: false,
      availability: 'AVAILABLE' as const,
      pharmacy_name: 'Apollo Community Pharmacy',
      city: 'Chennai',
      address: '104 Healthcare Boulevard',
      verification_status: 'VERIFIED' as const,
    },
  ];

  useEffect(() => {
    fetchMedicines();
  }, [query, availabilityFilter, prescriptionFilter, categoryFilter]);

  const fetchMedicines = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (availabilityFilter !== 'ALL') params.set('availability', availabilityFilter);
      if (prescriptionFilter) params.set('prescription', 'true');
      if (categoryFilter !== 'All') params.set('category', categoryFilter);

      const data = await apiFetch(`/api/medicines/search?${params.toString()}`);
      if (data.success && Array.isArray(data.data)) {
        setMedicines(data.data);
        setIsLoading(false);
        return;
      }
    } catch (e) {}

    // Fallback search filtering on sample data
    let filtered = [...sampleMedicines];
    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (m) => m.name.toLowerCase().includes(q) || m.generic_name.toLowerCase().includes(q)
      );
    }
    if (availabilityFilter !== 'ALL') {
      filtered = filtered.filter((m) => m.availability === availabilityFilter);
    }
    if (prescriptionFilter) {
      filtered = filtered.filter((m) => m.requires_prescription === true);
    }
    if (categoryFilter !== 'All') {
      filtered = filtered.filter((m) => m.category === categoryFilter);
    }

    setMedicines(filtered);
    setIsLoading(false);
  };

  return (
    <DashboardLayout role="PATIENT">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-medilink-navy font-heading">Search Medicines</h1>
          <p className="text-xs text-medilink-muted">Find medicines available at verified local pharmacies</p>
        </div>

        {/* Search Input Bar */}
        <SearchBar value={query} onChange={setQuery} onSearch={fetchMedicines} />

        {/* Filter Bar */}
        <FilterBar
          availability={availabilityFilter}
          onAvailabilityChange={setAvailabilityFilter}
          prescriptionOnly={prescriptionFilter}
          onPrescriptionOnlyChange={setPrescriptionFilter}
          category={categoryFilter}
          onCategoryChange={setCategoryFilter}
        />

        {/* Search Results */}
        {isLoading ? (
          <LoadingState message="Searching verified pharmacy network..." />
        ) : medicines.length === 0 ? (
          <EmptyState
            title="No medicines found"
            description="Try adjusting your search keywords or clearing filters to see more results."
            actionText="Clear Filters"
            onAction={() => {
              setQuery('');
              setAvailabilityFilter('ALL');
              setPrescriptionFilter(false);
              setCategoryFilter('All');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medicines.map((item) => (
              <Card key={item.id} hoverable className="flex flex-col justify-between p-5 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-medilink-navy font-heading">{item.name}</h3>
                      <p className="text-xs text-medilink-muted font-medium">Generic: {item.generic_name}</p>
                    </div>
                    <AvailabilityBadge status={item.availability} />
                  </div>

                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                      Category: {item.category}
                    </span>
                    {item.requires_prescription ? (
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold border border-amber-200 flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Prescription Required
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                        Over-The-Counter
                      </span>
                    )}
                  </div>

                  {/* Pharmacy Location Details */}
                  <div className="p-3 bg-medilink-surface rounded-lg border border-medilink-border text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-medilink-navy">
                      <Building2 className="w-3.5 h-3.5 text-medilink-teal" />
                      <span>{item.pharmacy_name}</span>
                      <VerificationBadge status={item.verification_status} className="ml-auto text-[10px]" />
                    </div>
                    <p className="text-medilink-muted">{item.address}, {item.city}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-medilink-border">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => navigate(`/patient/medicine/${item.id}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    disabled={item.availability === 'UNAVAILABLE'}
                    onClick={() => navigate(`/patient/reserve?medicineId=${item.id}`)}
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
