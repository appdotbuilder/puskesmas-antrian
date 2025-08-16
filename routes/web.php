<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PoliController;
use App\Http\Controllers\QueueController;
use App\Http\Controllers\QueueDisplayController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Support\Facades\Route;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public queue display (main page)
Route::get('/', [QueueDisplayController::class, 'index'])->name('home');

// Registration page (on-site registration)
Route::get('/registration', [RegistrationController::class, 'index'])->name('registration');

// Queue management (public endpoints)
Route::post('/queues', [QueueController::class, 'store'])->name('queues.store');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Patient management
    Route::resource('patients', PatientController::class);
    
    // Poli management
    Route::resource('polis', PoliController::class);
    
    // Queue management (authenticated endpoints)
    Route::get('/queues', [QueueController::class, 'index'])->name('queues.index');
    Route::patch('/queues/{queue}', [QueueController::class, 'update'])->name('queues.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
