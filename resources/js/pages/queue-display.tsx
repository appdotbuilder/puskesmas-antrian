import React from 'react';
import { Head } from '@inertiajs/react';

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
}

interface PoliWithQueues extends Poli {
    queues: Queue[];
}

interface Props {
    polis: PoliWithQueues[];
    currentlyServing: Queue[];
    nextQueues: Queue[];
    [key: string]: unknown;
}

export default function QueueDisplay({ polis, currentlyServing, nextQueues }: Props) {
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'serving':
                return 'bg-green-500 text-white';
            case 'called':
                return 'bg-yellow-500 text-white';
            case 'waiting':
                return 'bg-blue-500 text-white';
            case 'completed':
                return 'bg-gray-500 text-white';
            default:
                return 'bg-gray-300 text-gray-700';
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
        <>
            <Head title="Layar Antrian Puskesmas" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
                {/* Header */}
                <div className="bg-white shadow-lg border-b-4 border-blue-500">
                    <div className="container mx-auto px-6 py-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-blue-800">🏥 PUSKESMAS</h1>
                                <p className="text-blue-600">Sistem Antrian Online</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-blue-800">
                                    {currentTime.toLocaleTimeString('id-ID')}
                                </div>
                                <div className="text-blue-600">
                                    {currentTime.toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-8">
                    {/* Currently Serving */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                            🔊 Sedang Dilayani
                        </h2>
                        {currentlyServing.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {currentlyServing.map((queue) => (
                                    <div key={queue.id} className="bg-green-500 text-white p-6 rounded-lg shadow-lg animate-pulse">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold mb-2">{queue.queue_number}</div>
                                            <div className="text-xl mb-2">{queue.patient.name}</div>
                                            <div className="text-lg opacity-90">{queue.poli.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-100 p-8 rounded-lg text-center text-gray-600">
                                Tidak ada antrian yang sedang dilayani
                            </div>
                        )}
                    </div>

                    {/* Queue Status by Poli */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
                            📋 Status Antrian per Poli
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {polis.map((poli) => (
                                <div key={poli.id} className="bg-white rounded-lg shadow-lg p-6">
                                    <h3 className="text-xl font-bold text-blue-800 mb-4">{poli.name}</h3>
                                    <div className="space-y-3">
                                        {poli.queues.filter(q => q.status !== 'completed').length > 0 ? (
                                            poli.queues
                                                .filter(q => q.status !== 'completed')
                                                .slice(0, 5)
                                                .map((queue) => (
                                                    <div key={queue.id} className="flex justify-between items-center p-2 rounded">
                                                        <div>
                                                            <span className="font-semibold">{queue.queue_number}</span>
                                                            <span className="text-gray-600 ml-2">{queue.patient.name}</span>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(queue.status)}`}>
                                                            {getStatusText(queue.status)}
                                                        </span>
                                                    </div>
                                                ))
                                        ) : (
                                            <p className="text-gray-500 text-center py-4">Tidak ada antrian</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next in Queue */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-yellow-800 mb-6 flex items-center">
                            ⏳ Antrian Selanjutnya
                        </h2>
                        {nextQueues.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                                {nextQueues.slice(0, 5).map((queue) => (
                                    <div key={queue.id} className="bg-yellow-100 border border-yellow-300 p-4 rounded-lg text-center">
                                        <div className="text-xl font-bold text-yellow-800">{queue.queue_number}</div>
                                        <div className="text-gray-700">{queue.patient.name}</div>
                                        <div className="text-sm text-gray-600">{queue.poli.name}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-100 p-8 rounded-lg text-center text-gray-600">
                                Tidak ada antrian menunggu
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Pendaftaran Antrian</h3>
                            <p className="text-gray-600 mb-6">
                                Untuk mendaftar antrian baru, silakan hubungi petugas pendaftaran atau gunakan tombol di bawah ini.
                            </p>
                            <a
                                href="/registration"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg inline-flex items-center transition-colors"
                            >
                                📝 Daftar Antrian
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}