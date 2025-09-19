<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $products = Product::with(['category'])
            ->orderBy('created_at', 'desc')
            ->get();

        $categories = Category::orderBy('created_at', 'desc')->get();

        return Inertia::render('dashboard/index', [
            'products' => $products,
            'categories' => $categories
        ]);
    }
}
