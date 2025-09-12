<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(){
        $categories = Category::all();
        return Inertia::render('dashboard/categories/index', compact('categories'));
    }

    public function create(){
        return Inertia::render('dashboard/categories/create');
    }

    public function store(Request $request){
       $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string'
       ]);

       Category::create($request->all());
       return redirect()->route('categories.index')->with('message', 'Category created successfully');
    }

    public function edit(Category $categories){
        return inertia::render('dashboard/categories/edit', compact('categories'));
    }

    public function update(Request $request, Category $categories){
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $categories->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
        ]);

        return redirect()->route('categories.index')->with('message', 'Category updated successfully');
    }

    public function destroy(Category $categories){
        $categories->delete();
        return redirect()->route('categories.index')->with('message', 'Category deleted successfully');
    }
}
