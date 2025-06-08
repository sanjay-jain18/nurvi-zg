"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ProductCard from "@/components/product-card"
import Link from "next/link"

const featuredProducts = [
  {
    id: "featured-1",
    name: "Royal Kundan Necklace Set",
    price: 45999,
    originalPrice: 52999,
    image: "/placeholder.svg?height=400&width=400",
    category: "Necklaces",
    rating: 4.9,
    reviews: 156,
    isNew: true,
    isSale: true,
  },
  {
    id: "featured-2",
    name: "Diamond-Cut Hoop Earrings",
    price: 12999,
    image: "/placeholder.svg?height=400&width=400",
    category: "Earrings",
    rating: 4.8,
    reviews: 89,
    isNew: true,
    isSale: false,
  },
  {
    id: "featured-3",
    name: "Elegant Pearl Bracelet",
    price: 8999,
    originalPrice: 11999,
    image: "/placeholder.svg?height=400&width=400",
    category: "Bracelets",
    rating: 4.7,
    reviews: 67,
    isNew: false,
    isSale: true,
  },
  {
    id: "featured-4",
    name: "Statement Gold Ring",
    price: 15999,
    image: "/placeholder.svg?height=400&width=400",
    category: "Rings",
    rating: 4.9,
    reviews: 134,
    isNew: true,
    isSale: false,
  },
  {
    id: "featured-5",
    name: "Delicate Chain Anklet",
    price: 5999,
    originalPrice: 7999,
    image: "/placeholder.svg?height=400&width=400",
    category: "Anklets",
    rating: 4.6,
    reviews: 45,
    isNew: false,
    isSale: true,
  },
  {
    id: "featured-6",
    name: "Vintage Charm Necklace",
    price: 18999,
    image: "/placeholder.svg?height=400&width=400",
    category: "Necklaces",
    rating: 4.8,
    reviews: 78,
    isNew: true,
    isSale: false,
  },
]

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("all")

  const tabs = [
    { id: "all", label: "All Products", count: featuredProducts.length },
    { id: "new", label: "New Arrivals", count: featuredProducts.filter((p) => p.isNew).length },
    { id: "sale", label: "On Sale", count: featuredProducts.filter((p) => p.isSale).length },
    { id: "trending", label: "Trending", count: 4 },
  ]

  const filteredProducts = featuredProducts.filter((product) => {
    if (activeTab === "all") return true
    if (activeTab === "new") return product.isNew
    if (activeTab === "sale") return product.isSale
    if (activeTab === "trending") return product.rating >= 4.8
    return true
  })

  return (
    <section className="py-20 luxury-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-luxury-100 text-luxury-700 text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            Featured Collection
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text font-serif mb-6">Handpicked for You</h2>
          <p className="text-xl text-luxury-700 max-w-3xl mx-auto leading-relaxed">
            Discover our most loved pieces, carefully curated for the modern woman who appreciates timeless elegance and
            contemporary style.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "luxury-gradient text-white shadow-lg"
                  : "bg-white text-luxury-700 hover:bg-luxury-50 border border-luxury-200"
              }`}
            >
              {tab.label}
              <Badge
                variant="secondary"
                className={`ml-2 ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-luxury-100 text-luxury-600"}`}
              >
                {tab.count}
              </Badge>
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12"
        >
          {filteredProducts.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link href="/collections">
            <Button size="lg" className="luxury-gradient text-white hover:shadow-xl transition-all duration-300 group">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
