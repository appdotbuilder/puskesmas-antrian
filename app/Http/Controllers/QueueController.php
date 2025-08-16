<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQueueRequest;
use App\Models\Poli;
use App\Models\Queue;
use Inertia\Inertia;

class QueueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $queues = Queue::with(['patient', 'poli'])
            ->today()
            ->orderBy('created_at')
            ->get();

        return Inertia::render('queues/index', [
            'queues' => $queues
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQueueRequest $request)
    {
        $poli = Poli::findOrFail($request->poli_id);
        
        // Generate queue number
        $today = today();
        $lastQueue = Queue::where('poli_id', $poli->id)
            ->whereDate('date', $today)
            ->orderBy('queue_number', 'desc')
            ->first();

        $nextNumber = 1;
        if ($lastQueue) {
            $lastNumber = intval(substr($lastQueue->queue_number, -3));
            $nextNumber = $lastNumber + 1;
        }

        $queueNumber = $poli->code . '-' . str_pad((string)$nextNumber, 3, '0', STR_PAD_LEFT);

        $queue = Queue::create([
            'patient_id' => $request->patient_id,
            'poli_id' => $request->poli_id,
            'queue_number' => $queueNumber,
            'date' => $today,
            'status' => 'waiting',
        ]);

        return redirect()->back()->with('success', 'Antrian berhasil didaftarkan dengan nomor ' . $queueNumber);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Queue $queue)
    {
        $status = request('status');
        
        if (!in_array($status, ['called', 'serving', 'completed', 'skipped'])) {
            return redirect()->back()->with('error', 'Status tidak valid.');
        }

        $updateData = ['status' => $status];
        
        if ($status === 'called' && !$queue->called_at) {
            $updateData['called_at'] = now();
        } elseif ($status === 'serving' && !$queue->served_at) {
            $updateData['served_at'] = now();
        } elseif ($status === 'completed' && !$queue->completed_at) {
            $updateData['completed_at'] = now();
        }

        $queue->update($updateData);

        return redirect()->back()->with('success', 'Status antrian berhasil diubah.');
    }
}