<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Poli;
use App\Models\Queue;
use Inertia\Inertia;

class QueueDisplayController extends Controller
{
    /**
     * Display the public queue screen.
     */
    public function index()
    {
        // Get all active polis with their current queue status
        $polis = Poli::active()
            ->with(['queues' => function ($query) {
                $query->with('patient')
                    ->today()
                    ->orderBy('created_at');
            }])
            ->get();

        // Current serving queues
        $currentlyServing = Queue::with(['patient', 'poli'])
            ->where('status', 'serving')
            ->today()
            ->get();

        // Next waiting queues
        $nextQueues = Queue::with(['patient', 'poli'])
            ->where('status', 'waiting')
            ->today()
            ->orderBy('created_at')
            ->limit(10)
            ->get();

        return Inertia::render('queue-display', [
            'polis' => $polis,
            'currentlyServing' => $currentlyServing,
            'nextQueues' => $nextQueues,
        ]);
    }


}