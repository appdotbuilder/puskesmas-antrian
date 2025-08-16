<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Poli;
use App\Models\Patient;
use Inertia\Inertia;

class RegistrationController extends Controller
{
    /**
     * Display the registration page.
     */
    public function index()
    {
        $polis = Poli::active()->get();
        $patients = Patient::orderBy('name')->get();

        return Inertia::render('registration', [
            'polis' => $polis,
            'patients' => $patients,
        ]);
    }
}