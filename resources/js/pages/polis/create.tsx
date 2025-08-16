import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';

interface PoliFormData {
    name: string;
    code: string;
    description: string;
    is_active: boolean;
    [key: string]: string | boolean;
}

export default function PolisCreate() {
    const { data, setData, post, processing, errors } = useForm<PoliFormData>({
        name: '',
        code: '',
        description: '',
        is_active: true
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/polis');
    };

    return (
        <AppShell>
            <Head title="Tambah Poli" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Tambah Poliklinik Baru</h1>
                        <p className="text-gray-600">Masukkan data poliklinik baru ke dalam sistem</p>
                    </div>
                    <Link
                        href="/polis"
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
                                    Nama Poliklinik *
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Contoh: Poli Umum"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Code */}
                            <div>
                                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                                    Kode Poli *
                                </label>
                                <input
                                    id="code"
                                    type="text"
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Contoh: UMUM"
                                />
                                <InputError message={errors.code} className="mt-2" />
                                <p className="text-sm text-gray-500 mt-1">
                                    Kode akan digunakan untuk nomor antrian (contoh: UMUM-001)
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Deskripsi
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Masukkan deskripsi poliklinik..."
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        {/* Is Active */}
                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">Poli Aktif</span>
                            </label>
                            <p className="text-sm text-gray-500 mt-1">
                                Poli aktif akan muncul dalam pilihan pendaftaran antrian
                            </p>
                            <InputError message={errors.is_active} className="mt-2" />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                            <Link
                                href="/polis"
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Poli'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}