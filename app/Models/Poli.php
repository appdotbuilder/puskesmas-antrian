<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Poli
 *
 * @property int $id
 * @property string $name
 * @property string $code
 * @property string|null $description
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Queue[] $queues
 * @property-read int|null $queues_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $doctors
 * @property-read int|null $doctors_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Poli newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Poli newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Poli query()
 * @method static \Illuminate\Database\Eloquent\Builder|Poli whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Poli whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Poli whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Poli whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Poli whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Poli whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Poli whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Poli active()
 * @method static \Database\Factories\PoliFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Poli extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'code',
        'description',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the queues for this poli.
     */
    public function queues(): HasMany
    {
        return $this->hasMany(Queue::class);
    }

    /**
     * Get the doctors assigned to this poli.
     */
    public function doctors(): HasMany
    {
        return $this->hasMany(User::class);
    }

    /**
     * Scope a query to only include active polis.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}