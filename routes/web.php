<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/maps', function () {
    return Inertia::render('maps');
})->name('maps');

Route::prefix('category')->group(function () {
    Route::get('/', [CategoryController::class, 'view'])->name('category.index');
    Route::get('{category}', [CategoryController::class, 'list'])->name('category.list');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::get('/', function () {
            return Inertia::render('dashboard/index');
        })->name('dashboard');

        Route::prefix('categories')->group(function () {
            Route::get('/', [CategoryController::class, 'index'])->name('categories.index');
            Route::get('create', [CategoryController::class, 'create'])->name('categories.create');
            Route::post('/', [CategoryController::class, 'store'])->name('categories.store');
            Route::get('{categories}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
            Route::put('{categories}', [CategoryController::class, 'update'])->name('categories.update');
            Route::delete('{categories}', [CategoryController::class, 'destroy'])->name('categories.destroy');
        });

        Route::prefix('products')->group(function () {
            Route::get('/', [ProductController::class, 'index'])->name('products.index');
            Route::get('create', [ProductController::class, 'create'])->name('products.create');
            Route::post('/', [ProductController::class, 'store'])->name('products.store');
            Route::get('{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
            Route::put('{product}', [ProductController::class, 'update'])->name('products.update');
            Route::delete('{product}', [ProductController::class, 'destroy'])->name('products.destroy');
        });
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
