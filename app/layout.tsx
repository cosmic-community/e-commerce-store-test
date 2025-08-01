import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

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
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link href="/" className="text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                Store
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="nav-link text-lg">
                  Home
                </Link>
                <Link href="/products" className="nav-link text-lg">
                  Products
                </Link>
              </div>
              
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button className="text-gray-700 hover:text-blue-600 p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-6">Premium E-Commerce Store</h3>
              <p className="text-gray-400 mb-8 text-lg">
                Powered by Cosmic CMS
              </p>
              <div className="flex justify-center space-x-8">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-lg">
                  Home
                </Link>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors text-lg">
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