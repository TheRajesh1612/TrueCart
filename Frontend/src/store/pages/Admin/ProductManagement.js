import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaFilter,
  FaSort,
  FaDownload,
  FaUpload,
  FaBox,
  FaDollarSign,
  FaTag,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useData } from "../../context/DataContext";
import { useTheme } from "../../context/ThemeContext";

const ProductManagement = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteMultipleProducts,
  } = useData();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    sku: "",
  });

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, sortBy, sortOrder]);

  const filterAndSortProducts = () => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === "price" || sortBy === "stock") {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else {
        aValue = aValue.toString().toLowerCase();
        bValue = bValue.toString().toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProducts(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    }
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) {
      toast.warning("Please select products to delete");
      return;
    }

    if (
      window.confirm(
        `Are you sure you want to delete ${selectedProducts.length} products?`
      )
    ) {
      deleteMultipleProducts(selectedProducts);
      setSelectedProducts([]);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      stock: product.stock || "",
      description: product.description || "",
      image: product.image || "",
      sku: product.sku || "",
    });
    setShowAddModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitProduct = () => {
    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.stock
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const productData = {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        description: formData.description,
        image: formData.image || "/assets/Mobiles/1.jpg",
        sku: formData.sku || `SKU-${Date.now()}`,
      };

      if (editingProduct) {
        updateProduct(editingProduct.id, productData);
      } else {
        addProduct(productData);
      }

      setShowAddModal(false);
      setEditingProduct(null);
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        image: "",
        sku: "",
      });
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const categories = [
    "all",
    "Electronics",
    "Computers",
    "TV",
    "Books",
    "Furniture",
    "Kitchen",
    "MenWear",
    "WomenWear",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col"
      >
        <div>
          <h1
            className={`${
              isDarkMode ? "text-white" : "text-gray-900"
            } text-2xl font-bold`}
          >
            Product Management
          </h1>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Manage your product catalog
          </p>
        </div>
        <div className="flex items-center mt-4 space-x-3 sm:mt-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700"
          >
            <FaPlus size={16} />
            <span>Add Product</span>
          </button>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
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
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split("-");
                setSortBy(field);
                setSortOrder(order);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="price-asc">Price (Low-High)</option>
              <option value="price-desc">Price (High-Low)</option>
              <option value="stock-asc">Stock (Low-High)</option>
              <option value="stock-desc">Stock (High-Low)</option>
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
            </select>
          </div>

          {/* Bulk Actions */}
          <div className="flex items-center space-x-2">
            {selectedProducts.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
              >
                Delete ({selectedProducts.length})
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="overflow-hidden border border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm rounded-xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedProducts.length === filteredProducts.length &&
                      filteredProducts.length > 0
                    }
                    onChange={handleSelectAll}
                    className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Product
                </th>
                <th
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("category")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Category</span>
                    <FaSort size={12} />
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("price")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Price</span>
                    <FaSort size={12} />
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("stock")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Stock</span>
                    <FaSort size={12} />
                  </div>
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="object-cover w-10 h-10 rounded-lg"
                            src={product.image}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.sku}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.stock > 20
                            ? "bg-green-100 text-green-800"
                            : product.stock > 5
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="p-1 text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1 text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <FaTrash size={14} />
                        </button>
                        <button
                          className="p-1 text-gray-600 hover:text-gray-900"
                          title="View"
                        >
                          <FaEye size={14} />
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
        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <FaBox className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No products found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Get started by adding your first product."}
            </p>
            {!searchTerm && selectedCategory === "all" && (
              <div className="mt-6">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
                >
                  <FaPlus className="w-4 h-4 mr-2 -ml-1" />
                  Add Product
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-6 py-3 border border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{filteredProducts.length}</span> of{" "}
              <span className="font-medium">{filteredProducts.length}</span>{" "}
              results
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200">
                Previous
              </button>
              <button className="px-3 py-1 text-sm text-white bg-orange-600 rounded-md">
                1
              </button>
              <button className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200">
                Next
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      {categories
                        .filter((cat) => cat !== "all")
                        .map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Stock *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      SKU
                    </label>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter SKU"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter image URL"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter product description"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end p-6 space-x-3 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                    setFormData({
                      name: "",
                      category: "",
                      price: "",
                      stock: "",
                      description: "",
                      image: "",
                      sku: "",
                    });
                  }}
                  className="px-4 py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitProduct}
                  className="px-4 py-2 text-white transition-colors bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700"
                >
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductManagement;
