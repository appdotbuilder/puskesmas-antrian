<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('queues', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('patient_id');
            $table->unsignedBigInteger('poli_id');
            $table->string('queue_number')->comment('Nomor antrian');
            $table->date('date')->comment('Tanggal antrian');
            $table->enum('status', ['waiting', 'called', 'serving', 'completed', 'skipped'])->default('waiting')->comment('Status antrian');
            $table->timestamp('called_at')->nullable()->comment('Waktu dipanggil');
            $table->timestamp('served_at')->nullable()->comment('Waktu dilayani');
            $table->timestamp('completed_at')->nullable()->comment('Waktu selesai');
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['date', 'poli_id']);
            $table->index(['status', 'date']);
            $table->index('queue_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('queues');
    }
};