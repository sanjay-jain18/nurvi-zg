"use client"

import { useState } from "react"
import { Package, Truck, CheckCircle, Clock, Search, Filter, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

const orders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 24999,
    items: [
      {
        name: "Kundan Elegance Ring",
        image: "/placeholder.svg?height=80&width=80",
        price: 24999,
        quantity: 1,
      },
    ],
    shippingAddress: "123 Jewelry Street, Mumbai, Maharashtra 400001",
    trackingNumber: "TRK123456789",
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "Shipped",
    total: 8999,
    items: [
      {
        name: "Pearl Jhumka Earrings",
        image: "/placeholder.svg?height=80&width=80",
        price: 8999,
        quantity: 1,
      },
    ],
    shippingAddress: "123 Jewelry Street, Mumbai, Maharashtra 400001",
    trackingNumber: "TRK987654321",
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "Processing",
    total: 45999,
    items: [
      {
        name: "Temple Jewellery Necklace",
        image: "/placeholder.svg?height=80&width=80",
        price: 45999,
        quantity: 1,
      },
    ],
    shippingAddress: "123 Jewelry Street, Mumbai, Maharashtra 400001",
    trackingNumber: null,
  },
  {
    id: "ORD-004",
    date: "2023-12-28",
    status: "Delivered",
    total: 15999,
    items: [
      {
        name: "Gold Plated Bracelet",
        image: "/placeholder.svg?height=80&width=80",
        price: 15999,
        quantity: 1,
      },
    ],
    shippingAddress: "123 Jewelry Street, Mumbai, Maharashtra 400001",
    trackingNumber: "TRK456789123",
  },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filteredOrders, setFilteredOrders] = useState(orders)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Shipped":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "Processing":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Package className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Shipped":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterOrders(term, statusFilter)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    filterOrders(searchTerm, status)
  }

  const filterOrders = (search: string, status: string) => {
    let filtered = orders

    if (search) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(search.toLowerCase()) ||
          order.items.some((item) => item.name.toLowerCase().includes(search.toLowerCase())),
      )
    }

    if (status !== "all") {
      filtered = filtered.filter((order) => order.status.toLowerCase() === status.toLowerCase())
    }

    setFilteredOrders(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600 mt-2">Track and manage your jewelry orders</p>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search orders by ID or product name..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <Select value={statusFilter} onValueChange={handleStatusFilter}>
                    <SelectTrigger>
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders List */}
          <div className="space-y-6">
            {filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm || statusFilter !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "You haven't placed any orders yet"}
                  </p>
                  <Link href="/collections">
                    <Button className="luxury-gradient text-white">Start Shopping</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              filteredOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 border-b">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <p className="text-sm text-gray-600">Placed on {order.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{order.status}</span>
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg border"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">₹{item.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="text-xl font-bold text-gray-900">₹{order.total.toLocaleString()}</p>
                        </div>
                        {order.trackingNumber && (
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Tracking Number</p>
                            <p className="font-mono text-sm font-semibold text-theme-medium">{order.trackingNumber}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {order.status === "Shipped" && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Truck className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold text-blue-900">Your order is on the way!</span>
                        </div>
                        <p className="text-sm text-blue-700 mt-1">Expected delivery: 2-3 business days</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
