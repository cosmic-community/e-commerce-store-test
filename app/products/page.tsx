import Link from 'next/link'
import cosmic from '@/lib/cosmic'
import { Product } from '@/lib/types'

async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'thumbnail', 'metadata'])
      .depth(1)

    return response.objects as Product[]
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-lg text-gray-600">
            Browse our complete collection of premium products
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
            >
              <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                <img
                  src={`${product.thumbnail}?w=600&h=400&fit=crop&auto=format,compress`}
                  alt={product.metadata.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.metadata.name}
                </h3>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {product.metadata.sale_price ? (
                      <>
                        <span className="text-xl font-bold text-red-600">
                          ${product.metadata.sale_price}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ${product.metadata.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-gray-900">
                        ${product.metadata.price}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.metadata.in_stock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.metadata.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  {product.metadata.collection && (
                    <span className="text-xs text-gray-500">
                      {product.metadata.collection.metadata.name}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Check back later for new products.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}