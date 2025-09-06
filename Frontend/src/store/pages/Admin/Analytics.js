import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
  FaBox,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown
  // FaChartLine, 
  // FaChartBar, 
  // FaChartPie, 
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedChart, setSelectedChart] = useState('revenue');
  const {isDarkMode} = useTheme();
  
  // Sample analytics data
  const analyticsData = {
    revenue: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      color: 'gray'
    },
    orders: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [150, 220, 180, 300, 280, 350],
      color: 'gray'
    },
    customers: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [50, 80, 65, 120, 100, 150],
      color: 'orange'
    },
    products: {
      labels: ['Electronics', 'Computers', 'TV', 'Books', 'Furniture', 'Kitchen'],
      data: [35, 25, 15, 10, 8, 7],
      color: 'orange'
    }
  };

  const getChartData = () => {
    return analyticsData[selectedChart];
  };

  const renderChart = () => {
    const data = getChartData();
    const maxValue = Math.max(...data.data);
    
    return (
      <div className="flex items-end justify-between h-64 space-x-1">
        {data.data.map((value, index) => {
          const height = (value / maxValue) * 100;
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="mb-1 text-xs text-gray-500">{data.labels[index]}</div>
              <div 
                className={`w-full bg-${data.color}-500 rounded-t transition-all duration-300 hover:bg-${data.color}-600`}
                style={{ height: `${height}%` }}
              />
              <div className="mt-1 text-xs text-gray-600">{value}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderPieChart = () => {
    const data = analyticsData.products;
    const total = data.data.reduce((sum, val) => sum + val, 0);
    
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative w-48 h-48">
          {data.data.map((value, index) => {
            const percentage = (value / total) * 100;
            const colors = ['bg-gray-500', 'bg-orange-500', 'bg-gray-600', 'bg-orange-600', 'bg-gray-700', 'bg-orange-700'];
            
            return (
              <div
                key={index}
                className={`absolute inset-0 ${colors[index]} rounded-full`}
                style={{
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + percentage * 0.5}% 0%, ${50 + percentage * 0.5}% 50%)`
                }}
              />
            );
          })}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full">
              <span className="text-sm font-medium">{total}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className={`${isDarkMode? "text-white": "text-gray-900"} text-2xl font-bold`}>Analytics Dashboard</h1>
          <p className={`${isDarkMode? "text-gray-200": "text-gray-600"}`}>Track your business performance</p>
        </div>
        <div className="flex items-center mt-4 space-x-3 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$123,456</p>
              <div className="flex items-center mt-2">
                <FaArrowUp className="mr-1 text-green-500" size={12} />
                <span className="text-sm text-green-600">+12.5%</span>
              </div>
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
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
              <div className="flex items-center mt-2">
                <FaArrowUp className="mr-1 text-green-500" size={12} />
                <span className="text-sm text-green-600">+8.2%</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <FaShoppingCart className="text-green-600" size={24} />
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
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-2xl font-bold text-gray-900">567</p>
              <div className="flex items-center mt-2">
                <FaArrowUp className="mr-1 text-green-500" size={12} />
                <span className="text-sm text-green-600">+15.3%</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
              <FaUsers className="text-purple-600" size={24} />
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
              <p className="text-sm font-medium text-gray-600">Products Sold</p>
              <p className="text-2xl font-bold text-gray-900">890</p>
              <div className="flex items-center mt-2">
                <FaArrowDown className="mr-1 text-red-500" size={12} />
                <span className="text-sm text-red-600">-2.1%</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg">
              <FaBox className="text-orange-600" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Chart Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-3 bg-white border border-gray-200 shadow-sm rounded-xl md:p-6"
      >
        <div className="flex flex-col items-center justify-between mb-4 md:flex-row ">
          <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
          <div className="flex flex-wrap items-center space-x-2 space-y-2 md:space-y-0">
            <button
              onClick={() => setSelectedChart('revenue')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedChart === 'revenue' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Revenue
            </button>
            <button
              onClick={() => setSelectedChart('orders')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedChart === 'orders' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setSelectedChart('customers')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedChart === 'customers' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Customers
            </button>
            <button
              onClick={() => setSelectedChart('products')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedChart === 'products' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Products
            </button>
          </div>
        </div>
        
        {selectedChart === 'products' ? renderPieChart() : renderChart()}
      </motion.div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl"
        >
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Top Selling Products</h3>
          <div className="space-y-3">
            {[
              { name: 'iPhone 13 Pro', sales: 45, revenue: 49500 },
              { name: 'Samsung Galaxy Z Fold', sales: 32, revenue: 57568 },
              { name: 'MacBook Pro', sales: 28, revenue: 69972 },
              { name: 'AirPods Pro', sales: 67, revenue: 16683 },
              { name: 'Samsung TV 55"', sales: 15, revenue: 13485 }
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sales} units sold</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${product.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl"
        >
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'New order placed', details: 'Order #ORD-005 by Alex Brown', time: '2 minutes ago', type: 'order' },
              { action: 'Product updated', details: 'iPhone 14 Pro price updated', time: '15 minutes ago', type: 'product' },
              { action: 'New user registered', details: 'User: emma.davis@email.com', time: '1 hour ago', type: 'user' },
              { action: 'Payment received', details: 'Payment for order #ORD-003', time: '2 hours ago', type: 'payment' },
              { action: 'Inventory alert', details: 'Low stock for Samsung TV', time: '3 hours ago', type: 'alert' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start p-3 space-x-3 rounded-lg bg-gray-50">
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full">
                  <FaCalendarAlt className="text-blue-600" size={12} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.details}</p>
                  <p className="mt-1 text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl"
      >
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Performance Metrics</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">98.5%</div>
            <p className="text-sm text-gray-600">Customer Satisfaction</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">2.3 days</div>
            <p className="text-sm text-gray-600">Average Delivery Time</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">15.2%</div>
            <p className="text-sm text-gray-600">Conversion Rate</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
