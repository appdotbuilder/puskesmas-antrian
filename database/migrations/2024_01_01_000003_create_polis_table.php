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
        Schema::create('polis', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Nama poli/poliklinik');
            $table->string('code')->unique()->comment('Kode poli');
            $table->text('description')->nullable()->comment('Deskripsi poli');
            $table->boolean('is_active')->default(true)->comment('Status aktif poli');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('code');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('polis');
    }
};