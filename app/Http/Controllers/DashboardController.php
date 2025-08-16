<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Poli;
use App\Models\Patient;
use App\Models\Queue;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        
        // Statistics
        $todayQueues = Queue::today()->count();
        $totalPatients = Patient::count();
        $activePolis = Poli::active()->count();
        $currentlyServing = Queue::where('status', 'serving')->today()->count();
        
        // Current queue status by poli
        $queuesByPoli = Poli::active()
            ->withCount([
                'queues' => function ($query) {
                    $query->today();
                },
                'queues as waiting_count' => function ($query) {
                    $query->today()->where('status', 'waiting');
                },
                'queues as serving_count' => function ($query) {
                    $query->today()->where('status', 'serving');
                }
            ])
            ->get();

        // Recent queues
        $recentQueues = Queue::with(['patient', 'poli'])
            ->today()
            ->latest()
            ->limit(10)
            ->get();

        // Doctor specific data
        $doctorQueues = null;
        if ($user->role === 'doctor' && $user->poli_id) {
            $doctorQueues = Queue::with('patient')
                ->where('poli_id', $user->poli_id)
                ->today()
                ->orderBy('created_at')
                ->get();
        }

        return Inertia::render('dashboard', [
            'stats' => [
                'todayQueues' => $todayQueues,
                'totalPatients' => $totalPatients,
                'activePolis' => $activePolis,
                'currentlyServing' => $currentlyServing,
            ],
            'queuesByPoli' => $queuesByPoli,
            'recentQueues' => $recentQueues,
            'doctorQueues' => $doctorQueues,
            'userRole' => $user->role,
        ]);
    }
}