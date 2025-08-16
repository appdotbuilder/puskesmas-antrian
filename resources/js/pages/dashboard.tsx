import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';

interface Patient {
    id: number;
    name: string;
}

interface Poli {
    id: number;
    name: string;
    code: string;
    queues_count: number;
    waiting_count: number;
    serving_count: number;
}

interface Queue {
    id: number;
    queue_number: string;
    status: string;
    patient: Patient;
    poli: Poli;
    created_at: string;
}

interface Stats {
    todayQueues: number;
    totalPatients: number;
    activePolis: number;
    currentlyServing: number;
}

interface Props {
    stats: Stats;
    queuesByPoli: Poli[];
    recentQueues: Queue[];
    doctorQueues?: Queue[];
    userRole: string;
    [key: string]: unknown;
}

export default function Dashboard({ stats, queuesByPoli, recentQueues, doctorQueues, userRole }: Props) {
    const handleCallQueue = (queueId: number) => {
        router.patch(`/queues/${queueId}`, { status: 'called' }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleServeQueue = (queueId: number) => {
        router.patch(`/queues/${queueId}`, { status: 'serving' }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleCompleteQueue = (queueId: number) => {
        router.patch(`/queues/${queueId}`, { status: 'completed' }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'serving':
                return 'bg-green-100 text-green-800';
            case 'called':
                return 'bg-yellow-100 text-yellow-800';
            case 'waiting':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'serving':
                return 'Sedang Dilayani';
            case 'called':
                return 'Dipanggil';
            case 'waiting':
                return 'Menunggu';
            case 'completed':
                return 'Selesai';
            default:
                return status;
        }
    };

    return (
        <AppShell>
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard Sistem Antrian</h1>
                    <p className="text-gray-600">
                        {userRole === 'doctor' ? 'Panel Dokter' : 
                         userRole === 'registration' ? 'Panel Petugas Pendaftaran' : 
                         'Panel Administrator'}
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">📋</div>
                            <div>
                                <div className="text-2xl font-bold text-blue-800">{stats.todayQueues}</div>
                                <div className="text-blue-600">Antrian Hari Ini</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">👥</div>
                            <div>
                                <div className="text-2xl font-bold text-green-800">{stats.totalPatients}</div>
                                <div className="text-green-600">Total Pasien</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">🏥</div>
                            <div>
                                <div className="text-2xl font-bold text-purple-800">{stats.activePolis}</div>
                                <div className="text-purple-600">Poli Aktif</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">🔊</div>
                            <div>
                                <div className="text-2xl font-bold text-yellow-800">{stats.currentlyServing}</div>
                                <div className="text-yellow-600">Sedang Dilayani</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Doctor Panel */}
                {userRole === 'doctor' && doctorQueues && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Antrian Poli Saya</h2>
                        
                        {doctorQueues.length > 0 ? (
                            <div className="space-y-4">
                                {doctorQueues.map((queue) => (
                                    <div key={queue.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-lg font-bold">{queue.queue_number}</span>
                                                    <span className="text-gray-700">{queue.patient.name}</span>
                                                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(queue.status)}`}>
                                                        {getStatusText(queue.status)}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    Didaftarkan: {new Date(queue.created_at).toLocaleString('id-ID')}
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                {queue.status === 'waiting' && (
                                                    <button
                                                        onClick={() => handleCallQueue(queue.id)}
                                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        Panggil
                                                    </button>
                                                )}
                                                {queue.status === 'called' && (
                                                    <button
                                                        onClick={() => handleServeQueue(queue.id)}
                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        Layani
                                                    </button>
                                                )}
                                                {queue.status === 'serving' && (
                                                    <button
                                                        onClick={() => handleCompleteQueue(queue.id)}
                                                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        Selesai
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 py-8">
                                Tidak ada antrian untuk poli Anda hari ini
                            </div>
                        )}
                    </div>
                )}

                {/* Queue Status by Poli */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Status Antrian per Poli</h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {queuesByPoli.map((poli) => (
                            <div key={poli.id} className="border border-gray-200 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-3">{poli.name}</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Total Antrian:</span>
                                        <span className="font-semibold">{poli.queues_count}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Menunggu:</span>
                                        <span className="font-semibold text-blue-600">{poli.waiting_count}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Sedang Dilayani:</span>
                                        <span className="font-semibold text-green-600">{poli.serving_count}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Queues */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Antrian Terbaru</h2>
                    
                    {recentQueues.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-2">Nomor Antrian</th>
                                        <th className="text-left py-2">Pasien</th>
                                        <th className="text-left py-2">Poli</th>
                                        <th className="text-left py-2">Status</th>
                                        <th className="text-left py-2">Waktu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentQueues.map((queue) => (
                                        <tr key={queue.id} className="border-b border-gray-100">
                                            <td className="py-2 font-semibold">{queue.queue_number}</td>
                                            <td className="py-2">{queue.patient.name}</td>
                                            <td className="py-2">{queue.poli.name}</td>
                                            <td className="py-2">
                                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(queue.status)}`}>
                                                    {getStatusText(queue.status)}
                                                </span>
                                            </td>
                                            <td className="py-2 text-sm text-gray-500">
                                                {new Date(queue.created_at).toLocaleString('id-ID')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            Belum ada antrian hari ini
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <a
                        href="/registration"
                        className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg text-center transition-colors"
                    >
                        <div className="text-2xl mb-2">📝</div>
                        <div className="font-semibold">Daftar Antrian</div>
                    </a>
                    
                    <a
                        href="/patients"
                        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg text-center transition-colors"
                    >
                        <div className="text-2xl mb-2">👥</div>
                        <div className="font-semibold">Data Pasien</div>
                    </a>
                    
                    <a
                        href="/polis"
                        className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg text-center transition-colors"
                    >
                        <div className="text-2xl mb-2">🏥</div>
                        <div className="font-semibold">Kelola Poli</div>
                    </a>
                    
                    <a
                        href="/queues"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-lg text-center transition-colors"
                    >
                        <div className="text-2xl mb-2">📋</div>
                        <div className="font-semibold">Semua Antrian</div>
                    </a>
                </div>
            </div>
        </AppShell>
    );
}