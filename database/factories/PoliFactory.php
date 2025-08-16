<?php

namespace Database\Factories;

use App\Models\Poli;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Poli>
 */
class PoliFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Poli>
     */
    protected $model = Poli::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $polis = [
            ['name' => 'Poli Umum', 'code' => 'UMUM'],
            ['name' => 'Poli Anak', 'code' => 'ANAK'],
            ['name' => 'Poli Gigi', 'code' => 'GIGI'],
            ['name' => 'Poli Mata', 'code' => 'MATA'],
            ['name' => 'Poli KIA', 'code' => 'KIA'],
            ['name' => 'Poli Gizi', 'code' => 'GIZI'],
        ];

        $poli = $this->faker->randomElement($polis);

        return [
            'name' => $poli['name'],
            'code' => $poli['code'],
            'description' => $this->faker->sentence(),
            'is_active' => true,
        ];
    }
}