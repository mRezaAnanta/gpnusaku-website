<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($product) {
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

        return Inertia::render('dashboard/products/index', [
            'products' => $products,
            'flash' => [
                'message' => session('message')
            ]
        ]);
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

    /**
     * Show the form for editing the specified product.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();

        // Format product data with proper image URLs
        $productData = [
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'manager' => $product->manager,
            'address' => $product->address,
            'contact' => $product->contact,
            'category_id' => $product->category_id,
            'variants' => $product->variants ?: [],
            'images' => $product->images ? collect($product->images)->map(fn($image) => asset('storage/' . $image))->toArray() : [],
            'image_paths' => $product->images ?: [], // Keep original paths for backend reference
        ];

        return Inertia::render('dashboard/products/edit', [
            'product' => $productData,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, Product $product)
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
            'new_images' => 'nullable|array|max:3',
            'new_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120', // 5MB max
            'keep_images' => 'nullable|array',
        ]);

        try {
            $currentImages = $product->images ?: [];
            $keepImages = $request->input('keep_images', []);
            $imagePaths = [];

            // Handle existing images - keep only the ones specified
            foreach ($currentImages as $imagePath) {
                $imageUrl = asset('storage/' . $imagePath);
                if (in_array($imageUrl, $keepImages)) {
                    $imagePaths[] = $imagePath;
                } else {
                    // Delete the image that's being removed
                    Storage::disk('public')->delete($imagePath);
                }
            }

            // Handle new image uploads
            if ($request->hasFile('new_images')) {
                // Ensure the products directory exists
                Storage::disk('public')->makeDirectory('products');

                $remainingSlots = 3 - count($imagePaths);
                $filesToProcess = array_slice($request->file('new_images'), 0, $remainingSlots);

                foreach ($filesToProcess as $image) {
                    // Generate unique filename
                    $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                    $path = $image->storeAs('products', $filename, 'public');
                    $imagePaths[] = $path;
                }
            }

            // Update the product
            $product->update([
                'name' => $request->name,
                'description' => $request->description,
                'manager' => $request->manager,
                'address' => $request->address,
                'contact' => $request->contact,
                'category_id' => $request->categories,
                'variants' => $request->variants,
                'images' => $imagePaths,
            ]);

            return redirect()->route('products.index')->with('message', 'Product updated successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to update product: ' . $e->getMessage()])
                        ->withInput();
        }
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(Product $product)
    {
        try {
            // Delete associated images from storage
            if ($product->images && is_array($product->images)) {
                foreach ($product->images as $imagePath) {
                    Storage::disk('public')->delete($imagePath);
                }
            }

            // Delete the product
            $product->delete();

            return redirect()->route('products.index')
                           ->with('message', 'Product deleted successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to delete product: ' . $e->getMessage()]);
        }
    }
}
