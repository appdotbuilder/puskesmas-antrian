import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Head, Link } from '@inertiajs/react';

interface Patient {
    id: number;
    name: string;
    identity_number: string;
    birth_date: string;
    gender: string;
    phone?: string;
    address?: string;
    created_at: string;
}

interface Pagination {
    current_page: number;
    data: Patient[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url?: string;
    path: string;
    per_page: number;
    prev_page_url?: string;
    to: number;
    total: number;
}

interface Props {
    patients: Pagination;
    [key: string]: unknown;
}

export default function PatientsIndex({ patients }: Props) {
    return (
        <AppShell>
            <Head title="Data Pasien" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Data Pasien</h1>
                        <p className="text-gray-600">Kelola data pasien puskesmas</p>
                    </div>
                    <Link
                        href="/patients/create"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center transition-colors"
                    >
                        ➕ Tambah Pasien
                    </Link>
                </div>

                {/* Patients Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Pasien
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        NIK
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tanggal Lahir
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Jenis Kelamin
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kontak
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {patients.data.map((patient) => (
                                    <tr key={patient.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {patient.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    ID: {patient.id}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {patient.identity_number}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {new Date(patient.birth_date).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                {patient.gender === 'male' ? '👨 Laki-laki' : '👩 Perempuan'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {patient.phone || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link
                                                href={`/patients/${patient.id}`}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                Lihat
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {patients.last_page > 1 && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                {patients.prev_page_url && (
                                    <a
                                        href={patients.prev_page_url}
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Previous
                                    </a>
                                )}
                                {patients.next_page_url && (
                                    <a
                                        href={patients.next_page_url}
                                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Next
                                    </a>
                                )}
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Menampilkan{' '}
                                        <span className="font-medium">{patients.from}</span> sampai{' '}
                                        <span className="font-medium">{patients.to}</span> dari{' '}
                                        <span className="font-medium">{patients.total}</span> hasil
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        {patients.prev_page_url && (
                                            <a
                                                href={patients.prev_page_url}
                                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                            >
                                                ←
                                            </a>
                                        )}
                                        
                                        <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
                                            {patients.current_page}
                                        </span>
                                        
                                        {patients.next_page_url && (
                                            <a
                                                href={patients.next_page_url}
                                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                            >
                                                →
                                            </a>
                                        )}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Empty State */}
                {patients.data.length === 0 && (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <div className="text-6xl mb-4">👥</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada data pasien</h3>
                        <p className="text-gray-500 mb-6">
                            Mulai menambahkan data pasien untuk menggunakan sistem antrian.
                        </p>
                        <Link
                            href="/patients/create"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center transition-colors"
                        >
                            ➕ Tambah Pasien Pertama
                        </Link>
                    </div>
                )}
            </div>
        </AppShell>
    );
}