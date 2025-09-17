<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Category;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'manager',
        'address',
        'contact',
        'category_id',
        'variants',
        'images',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'variants' => 'array',
        'images' => 'array',
    ];

    /**
     * Get the category that owns the product.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the primary image URL for the product.
     *
     * @return string|null
     */
    public function getPrimaryImageAttribute(): ?string
    {
        return $this->images && count($this->images) > 0 ? $this->images[0] : null;
    }

    /**
     * Get all variant names as a comma-separated string.
     *
     * @return string
     */
    public function getVariantNamesAttribute(): string
    {
        if (!$this->variants || !is_array($this->variants)) {
            return '';
        }

        return collect($this->variants)
            ->pluck('name')
            ->filter()
            ->implode(', ');
    }

    /**
     * Get the price range for the product variants.
     *
     * @return array
     */
    public function getPriceRangeAttribute(): array
    {
        if (!$this->variants || !is_array($this->variants)) {
            return ['min' => 0, 'max' => 0];
        }

        $prices = collect($this->variants)
            ->pluck('price')
            ->filter()
            ->map(fn($price) => (float) $price);

        if ($prices->isEmpty()) {
            return ['min' => 0, 'max' => 0];
        }

        return [
            'min' => $prices->min(),
            'max' => $prices->max()
        ];
    }
}
