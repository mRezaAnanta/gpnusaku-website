<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::get('/products/create', [ProductController::class, "create"])->name('products.create');
    Route::get('/products/{product}/edit', [ProductController::class, "edit"])->name('products.edit');
    Route::put('/products/{product}', [ProductController::class, "update"])->name('products.update');
    Route::delete('/products/{product}', [ProductController::class, "destroy"])->name('products.destroy');
    Route::prefix('dashboard')->group(function () {
        Route::get('/', function () {
            return Inertia::render('dashboard/index');
        })->name('dashboard');

        Route::get('categories', [CategoryController::class, 'index'])->name('categories.index');

        Route::get('categories/create', [CategoryController::class, 'create'])->name('categories.create');

        Route::post('categories', [CategoryController::class, 'store'])->name('categories.store');

        Route::get('categories/{categories}/edit', [CategoryController::class, 'edit'])->name('categories.edit');

        Route::put('categories/{categories}', [CategoryController::class, 'update'])->name('categories.update');

        Route::delete('categories/{categories}', [CategoryController::class, 'destroy'])->name('categories.destroy');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
