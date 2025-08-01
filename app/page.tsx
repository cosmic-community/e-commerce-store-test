import Link from 'next/link'
import cosmic from '@/lib/cosmic'
import { Product, Collection } from '@/lib/types'

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Premium E-Commerce Store
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
              Discover our curated collection of premium products, from cutting-edge electronics to stylish fashion accessories.
            </p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-10 py-5 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Shop by Collection
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="aspect-w-16 aspect-h-10 bg-gray-200">
                  {collection.metadata.featured_image && (
                    <img
                      src={`${collection.metadata.featured_image.imgix_url}?w=1000&h=600&fit=crop&auto=format,compress`}
                      alt={collection.metadata.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-6 transform group-hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4">{collection.metadata.name}</h3>
                    <p className="text-lg opacity-90 max-w-md">{collection.metadata.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="aspect-w-16 aspect-h-12 bg-gray-100 overflow-hidden">
                  <img
                    src={`${product.thumbnail}?w=800&h=600&fit=crop&auto=format,compress`}
                    alt={product.metadata.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.metadata.name}
                  </h3>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center space-x-3">
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
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
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

          <div className="text-center mt-16">
            <Link
              href="/products"
              className="inline-block bg-gray-900 text-white px-10 py-5 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}