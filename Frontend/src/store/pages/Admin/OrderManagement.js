import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaPrint,
  FaDownload,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useTheme } from "../../context/ThemeContext";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useTheme();

  // Sample order data
  const sampleOrders = [
    {
      id: "#ORD-001",
      customer: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, New York, NY 10001",
      },
      items: [
        {
          id: 1,
          name: "iPhone 13 Pro",
          price: 1099.0,
          quantity: 1,
          image: "/assets/Mobiles/1.jpg",
        },
      ],
      total: 1099.0,
      status: "Delivered",
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      orderDate: "2024-01-15",
      deliveryDate: "2024-01-18",
      trackingNumber: "TRK123456789",
      notes: "Customer requested signature confirmation",
    },
    {
      id: "#ORD-002",
      customer: {
        name: "Jane Smith",
        email: "jane.smith@email.com",
        phone: "+1 (555) 987-6543",
        address: "456 Oak Ave, Los Angeles, CA 90210",
      },
      items: [
        {
          id: 2,
          name: "Samsung Galaxy Z Fold 3",
          price: 1799.0,
          quantity: 1,
          image: "/assets/Mobiles/2.jpg",
        },
        {
          id: 4,
          name: "AirPods Pro",
          price: 249.0,
          quantity: 1,
          image: "/assets/Mobiles/9.jpg",
        },
      ],
      total: 2048.0,
      status: "Processing",
      paymentStatus: "Paid",
      paymentMethod: "PayPal",
      orderDate: "2024-01-14",
      deliveryDate: null,
      trackingNumber: null,
      notes: "Customer prefers afternoon delivery",
    },
    {
      id: "#ORD-003",
      customer: {
        name: "Mike Johnson",
        email: "mike.johnson@email.com",
        phone: "+1 (555) 456-7890",
        address: "789 Pine St, Chicago, IL 60601",
      },
      items: [
        {
          id: 3,
          name: "MacBook Pro",
          price: 2499.0,
          quantity: 1,
          image: "/assets/Computers/1.jpg",
        },
      ],
      total: 2499.0,
      status: "Shipped",
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      orderDate: "2024-01-13",
      deliveryDate: null,
      trackingNumber: "TRK987654321",
      notes: "Fragile item - handle with care",
    },
    {
      id: "#ORD-004",
      customer: {
        name: "Sarah Wilson",
        email: "sarah.wilson@email.com",
        phone: "+1 (555) 321-6547",
        address: "321 Elm St, Miami, FL 33101",
      },
      items: [
        {
          id: 5,
          name: 'Samsung TV 55"',
          price: 899.0,
          quantity: 1,
          image: "/assets/TV/1.jpg",
        },
      ],
      total: 899.0,
      status: "Pending",
      paymentStatus: "Pending",
      paymentMethod: "Credit Card",
      orderDate: "2024-01-12",
      deliveryDate: null,
      trackingNumber: null,
      notes: "Customer will call to confirm delivery time",
    },
  ];

  useEffect(() => {
    setOrders(sampleOrders);
    setFilteredOrders(sampleOrders);
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter, dateFilter]);

  const filterOrders = () => {
    let filtered = orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      const matchesDate =
        dateFilter === "all" || getDateFilter(order.orderDate, dateFilter);
      return matchesSearch && matchesStatus && matchesDate;
    });

    setFilteredOrders(filtered);
  };

  const getDateFilter = (orderDate, filter) => {
    const order = new Date(orderDate);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    switch (filter) {
      case "today":
        return order.toDateString() === today.toDateString();
      case "yesterday":
        return order.toDateString() === yesterday.toDateString();
      case "lastWeek":
        return order >= lastWeek;
      case "lastMonth":
        return order >= lastMonth;
      default:
        return true;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <FaCheckCircle className="text-green-600" />;
      case "shipped":
        return <FaTruck className="text-blue-600" />;
      case "processing":
        return <FaClock className="text-yellow-600" />;
      case "pending":
        return <FaClock className="text-gray-600" />;
      case "cancelled":
        return <FaTimesCircle className="text-red-600" />;
      default:
        return <FaClock className="text-gray-600" />;
    }
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const getOrderStats = () => {
    const total = orders.length;
    const delivered = orders.filter((o) => o.status === "Delivered").length;
    const processing = orders.filter((o) => o.status === "Processing").length;
    const pending = orders.filter((o) => o.status === "Pending").length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    return { total, delivered, processing, pending, totalRevenue };
  };

  const stats = getOrderStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1
            className={`${
              isDarkMode ? "text-white" : "text-gray-900"
            } text-2xl font-bold`}
          >
            Order Management
          </h1>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Track and manage customer orders
          </p>
        </div>
        <div className="flex items-center mt-4 space-x-3 sm:mt-0">
          <button className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-gray-600 rounded-lg hover:bg-gray-700">
            <FaDownload size={16} />
            <span>Export</span>
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <FaDollarSign className="text-blue-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.delivered}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <FaCheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Processing</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.processing}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg">
              <FaClock className="text-yellow-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-600">
                {stats.pending}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
              <FaClock className="text-gray-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
              <FaDollarSign className="text-purple-600" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 border border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm rounded-xl"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Search */}
          <div className="relative">
            <FaSearch
              className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
              size={16}
            />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="lastWeek">Last 7 Days</option>
              <option value="lastMonth">Last 30 Days</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 text-white transition-colors bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700">
              <FaPrint size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="overflow-hidden border border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm rounded-xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Order
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Items
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Total
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {filteredOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.paymentMethod}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.customer.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customer.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {order.items.slice(0, 2).map((item, idx) => (
                          <img
                            key={idx}
                            src={item.image}
                            alt={item.name}
                            className="object-cover w-8 h-8 rounded-lg"
                          />
                        ))}
                        {order.items.length > 2 && (
                          <span className="text-sm text-gray-500">
                            +{order.items.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                      ${order.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="p-1 text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <FaEye size={14} />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(order.id, "Processing")
                          }
                          className="p-1 text-yellow-600 hover:text-yellow-900"
                          title="Mark as Processing"
                        >
                          <FaClock size={14} />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(order.id, "Shipped")
                          }
                          className="p-1 text-blue-600 hover:text-blue-900"
                          title="Mark as Shipped"
                        >
                          <FaTruck size={14} />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(order.id, "Delivered")
                          }
                          className="p-1 text-green-600 hover:text-green-900"
                          title="Mark as Delivered"
                        >
                          <FaCheckCircle size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="py-12 text-center">
            <FaTruck className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No orders found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== "all" || dateFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No orders have been placed yet."}
            </p>
          </div>
        )}
      </motion.div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {showOrderModal && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setShowOrderModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Order Details - {selectedOrder.id}
                  </h2>
                  <button
                    onClick={() => setShowOrderModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimesCircle size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Customer Information */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      Customer Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <FaUser className="text-gray-400" />
                        <span className="text-gray-900">
                          {selectedOrder.customer.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaEnvelope className="text-gray-400" />
                        <span className="text-gray-900">
                          {selectedOrder.customer.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaPhone className="text-gray-400" />
                        <span className="text-gray-900">
                          {selectedOrder.customer.phone}
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <FaMapMarkerAlt className="mt-1 text-gray-400" />
                        <span className="text-gray-900">
                          {selectedOrder.customer.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Information */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      Order Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Date:</span>
                        <span className="text-gray-900">
                          {new Date(
                            selectedOrder.orderDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Status:</span>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            selectedOrder.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {selectedOrder.paymentStatus}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="text-gray-900">
                          {selectedOrder.paymentMethod}
                        </span>
                      </div>
                      {selectedOrder.trackingNumber && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Tracking Number:
                          </span>
                          <span className="text-gray-900">
                            {selectedOrder.trackingNumber}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mt-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Order Items
                  </h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center p-4 space-x-4 rounded-lg bg-gray-50"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-cover w-16 h-16 rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            ${item.price}
                          </p>
                          <p className="text-sm text-gray-600">
                            Total: ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Total */}
                <div className="p-4 mt-6 rounded-lg bg-blue-50">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      Order Total:
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ${selectedOrder.total}
                    </span>
                  </div>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <div className="mt-6">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      Notes
                    </h3>
                    <p className="p-3 text-gray-700 rounded-lg bg-yellow-50">
                      {selectedOrder.notes}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end p-6 space-x-3 border-t border-gray-200">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="px-4 py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    toast.success("Order details printed");
                    setShowOrderModal(false);
                  }}
                  className="px-4 py-2 text-white transition-colors bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700"
                >
                  Print Order
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderManagement;
