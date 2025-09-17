<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('manager');
            $table->text('address');
            $table->string('contact');
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->json('variants')->nullable(); // Store variants as JSON: [{name, desc, price}]
            $table->json('images')->nullable(); // Store image paths as JSON array
            $table->timestamps();

            // Add indexes for better performance
            $table->index('name');
            $table->index('category_id');
            $table->index('manager');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
