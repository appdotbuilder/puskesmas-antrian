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
        // Add foreign key constraints after tables are created
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('poli_id')->references('id')->on('polis')->onDelete('set null');
        });

        Schema::table('queues', function (Blueprint $table) {
            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');
            $table->foreign('poli_id')->references('id')->on('polis')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['poli_id']);
        });

        Schema::table('queues', function (Blueprint $table) {
            $table->dropForeign(['patient_id']);
            $table->dropForeign(['poli_id']);
        });
    }
};