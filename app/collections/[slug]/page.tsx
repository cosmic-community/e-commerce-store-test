// app/collections/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import cosmic from '@/lib/cosmic'
import { Collection, Product } from '@/lib/types'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getCollection(slug: string): Promise<Collection | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'collections',
        slug: slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.object as Collection
  } catch (error) {
    console.error('Error fetching collection:', error)
    return null
  }
}

async function getCollectionProducts(collectionId: string): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'products',
        'metadata.collection': collectionId
      })
      .props(['id', 'title', 'slug', 'thumbnail', 'metadata'])
      .depth(1)

    return response.objects as Product[]
  } catch (error) {
    console.error('Error fetching collection products:', error)
    return []
  }
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params
  const collection = await getCollection(slug)

  if (!collection) {
    notFound()
  }

  const products = await getCollectionProducts(collection.id)

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Home
          </Link>
        </nav>

        {/* Collection Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {collection.metadata.featured_image && (
            <div className="h-48 md:h-64 bg-gray-200">
              <img
                src={`${collection.metadata.featured_image.imgix_url}?w=1200&h=400&fit=crop&auto=format,compress`}
                alt={collection.metadata.name}
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
          )}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {collection.metadata.name}
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-4">
              {collection.metadata.description}
            </p>
            <p className="text-sm text-gray-500">
              {products.length} product{products.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="bg-white rounded-xl shadow-lg card-hover overflow-hidden group"
              >
                <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                  <img
                    src={`${product.thumbnail}?w=600&h=400&fit=crop&auto=format,compress`}
                    alt={product.metadata.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.metadata.name}
                  </h3>
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                      {product.metadata.sale_price ? (
                        <>
                          <span className="text-lg md:text-xl font-bold text-red-600">
                            ${product.metadata.sale_price}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${product.metadata.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg md:text-xl font-bold text-gray-900">
                          ${product.metadata.price}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    product.metadata.in_stock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.metadata.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products in this collection
            </h3>
            <p className="text-gray-600 mb-6">
              Check back later for new products in this collection.
            </p>
            <Link
              href="/products"
              className="btn-primary"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}