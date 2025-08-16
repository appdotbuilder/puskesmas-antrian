<?php

namespace Database\Factories;

use App\Models\Patient;
use App\Models\Poli;
use App\Models\Queue;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Queue>
 */
class QueueFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Queue>
     */
    protected $model = Queue::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $poli = Poli::inRandomOrder()->first() ?? Poli::factory()->create();
        $patient = Patient::inRandomOrder()->first() ?? Patient::factory()->create();
        
        return [
            'patient_id' => $patient->id,
            'poli_id' => $poli->id,
            'queue_number' => $poli->code . '-' . $this->faker->unique()->numberBetween(1, 100),
            'date' => $this->faker->dateTimeBetween('-1 week', '+1 week'),
            'status' => $this->faker->randomElement(['waiting', 'called', 'serving', 'completed']),
        ];
    }
}