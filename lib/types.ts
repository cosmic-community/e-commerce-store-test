export interface CosmicImage {
  url: string
  imgix_url: string
}

export interface Collection {
  id: string
  slug: string
  title: string
  metadata: {
    name: string
    description: string
    featured_image?: CosmicImage
  }
}

export interface Product {
  id: string
  slug: string
  title: string
  thumbnail: string
  metadata: {
    name: string
    description: string
    price: number
    sale_price?: number | null
    images: CosmicImage[]
    in_stock: boolean
    collection?: Collection
    sku?: string
  }
}

export interface Review {
  id: string
  slug: string
  title: string
  metadata: {
    product: Product
    customer_name: string
    rating: {
      key: string
      value: string
    }
    review_text: string
    verified_purchase: boolean
  }
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
}