import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Premium E-Commerce Store',
  description: 'Discover our curated collection of premium products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Store
              </Link>
              <div className="flex items-center space-x-6">
                <Link 
                  href="/" 
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Home
                </Link>
                <Link 
                  href="/products" 
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Products
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {children}

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Premium E-Commerce Store</h3>
              <p className="text-gray-400 mb-6">
                Powered by Cosmic CMS
              </p>
              <div className="flex justify-center space-x-6">
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
                <Link href="/products" className="text-gray-400 hover:text-white">
                  Products
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}