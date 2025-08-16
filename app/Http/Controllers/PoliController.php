<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePoliRequest;
use App\Models\Poli;
use Inertia\Inertia;

class PoliController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $polis = Poli::withCount('queues')->latest()->get();
        
        return Inertia::render('polis/index', [
            'polis' => $polis
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('polis/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePoliRequest $request)
    {
        $poli = Poli::create($request->validated());

        return redirect()->route('polis.index')
            ->with('success', 'Data poli berhasil disimpan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Poli $poli)
    {
        $poli->load(['queues' => function ($query) {
            $query->with('patient')->today()->orderBy('created_at');
        }]);
        
        return Inertia::render('polis/show', [
            'poli' => $poli
        ]);
    }
}