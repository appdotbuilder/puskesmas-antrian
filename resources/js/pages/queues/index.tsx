import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Head, router } from '@inertiajs/react';

interface Patient {
    id: number;
    name: string;
}

interface Poli {
    id: number;
    name: string;
    code: string;
}

interface Queue {
    id: number;
    queue_number: string;
    status: string;
    patient: Patient;
    poli: Poli;
    created_at: string;
    called_at?: string;
    served_at?: string;
    completed_at?: string;
}

interface Props {
    queues: Queue[];
    [key: string]: unknown;
}

export default function QueuesIndex({ queues }: Props) {
    const handleUpdateStatus = (queueId: number, status: string) => {
        router.patch(`/queues/${queueId}`, { status }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'serving':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'called':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'waiting':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'completed':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'skipped':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
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
            case 'skipped':
                return 'Dilewati';
            default:
                return status;
        }
    };

    const groupedQueues = queues.reduce((acc, queue) => {
        const poliName = queue.poli.name;
        if (!acc[poliName]) {
            acc[poliName] = [];
        }
        acc[poliName].push(queue);
        return acc;
    }, {} as Record<string, Queue[]>);

    return (
        <AppShell>
            <Head title="Kelola Antrian" />

            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Kelola Antrian Hari Ini</h1>
                    <p className="text-gray-600">
                        Total {queues.length} antrian untuk {new Date().toLocaleDateString('id-ID', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-800">
                            {queues.filter(q => q.status === 'waiting').length}
                        </div>
                        <div className="text-blue-600 text-sm">Menunggu</div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-800">
                            {queues.filter(q => q.status === 'called').length}
                        </div>
                        <div className="text-yellow-600 text-sm">Dipanggil</div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-800">
                            {queues.filter(q => q.status === 'serving').length}
                        </div>
                        <div className="text-green-600 text-sm">Dilayani</div>
                    </div>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-gray-800">
                            {queues.filter(q => q.status === 'completed').length}
                        </div>
                        <div className="text-gray-600 text-sm">Selesai</div>
                    </div>
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-800">
                            {queues.filter(q => q.status === 'skipped').length}
                        </div>
                        <div className="text-red-600 text-sm">Dilewati</div>
                    </div>
                </div>

                {/* Queues by Poli */}
                {Object.entries(groupedQueues).map(([poliName, poliQueues]) => (
                    <div key={poliName} className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">{poliName}</h2>
                            <p className="text-gray-600">{poliQueues.length} antrian</p>
                        </div>
                        
                        <div className="p-6">
                            {poliQueues.length > 0 ? (
                                <div className="space-y-4">
                                    {poliQueues
                                        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                                        .map((queue) => (
                                            <div 
                                                key={queue.id} 
                                                className={`border rounded-lg p-4 ${getStatusColor(queue.status)}`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-4">
                                                            <span className="text-2xl font-bold">
                                                                {queue.queue_number}
                                                            </span>
                                                            <div>
                                                                <div className="font-semibold text-gray-900">
                                                                    {queue.patient.name}
                                                                </div>
                                                                <div className="text-sm text-gray-600">
                                                                    Didaftarkan: {new Date(queue.created_at).toLocaleTimeString('id-ID')}
                                                                </div>
                                                                {queue.called_at && (
                                                                    <div className="text-sm text-gray-600">
                                                                        Dipanggil: {new Date(queue.called_at).toLocaleTimeString('id-ID')}
                                                                    </div>
                                                                )}
                                                                {queue.served_at && (
                                                                    <div className="text-sm text-gray-600">
                                                                        Dilayani: {new Date(queue.served_at).toLocaleTimeString('id-ID')}
                                                                    </div>
                                                                )}
                                                                {queue.completed_at && (
                                                                    <div className="text-sm text-gray-600">
                                                                        Selesai: {new Date(queue.completed_at).toLocaleTimeString('id-ID')}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-center space-x-3">
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(queue.status)}`}>
                                                            {getStatusText(queue.status)}
                                                        </span>
                                                        
                                                        <div className="flex space-x-2">
                                                            {queue.status === 'waiting' && (
                                                                <>
                                                                    <button
                                                                        onClick={() => handleUpdateStatus(queue.id, 'called')}
                                                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                                                    >
                                                                        📢 Panggil
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleUpdateStatus(queue.id, 'skipped')}
                                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                                                    >
                                                                        ⏭️ Lewati
                                                                    </button>
                                                                </>
                                                            )}
                                                            
                                                            {queue.status === 'called' && (
                                                                <>
                                                                    <button
                                                                        onClick={() => handleUpdateStatus(queue.id, 'serving')}
                                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                                                    >
                                                                        🏥 Layani
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleUpdateStatus(queue.id, 'waiting')}
                                                                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                                                    >
                                                                        ↩️ Tunggu
                                                                    </button>
                                                                </>
                                                            )}
                                                            
                                                            {queue.status === 'serving' && (
                                                                <button
                                                                    onClick={() => handleUpdateStatus(queue.id, 'completed')}
                                                                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                                                >
                                                                    ✅ Selesai
                                                                </button>
                                                            )}
                                                            
                                                            {queue.status === 'skipped' && (
                                                                <button
                                                                    onClick={() => handleUpdateStatus(queue.id, 'waiting')}
                                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                                                >
                                                                    🔄 Aktifkan
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 py-8">
                                    Tidak ada antrian untuk poli ini
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Empty State */}
                {queues.length === 0 && (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <div className="text-6xl mb-4">📋</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada antrian hari ini</h3>
                        <p className="text-gray-500 mb-6">
                            Antrian akan muncul di sini setelah pasien mendaftar.
                        </p>
                        <a
                            href="/registration"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center transition-colors"
                        >
                            📝 Daftar Antrian Baru
                        </a>
                    </div>
                )}
            </div>
        </AppShell>
    );
}