import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Sistem Antrian Puskesmas" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
                {/* Hero Section */}
                <div className="relative">
                    <div className="container mx-auto px-6 py-16">
                        <div className="text-center">
                            <div className="text-6xl mb-4">🏥</div>
                            <h1 className="text-5xl font-bold text-blue-800 mb-6">
                                Sistem Antrian Puskesmas
                            </h1>
                            <p className="text-xl text-blue-600 mb-8 max-w-2xl mx-auto">
                                Sistem manajemen antrian digital yang memudahkan pasien dan petugas dalam mengelola antrian pelayanan kesehatan
                            </p>
                            
                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/registration"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg inline-flex items-center justify-center transition-colors text-lg"
                                >
                                    📝 Daftar Antrian
                                </Link>
                                <Link
                                    href="/login"
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg inline-flex items-center justify-center transition-colors text-lg"
                                >
                                    👨‍⚕️ Login Petugas
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="container mx-auto px-6 py-16">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                        Fitur Unggulan Sistem Antrian
                    </h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                            <div className="text-4xl mb-4">📺</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Layar Antrian Real-time</h3>
                            <p className="text-gray-600">
                                Pasien dapat melihat status antrian secara real-time dengan informasi lengkap nomor antrian, nama pasien, dan poli tujuan
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                            <div className="text-4xl mb-4">📱</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Pendaftaran On-Site</h3>
                            <p className="text-gray-600">
                                Sistem pendaftaran langsung di lokasi puskesmas dengan interface yang mudah digunakan oleh petugas pendaftaran
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                            <div className="text-4xl mb-4">👨‍⚕️</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Panel Dokter</h3>
                            <p className="text-gray-600">
                                Dokter dapat melihat dan mengelola antrian untuk poli mereka masing-masing dengan kontrol status antrian
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Dashboard Analitik</h3>
                            <p className="text-gray-600">
                                Laporan dan statistik antrian harian untuk membantu manajemen puskesmas dalam pengambilan keputusan
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                            <div className="text-4xl mb-4">🏥</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Manajemen Poli</h3>
                            <p className="text-gray-600">
                                Pengelolaan data poliklinik yang lengkap dengan informasi dokter, jadwal, dan kapasitas pelayanan
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Manajemen Pasien</h3>
                            <p className="text-gray-600">
                                Database pasien yang terintegrasi dengan riwayat kunjungan dan informasi medis dasar
                            </p>
                        </div>
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="bg-white py-16">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                            Cara Kerja Sistem
                        </h2>
                        
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">1️⃣</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Registrasi Pasien</h3>
                                <p className="text-gray-600">Petugas mendaftarkan pasien baru atau mencari data pasien existing</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">2️⃣</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Pilih Poli</h3>
                                <p className="text-gray-600">Memilih poliklinik tujuan dan sistem otomatis generate nomor antrian</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">3️⃣</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Monitoring</h3>
                                <p className="text-gray-600">Pasien memantau status antrian melalui layar display di puskesmas</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">4️⃣</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Pelayanan</h3>
                                <p className="text-gray-600">Dokter memanggil dan melayani pasien sesuai urutan antrian</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="container mx-auto px-6 py-16">
                    <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg p-8 text-white text-center">
                        <h2 className="text-3xl font-bold mb-8">Keunggulan Sistem Digital</h2>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <div className="text-4xl font-bold mb-2">⏰</div>
                                <div className="text-2xl font-bold mb-1">50%</div>
                                <div className="text-blue-100">Pengurangan Waktu Tunggu</div>
                            </div>
                            
                            <div>
                                <div className="text-4xl font-bold mb-2">📈</div>
                                <div className="text-2xl font-bold mb-1">90%</div>
                                <div className="text-blue-100">Kepuasan Pasien</div>
                            </div>
                            
                            <div>
                                <div className="text-4xl font-bold mb-2">💻</div>
                                <div className="text-2xl font-bold mb-1">100%</div>
                                <div className="text-blue-100">Paperless System</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="bg-gray-800 py-16">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Siap Menggunakan Sistem Antrian Digital?
                        </h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Bergabunglah dengan modernisasi pelayanan kesehatan. Sistem kami mudah digunakan dan telah terbukti meningkatkan efisiensi pelayanan.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/registration"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center justify-center transition-colors"
                            >
                                🚀 Mulai Daftar Antrian
                            </Link>
                            <Link
                                href="/login"
                                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-800 font-bold py-3 px-6 rounded-lg inline-flex items-center justify-center transition-colors"
                            >
                                🔐 Login Admin
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}