<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePatientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'identity_number' => 'required|string|max:20|unique:patients,identity_number',
            'birth_date' => 'required|date|before:today',
            'gender' => 'required|in:male,female',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama pasien harus diisi.',
            'identity_number.required' => 'NIK harus diisi.',
            'identity_number.unique' => 'NIK sudah terdaftar.',
            'birth_date.required' => 'Tanggal lahir harus diisi.',
            'birth_date.before' => 'Tanggal lahir harus sebelum hari ini.',
            'gender.required' => 'Jenis kelamin harus dipilih.',
        ];
    }
}