import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserPlus,
  FaFilter,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useData } from "../../context/DataContext";
import { useTheme } from "../../context/ThemeContext";

const CustomerManagement = () => {
  const {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    deleteMultipleCustomers,
  } = useData();
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "Active",
  });

  useEffect(() => {
    setFilteredCustomers(customers);
  }, [customers]);

  useEffect(() => {
    filterCustomers();
  }, [customers, searchTerm, statusFilter]);

  const filterCustomers = () => {
    let filtered = customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm);
      const matchesStatus =
        statusFilter === "all" || customer.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    setFilteredCustomers(filtered);
  };

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const getCustomerStats = () => {
    const total = customers.length;
    const active = customers.filter((c) => c.status === "Active").length;
    const inactive = customers.filter((c) => c.status === "Inactive").length;
    const totalRevenue = customers.reduce(
      (sum, customer) => sum + customer.totalSpent,
      0
    );

    return { total, active, inactive, totalRevenue };
  };

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      deleteCustomer(customerId);
    }
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      address: customer.address || "",
      status: customer.status || "Active",
    });
    setShowCustomerModal(true);
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      status: "Active",
    });
    setShowCustomerModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitCustomer = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const customerData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        status: formData.status,
      };

      if (editingCustomer) {
        updateCustomer(editingCustomer.id, customerData);
      } else {
        addCustomer(customerData);
      }

      setShowCustomerModal(false);
      setEditingCustomer(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        status: "Active",
      });
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  const stats = getCustomerStats();

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
            Customer Management
          </h1>
          <p className={`${isDarkMode? "text-gray-300": "text-gray-600"}`}>Manage your customer database</p>
        </div>
        <div className="flex items-center mt-4 space-x-3 sm:mt-0">
          <button className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
            <FaUserPlus size={16} />
            <span>Add Customer</span>
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 border border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Customers
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <FaUsers className="text-blue-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 border border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Active Customers
              </p>
              <p className="text-2xl font-bold text-green-600">
                {stats.active}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <FaUsers className="text-green-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 border border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Inactive Customers
              </p>
              <p className="text-2xl font-bold text-gray-600">
                {stats.inactive}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
              <FaUsers className="text-gray-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 border border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
              <FaEnvelope className="text-purple-600" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Search */}
          <div className="relative">
            <FaSearch
              className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
              size={16}
            />
            <input
              type="text"
              placeholder="Search customers..."
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleAddCustomer}
              className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700"
            >
              <FaUserPlus size={16} />
              <span>Add Customer</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Customers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="overflow-hidden border border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm rounded-xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Contact
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Orders
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Join Date
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {filteredCustomers.map((customer, index) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {customer.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {customer.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">
                          {customer.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                      {customer.totalOrders} orders
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                      ${customer.totalSpent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          customer.status
                        )}`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(customer.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewCustomer(customer)}
                          className="p-1 text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <FaEye size={14} />
                        </button>
                        <button
                          onClick={() => handleEditCustomer(customer)}
                          className="p-1 text-green-600 hover:text-green-900"
                          title="Edit"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="p-1 text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <FaTrash size={14} />
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
        {filteredCustomers.length === 0 && (
          <div className="py-12 text-center">
            <FaUsers className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No customers found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No customers have been registered yet."}
            </p>
          </div>
        )}
      </motion.div>

      {/* Customer Modal - View/Edit/Add */}
      <AnimatePresence>
        {showCustomerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setShowCustomerModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingCustomer
                      ? "Edit Customer"
                      : selectedCustomer
                      ? "Customer Details"
                      : "Add New Customer"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowCustomerModal(false);
                      setSelectedCustomer(null);
                      setEditingCustomer(null);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        address: "",
                        status: "Active",
                      });
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                {editingCustomer || !selectedCustomer ? (
                  // Edit/Add Form
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter customer name"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Address
                        </label>
                        <textarea
                          rows={3}
                          name="address"
                          value={formData.address}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter address"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  // View Details
                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div>
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        Basic Information
                      </h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Name
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedCustomer.name}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedCustomer.email}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Phone
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedCustomer.phone}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Status
                          </label>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              selectedCustomer.status
                            )}`}
                          >
                            {selectedCustomer.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        Address
                      </h3>
                      <p className="text-sm text-gray-900">
                        {selectedCustomer.address}
                      </p>
                    </div>

                    {/* Order Statistics */}
                    <div>
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        Order Statistics
                      </h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="p-4 rounded-lg bg-blue-50">
                          <p className="text-sm font-medium text-blue-600">
                            Total Orders
                          </p>
                          <p className="text-2xl font-bold text-blue-900">
                            {selectedCustomer.totalOrders}
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-green-50">
                          <p className="text-sm font-medium text-green-600">
                            Total Spent
                          </p>
                          <p className="text-2xl font-bold text-green-900">
                            ${selectedCustomer.totalSpent}
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-purple-50">
                          <p className="text-sm font-medium text-purple-600">
                            Join Date
                          </p>
                          <p className="text-2xl font-bold text-purple-900">
                            {new Date(
                              selectedCustomer.joinDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        Recent Activity
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Last Order
                            </p>
                            <p className="text-sm text-gray-600">
                              {new Date(
                                selectedCustomer.lastOrder
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">
                              ${selectedCustomer.totalSpent}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end p-6 space-x-3 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowCustomerModal(false);
                    setSelectedCustomer(null);
                    setEditingCustomer(null);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      address: "",
                      status: "Active",
                    });
                  }}
                  className="px-4 py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                {editingCustomer || !selectedCustomer ? (
                  <button
                    onClick={handleSubmitCustomer}
                    className="px-4 py-2 text-white transition-colors bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700"
                  >
                    {editingCustomer ? "Update Customer" : "Add Customer"}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      toast.success("Customer details exported");
                      setShowCustomerModal(false);
                    }}
                    className="px-4 py-2 text-white transition-colors bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700"
                  >
                    Export Data
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerManagement;
