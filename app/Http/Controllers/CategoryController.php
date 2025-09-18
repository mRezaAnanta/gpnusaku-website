<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(){
        $categories = Category::all();
        return Inertia::render('dashboard/categories/index', compact('categories'));
    }

    public function view(){
        $categories = Category::all();
        return Inertia::render('category/index', compact('categories'));
    }

    public function list(Category $category){
        // Get the category with its products
        $categoryData = Category::with('products')->find($category->id);

        // Format products data with proper image URLs and computed properties
        $products = $categoryData->products->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'manager' => $product->manager,
                'address' => $product->address,
                'contact' => $product->contact,
                'category' => $product->category,
                'variants' => $product->variants,
                'images' => $product->images ? collect($product->images)->map(fn($image) => asset('storage/' . $image))->toArray() : [],
                'primary_image' => $product->primary_image ? asset('storage/' . $product->primary_image) : null,
                'variant_names' => $product->variant_names,
                'price_range' => $product->price_range,
                'created_at' => $product->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $product->updated_at->format('Y-m-d H:i:s'),
            ];
        });

        return Inertia::render('category/list', [
            'category' => [
                'id' => $categoryData->id,
                'name' => $categoryData->name,
                'description' => $categoryData->description,
            ],
            'products' => $products
        ]);
    }

    public function detail(Product $product){
        // Get the product with its category
        $productData = Product::with('category')->find($product->id);

        if (!$productData) {
            abort(404, 'Product not found');
        }

        // Format product data with proper image URLs and computed properties
        $formattedProduct = [
            'id' => $productData->id,
            'name' => $productData->name,
            'description' => $productData->description,
            'manager' => $productData->manager,
            'address' => $productData->address,
            'contact' => $productData->contact,
            'category' => [
                'id' => $productData->category->id,
                'name' => $productData->category->name,
                'description' => $productData->category->description,
            ],
            'variants' => $productData->variants ?: [],
            'images' => $productData->images ? collect($productData->images)->map(fn($image) => asset('storage/' . $image))->toArray() : [],
            'primary_image' => $productData->primary_image ? asset('storage/' . $productData->primary_image) : null,
            'variant_names' => $productData->variant_names,
            'price_range' => $productData->price_range,
            'created_at' => $productData->created_at->format('d M Y'),
            'updated_at' => $productData->updated_at->format('d M Y H:i'),
        ];

        return Inertia::render('category/detail', [
            'product' => $formattedProduct
        ]);
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
