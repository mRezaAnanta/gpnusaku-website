<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(){
        /*$categories = Category::all();*/
        /*return Inertia::render('dashboard/categories/index', compact('categories'));*/
        return Inertia::render('dashboard/products/index', []);
    }

    public function create(){
        $categories = Category::all();
        return Inertia::render('dashboard/products/create', compact('categories'));
    }

}
