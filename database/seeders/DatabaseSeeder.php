<?php

namespace Database\Seeders;

use App\Models\Poli;
use App\Models\Patient;
use App\Models\Queue;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create default polis
        $polis = [
            ['name' => 'Poli Umum', 'code' => 'UMUM', 'description' => 'Pelayanan kesehatan umum'],
            ['name' => 'Poli Anak', 'code' => 'ANAK', 'description' => 'Pelayanan kesehatan anak'],
            ['name' => 'Poli Gigi', 'code' => 'GIGI', 'description' => 'Pelayanan kesehatan gigi dan mulut'],
            ['name' => 'Poli Mata', 'code' => 'MATA', 'description' => 'Pelayanan kesehatan mata'],
            ['name' => 'Poli KIA', 'code' => 'KIA', 'description' => 'Kesehatan Ibu dan Anak'],
            ['name' => 'Poli Gizi', 'code' => 'GIZI', 'description' => 'Konsultasi gizi dan diet'],
        ];

        foreach ($polis as $poli) {
            Poli::create($poli);
        }

        // Create admin user
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@puskesmas.local',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create registration staff
        User::create([
            'name' => 'Petugas Pendaftaran',
            'email' => 'registration@puskesmas.local',
            'password' => Hash::make('password'),
            'role' => 'registration',
            'email_verified_at' => now(),
        ]);

        // Create doctors for each poli
        $createdPolis = Poli::all();
        foreach ($createdPolis as $poli) {
            User::create([
                'name' => 'Dokter ' . $poli->name,
                'email' => 'doctor.' . strtolower($poli->code) . '@puskesmas.local',
                'password' => Hash::make('password'),
                'role' => 'doctor',
                'poli_id' => $poli->id,
                'email_verified_at' => now(),
            ]);
        }

        // Create some test patients
        Patient::factory(20)->create();

        // Create some test queues for today
        $patients = Patient::all();
        $polis = Poli::all();
        
        foreach ($polis as $poli) {
            for ($i = 1; $i <= 5; $i++) {
                Queue::create([
                    'patient_id' => $patients->random()->id,
                    'poli_id' => $poli->id,
                    'queue_number' => $poli->code . '-' . str_pad((string)$i, 3, '0', STR_PAD_LEFT),
                    'date' => today(),
                    'status' => $i <= 2 ? 'completed' : ($i === 3 ? 'serving' : 'waiting'),
                    'called_at' => $i <= 3 ? now()->subHours(random_int(1, 5)) : null,
                    'served_at' => $i <= 3 ? now()->subHours(random_int(1, 4)) : null,
                    'completed_at' => $i <= 2 ? now()->subHours(random_int(0, 3)) : null,
                ]);
            }
        }
    }
}