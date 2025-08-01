import Link from 'next/link'
import cosmic from '@/lib/cosmic'
import { Product, Collection, CosmicResponse } from '@/lib/types'

async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'thumbnail', 'metadata'])
      .depth(1)
      .limit(6)

    return response.objects as Product[]
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

async function getCollections(): Promise<Collection[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as Collection[]
  } catch (error) {
    console.error('Error fetching collections:', error)
    return []
  }
}

export default async function Home() {
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections()
  ])

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Premium E-Commerce Store
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover our curated collection of premium products, from cutting-edge electronics to stylish fashion accessories.
            </p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Collections Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Shop by Collection
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                {collection.metadata.featured_image && (
                  <img
                    src={`${collection.metadata.featured_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
                    alt={collection.metadata.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">{collection.metadata.name}</h3>
                  <p className="text-lg opacity-90">{collection.metadata.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Products */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.metadata.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {product.metadata.sale_price ? (
                      <>
                        <span className="text-2xl font-bold text-red-600">
                          ${product.metadata.sale_price}
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          ${product.metadata.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.metadata.price}
                      </span>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    product.metadata.in_stock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.metadata.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </main>
  )
}