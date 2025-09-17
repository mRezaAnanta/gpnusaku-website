<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'manager' => 'required|string|max:255',
            'address' => 'required|string',
            'contact' => 'required|string|max:255',
            'categories' => 'required|exists:categories,id',
            'variants' => 'required|array|min:1',
            'variants.*.name' => 'required|string|max:255',
            'variants.*.desc' => 'nullable|string|max:500',
            'variants.*.price' => 'required|numeric|min:0',
            'images' => 'nullable|array|max:3',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120', // 5MB max
        ]);

        try {
            // Handle image uploads
            $imagePaths = [];
            if ($request->hasFile('images')) {
                // Ensure the products directory exists
                Storage::disk('public')->makeDirectory('products');
                
                foreach ($request->file('images') as $image) {
                    // Generate unique filename
                    $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                    $path = $image->storeAs('products', $filename, 'public');
                    $imagePaths[] = $path;
                }
            }

            // Create the product
            $product = Product::create([
                'name' => $request->name,
                'description' => $request->description,
                'manager' => $request->manager,
                'address' => $request->address,
                'contact' => $request->contact,
                'category_id' => $request->categories,
                'variants' => $request->variants,
                'images' => $imagePaths,
            ]);

            return redirect()->route('products.index')->with('message', 'Product created successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to create product: ' . $e->getMessage()])
                        ->withInput();
        }
    }
}
