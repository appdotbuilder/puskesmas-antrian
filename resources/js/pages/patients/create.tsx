import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';

interface PatientFormData {
    name: string;
    identity_number: string;
    birth_date: string;
    gender: string;
    phone: string;
    address: string;
    [key: string]: string;
}

export default function PatientsCreate() {
    const { data, setData, post, processing, errors } = useForm<PatientFormData>({
        name: '',
        identity_number: '',
        birth_date: '',
        gender: '',
        phone: '',
        address: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/patients');
    };

    return (
        <AppShell>
            <Head title="Tambah Pasien" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Tambah Pasien Baru</h1>
                        <p className="text-gray-600">Masukkan data pasien baru ke dalam sistem</p>
                    </div>
                    <Link
                        href="/patients"
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center transition-colors"
                    >
                        ← Kembali
                    </Link>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Lengkap *
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Masukkan nama lengkap"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Identity Number */}
                            <div>
                                <label htmlFor="identity_number" className="block text-sm font-medium text-gray-700 mb-2">
                                    NIK/Nomor Identitas *
                                </label>
                                <input
                                    id="identity_number"
                                    type="text"
                                    value={data.identity_number}
                                    onChange={(e) => setData('identity_number', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Masukkan NIK atau nomor identitas"
                                />
                                <InputError message={errors.identity_number} className="mt-2" />
                            </div>

                            {/* Birth Date */}
                            <div>
                                <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 mb-2">
                                    Tanggal Lahir *
                                </label>
                                <input
                                    id="birth_date"
                                    type="date"
                                    value={data.birth_date}
                                    onChange={(e) => setData('birth_date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <InputError message={errors.birth_date} className="mt-2" />
                            </div>

                            {/* Gender */}
                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                                    Jenis Kelamin *
                                </label>
                                <select
                                    id="gender"
                                    value={data.gender}
                                    onChange={(e) => setData('gender', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Pilih jenis kelamin</option>
                                    <option value="male">Laki-laki</option>
                                    <option value="female">Perempuan</option>
                                </select>
                                <InputError message={errors.gender} className="mt-2" />
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nomor Telepon
                                </label>
                                <input
                                    id="phone"
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Masukkan nomor telepon"
                                />
                                <InputError message={errors.phone} className="mt-2" />
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                Alamat Lengkap
                            </label>
                            <textarea
                                id="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Masukkan alamat lengkap"
                            />
                            <InputError message={errors.address} className="mt-2" />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                            <Link
                                href="/patients"
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Pasien'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}