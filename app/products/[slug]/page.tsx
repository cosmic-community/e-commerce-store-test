// app/products/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import cosmic from '@/lib/cosmic'
import { Product, Review } from '@/lib/types'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'products',
        slug: slug
      })
      .props(['id', 'title', 'slug', 'thumbnail', 'metadata'])
      .depth(1)

    return response.object as Product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

async function getProductReviews(productId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'reviews',
        'metadata.product': productId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as Review[]
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return []
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 md:w-5 md:h-5 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const reviews = await getProductReviews(product.id)
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + parseInt(review.metadata.rating.key), 0) / reviews.length
    : 0

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <Link href="/products" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Products
          </Link>
        </nav>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Product Images */}
            <div className="p-4 md:p-6">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden mb-4">
                <img
                  src={`${product.thumbnail}?w=800&h=800&fit=crop&auto=format,compress`}
                  alt={product.metadata.name}
                  className="w-full h-80 md:h-96 object-cover"
                />
              </div>
              {product.metadata.images && product.metadata.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.metadata.images.slice(0, 4).map((image, index) => (
                    <div key={index} className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                        alt={`${product.metadata.name} ${index + 1}`}
                        className="w-full h-16 md:h-20 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-4 md:p-6">
              <div className="mb-4">
                {product.metadata.collection && (
                  <Link
                    href={`/collections/${product.metadata.collection.slug}`}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {product.metadata.collection.metadata.name}
                  </Link>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {product.metadata.name}
              </h1>

              <div className="flex items-center mb-6">
                <StarRating rating={Math.round(averageRating)} />
                <span className="ml-2 text-sm text-gray-600">
                  ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-6 flex-wrap gap-2">
                {product.metadata.sale_price ? (
                  <>
                    <span className="text-2xl md:text-3xl font-bold text-red-600">
                      ${product.metadata.sale_price}
                    </span>
                    <span className="text-lg md:text-xl text-gray-500 line-through">
                      ${product.metadata.price}
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                      Save ${(product.metadata.price - product.metadata.sale_price).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">
                    ${product.metadata.price}
                  </span>
                )}
              </div>

              <div className="mb-6">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                  product.metadata.in_stock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.metadata.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {product.metadata.sku && (
                <div className="mb-6">
                  <span className="text-sm text-gray-600">SKU: {product.metadata.sku}</span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <div 
                  className="text-gray-600 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.metadata.description }}
                />
              </div>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  product.metadata.in_stock
                    ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!product.metadata.in_stock}
              >
                {product.metadata.in_stock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 md:mt-12 bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold text-gray-900">
                        {review.metadata.customer_name}
                      </h4>
                      {review.metadata.verified_purchase && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <StarRating rating={parseInt(review.metadata.rating.key)} />
                  </div>
                  <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                  <p className="text-gray-600 text-sm md:text-base">{review.metadata.review_text}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}