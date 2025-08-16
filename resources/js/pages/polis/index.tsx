import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Head, Link } from '@inertiajs/react';

interface Poli {
    id: number;
    name: string;
    code: string;
    description?: string;
    is_active: boolean;
    queues_count: number;
    created_at: string;
}

interface Props {
    polis: Poli[];
    [key: string]: unknown;
}

export default function PolisIndex({ polis }: Props) {
    return (
        <AppShell>
            <Head title="Data Poli" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Data Poliklinik</h1>
                        <p className="text-gray-600">Kelola data poliklinik puskesmas</p>
                    </div>
                    <Link
                        href="/polis/create"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center transition-colors"
                    >
                        ➕ Tambah Poli
                    </Link>
                </div>

                {/* Polis Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {polis.map((poli) => (
                        <div key={poli.id} className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{poli.name}</h3>
                                    <div className="text-sm text-gray-600 mb-2">Kode: {poli.code}</div>
                                    {poli.description && (
                                        <p className="text-gray-600 text-sm mb-3">{poli.description}</p>
                                    )}
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    poli.is_active 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {poli.is_active ? 'Aktif' : 'Non-aktif'}
                                </span>
                            </div>
                            
                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-blue-50 rounded-lg p-3 text-center">
                                    <div className="text-2xl font-bold text-blue-800">{poli.queues_count}</div>
                                    <div className="text-blue-600 text-xs">Total Antrian</div>
                                </div>
                                <div className="bg-green-50 rounded-lg p-3 text-center">
                                    <div className="text-2xl font-bold text-green-800">
                                        {poli.is_active ? '✅' : '❌'}
                                    </div>
                                    <div className="text-green-600 text-xs">Status</div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex space-x-2">
                                <Link
                                    href={`/polis/${poli.id}`}
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-3 rounded text-sm transition-colors"
                                >
                                    👁️ Lihat Detail
                                </Link>
                            </div>
                            
                            <div className="text-xs text-gray-400 mt-3">
                                Dibuat: {new Date(poli.created_at).toLocaleDateString('id-ID')}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {polis.length === 0 && (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <div className="text-6xl mb-4">🏥</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada data poli</h3>
                        <p className="text-gray-500 mb-6">
                            Mulai menambahkan data poliklinik untuk menggunakan sistem antrian.
                        </p>
                        <Link
                            href="/polis/create"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center transition-colors"
                        >
                            ➕ Tambah Poli Pertama
                        </Link>
                    </div>
                )}

                {/* Summary Stats */}
                <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg p-6 text-white">
                    <h2 className="text-xl font-bold mb-4">Ringkasan Poliklinik</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold">{polis.length}</div>
                            <div className="text-blue-100">Total Poli</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">{polis.filter(p => p.is_active).length}</div>
                            <div className="text-blue-100">Poli Aktif</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">
                                {polis.reduce((sum, p) => sum + p.queues_count, 0)}
                            </div>
                            <div className="text-blue-100">Total Antrian</div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}