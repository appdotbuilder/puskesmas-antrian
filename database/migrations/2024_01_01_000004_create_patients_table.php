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
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Nama pasien');
            $table->string('identity_number')->unique()->comment('NIK/Nomor identitas');
            $table->date('birth_date')->comment('Tanggal lahir');
            $table->enum('gender', ['male', 'female'])->comment('Jenis kelamin');
            $table->string('phone')->nullable()->comment('Nomor telepon');
            $table->text('address')->nullable()->comment('Alamat');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('identity_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};