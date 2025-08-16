<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Queue
 *
 * @property int $id
 * @property int $patient_id
 * @property int $poli_id
 * @property string $queue_number
 * @property \Illuminate\Support\Carbon $date
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $called_at
 * @property \Illuminate\Support\Carbon|null $served_at
 * @property \Illuminate\Support\Carbon|null $completed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Patient $patient
 * @property-read \App\Models\Poli $poli
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Queue newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Queue newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Queue query()
 * @method static \Illuminate\Database\Eloquent\Builder|Queue whereCalledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue wherePatientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue wherePoliId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue whereQueueNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue whereServedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Queue today()
 * @method static \Illuminate\Database\Eloquent\Builder|Queue waiting()
 * @method static \Database\Factories\QueueFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Queue extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'patient_id',
        'poli_id',
        'queue_number',
        'date',
        'status',
        'called_at',
        'served_at',
        'completed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date' => 'date',
        'called_at' => 'datetime',
        'served_at' => 'datetime',
        'completed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the patient that owns this queue.
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    /**
     * Get the poli that owns this queue.
     */
    public function poli(): BelongsTo
    {
        return $this->belongsTo(Poli::class);
    }

    /**
     * Scope a query to only include today's queues.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeToday($query)
    {
        return $query->whereDate('date', today());
    }

    /**
     * Scope a query to only include waiting queues.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWaiting($query)
    {
        return $query->where('status', 'waiting');
    }
}