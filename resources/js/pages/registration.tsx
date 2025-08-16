import React from 'react';
import { Head, router } from '@inertiajs/react';

interface Patient {
    id: number;
    name: string;
    identity_number: string;
    birth_date: string;
    gender: string;
    phone?: string;
    address?: string;
}

interface Poli {
    id: number;
    name: string;
    code: string;
    description?: string;
}

interface Props {
    polis: Poli[];
    patients: Patient[];
    [key: string]: unknown;
}

export default function Registration({ polis, patients }: Props) {
    const [selectedPatient, setSelectedPatient] = React.useState<Patient | null>(null);
    const [selectedPoli, setSelectedPoli] = React.useState<number | null>(null);
    const [isNewPatient, setIsNewPatient] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    
    const [newPatientData, setNewPatientData] = React.useState({
        name: '',
        identity_number: '',
        birth_date: '',
        gender: '',
        phone: '',
        address: ''
    });

    const handleSubmitQueue = () => {
        if (!selectedPatient || !selectedPoli) {
            alert('Silakan pilih pasien dan poli terlebih dahulu.');
            return;
        }

        setIsSubmitting(true);
        
        router.post('/queues', {
            patient_id: selectedPatient.id,
            poli_id: selectedPoli
        }, {
            onSuccess: () => {
                alert('Antrian berhasil didaftarkan!');
                setSelectedPatient(null);
                setSelectedPoli(null);
                setIsSubmitting(false);
            },
            onError: () => {
                alert('Terjadi kesalahan. Silakan coba lagi.');
                setIsSubmitting(false);
            }
        });
    };

    const handleCreatePatient = () => {
        if (!newPatientData.name || !newPatientData.identity_number || !newPatientData.birth_date || !newPatientData.gender) {
            alert('Silakan lengkapi data yang wajib diisi.');
            return;
        }

        setIsSubmitting(true);
        
        router.post('/patients', newPatientData, {
            onSuccess: () => {
                alert('Data pasien berhasil disimpan!');
                setNewPatientData({
                    name: '',
                    identity_number: '',
                    birth_date: '',
                    gender: '',
                    phone: '',
                    address: ''
                });
                setIsNewPatient(false);
                setIsSubmitting(false);
                // Reload to get updated patient list
                window.location.reload();
            },
            onError: () => {
                alert('Terjadi kesalahan. Silakan coba lagi.');
                setIsSubmitting(false);
            }
        });
    };

    return (
        <>
            <Head title="Pendaftaran Antrian" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
                {/* Header */}
                <div className="bg-white shadow-lg border-b-4 border-blue-500">
                    <div className="container mx-auto px-6 py-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-blue-800">📝 Pendaftaran Antrian</h1>
                                <p className="text-blue-600">Silakan pilih pasien dan poli tujuan</p>
                            </div>
                            <a
                                href="/"
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                ← Kembali ke Layar Antrian
                            </a>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-8">
                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* Patient Selection */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                👤 Pilih Pasien
                            </h2>
                            
                            <div className="mb-4">
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => setIsNewPatient(false)}
                                        className={`px-4 py-2 rounded-lg transition-colors ${
                                            !isNewPatient
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        Pasien Existing
                                    </button>
                                    <button
                                        onClick={() => setIsNewPatient(true)}
                                        className={`px-4 py-2 rounded-lg transition-colors ${
                                            isNewPatient
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        Pasien Baru
                                    </button>
                                </div>
                            </div>

                            {isNewPatient ? (
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Lengkap *
                                        </label>
                                        <input
                                            type="text"
                                            value={newPatientData.name}
                                            onChange={(e) => setNewPatientData({ ...newPatientData, name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Masukkan nama lengkap"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            NIK/Nomor Identitas *
                                        </label>
                                        <input
                                            type="text"
                                            value={newPatientData.identity_number}
                                            onChange={(e) => setNewPatientData({ ...newPatientData, identity_number: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Masukkan NIK"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tanggal Lahir *
                                        </label>
                                        <input
                                            type="date"
                                            value={newPatientData.birth_date}
                                            onChange={(e) => setNewPatientData({ ...newPatientData, birth_date: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Jenis Kelamin *
                                        </label>
                                        <select
                                            value={newPatientData.gender}
                                            onChange={(e) => setNewPatientData({ ...newPatientData, gender: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Pilih jenis kelamin</option>
                                            <option value="male">Laki-laki</option>
                                            <option value="female">Perempuan</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nomor Telepon
                                        </label>
                                        <input
                                            type="text"
                                            value={newPatientData.phone}
                                            onChange={(e) => setNewPatientData({ ...newPatientData, phone: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Masukkan nomor telepon"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Alamat
                                        </label>
                                        <textarea
                                            value={newPatientData.address}
                                            onChange={(e) => setNewPatientData({ ...newPatientData, address: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Masukkan alamat lengkap"
                                            rows={3}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <button
                                            onClick={handleCreatePatient}
                                            disabled={isSubmitting}
                                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
                                        >
                                            {isSubmitting ? 'Menyimpan...' : 'Simpan Pasien Baru'}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            placeholder="Cari pasien berdasarkan nama atau NIK..."
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onChange={(e) => {
                                                // Simple client-side search functionality can be added here
                                                console.log('Search term:', e.target.value.toLowerCase());
                                            }}
                                        />
                                    </div>
                                    <div className="grid gap-2 max-h-60 overflow-y-auto">
                                        {patients.map((patient) => (
                                            <div
                                                key={patient.id}
                                                onClick={() => setSelectedPatient(patient)}
                                                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                                    selectedPatient?.id === patient.id
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <div className="font-semibold">{patient.name}</div>
                                                        <div className="text-sm text-gray-600">{patient.identity_number}</div>
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {patient.gender === 'male' ? '👨' : '👩'} 
                                                        {new Date(patient.birth_date).toLocaleDateString('id-ID')}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Poli Selection */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                🏥 Pilih Poliklinik
                            </h2>
                            
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {polis.map((poli) => (
                                    <div
                                        key={poli.id}
                                        onClick={() => setSelectedPoli(poli.id)}
                                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                            selectedPoli === poli.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="text-center">
                                            <div className="text-lg font-semibold text-gray-800">{poli.name}</div>
                                            <div className="text-sm text-gray-600">{poli.code}</div>
                                            {poli.description && (
                                                <div className="text-xs text-gray-500 mt-2">{poli.description}</div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Section */}
                        {selectedPatient && selectedPoli && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                <h3 className="text-lg font-bold text-green-800 mb-4">Konfirmasi Pendaftaran</h3>
                                <div className="mb-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <strong>Pasien:</strong> {selectedPatient.name}
                                            <br />
                                            <span className="text-sm text-gray-600">{selectedPatient.identity_number}</span>
                                        </div>
                                        <div>
                                            <strong>Poli:</strong> {polis.find(p => p.id === selectedPoli)?.name}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSubmitQueue}
                                    disabled={isSubmitting}
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 w-full md:w-auto"
                                >
                                    {isSubmitting ? 'Mendaftarkan...' : '✅ Daftarkan Antrian'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}