import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, 
  FaShoppingCart, 
  FaBox, 
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
  // FaEye,
  // FaEdit,
  // FaTrash,
  FaPlus,
  FaChartLine,
  FaCalendarAlt,
  FaClock,
  FaCog
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalOrders: 892,
    totalProducts: 156,
    totalRevenue: 45678.90,
    monthlyGrowth: 12.5,
    weeklyGrowth: -2.3
  });

  const [recentOrders, setRecentOrders] = useState([
    {
      id: '#ORD-001',
      customer: 'John Doe',
      product: 'iPhone 13 Pro',
      amount: 1099.00,
      status: 'Delivered',
      date: '2024-01-15'
    },
    {
      id: '#ORD-002',
      customer: 'Jane Smith',
      product: 'Samsung Galaxy Z Fold',
      amount: 1799.00,
      status: 'Processing',
      date: '2024-01-14'
    },
    {
      id: '#ORD-003',
      customer: 'Mike Johnson',
      product: 'MacBook Pro',
      amount: 2499.00,
      status: 'Shipped',
      date: '2024-01-13'
    },
    {
      id: '#ORD-004',
      customer: 'Sarah Wilson',
      product: 'AirPods Pro',
      amount: 249.00,
      status: 'Pending',
      date: '2024-01-12'
    }
  ]);

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      action: 'New order placed',
      details: 'Order #ORD-005 by Alex Brown',
      time: '2 minutes ago',
      type: 'order'
    },
    {
      id: 2,
      action: 'Product updated',
      details: 'iPhone 14 Pro price updated',
      time: '15 minutes ago',
      type: 'product'
    },
    {
      id: 3,
      action: 'New user registered',
      details: 'User: emma.davis@email.com',
      time: '1 hour ago',
      type: 'user'
    },
    {
      id: 4,
      action: 'Payment received',
      details: 'Payment for order #ORD-003',
      time: '2 hours ago',
      type: 'payment'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'order':
        return <FaShoppingCart className="text-blue-600" />;
      case 'product':
        return <FaBox className="text-green-600" />;
      case 'user':
        return <FaUsers className="text-purple-600" />;
      case 'payment':
        return <FaDollarSign className="text-yellow-600" />;
      default:
        return <FaClock className="text-gray-600" />;
    }
  };

  const handleQuickAction = (action) => {
    toast.info(`${action} action triggered`);
  };

  const handleNavigateToProducts = () => {
    navigate('/admin-dashboard/products');
  };

  const handleNavigateToOrders = () => {
    navigate('/admin-dashboard/orders');
  };

  const handleNavigateToAnalytics = () => {
    navigate('/admin-dashboard/analytics');
  };

  const handleNavigateToSettings = () => {
    navigate('/admin-dashboard/settings');
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 text-white shadow-lg bg-gradient-to-r from-gray-800 to-gray-600 rounded-xl"
      >
        <h1 className="mb-2 text-2xl font-bold">Welcome back, Admin!</h1>
        <p className="text-gray-200">Here's what's happening with your store today.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 transition-shadow border border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm rounded-xl hover:shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-10 bg-orange-100 rounded-lg shadow-md">
              <FaUsers className="text-orange-600" size={24} />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <FaArrowUp className="mr-1 text-green-500" size={12} />
            <span className="text-sm text-green-600">+{stats.monthlyGrowth}% from last month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 transition-shadow border border-gray-200 shadow-lg cursor-pointer bg-white/80 backdrop-blur-sm rounded-xl hover:shadow-xl"
          onClick={handleNavigateToOrders}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg shadow-md">
              <FaShoppingCart className="text-gray-600" size={24} />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <FaArrowUp className="mr-1 text-green-500" size={12} />
            <span className="text-sm text-green-600">+8.2% from last week</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 transition-shadow border border-gray-200 shadow-lg cursor-pointer bg-white/80 backdrop-blur-sm rounded-xl hover:shadow-xl"
          onClick={handleNavigateToProducts}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg shadow-md">
              <FaBox className="text-orange-600" size={24} />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <FaArrowUp className="mr-1 text-green-500" size={12} />
            <span className="text-sm text-green-600">+3 new this week</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 transition-shadow border border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm rounded-xl hover:shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg shadow-md">
              <FaDollarSign className="text-gray-600" size={24} />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <FaArrowDown className="mr-1 text-red-500" size={12} />
            <span className="text-sm text-red-600">{stats.weeklyGrowth}% from last week</span>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="border border-gray-200 shadow-lg lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-xl"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <button className="text-sm font-medium text-orange-600 transition-colors hover:text-orange-700">
                View all
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                      <FaShoppingCart className="text-blue-600" size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${order.amount}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions & Recent Activities */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="border border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm rounded-xl"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-3">
              <button
                onClick={handleNavigateToProducts}
                className="flex items-center w-full p-3 space-x-3 text-orange-700 transition-colors rounded-lg cursor-pointer bg-orange-50 hover:bg-orange-100"
              >
                <FaPlus size={16} />
                <span className="font-medium">Add Product</span>
              </button>
              <button
                onClick={handleNavigateToOrders}
                className="flex items-center w-full p-3 space-x-3 text-gray-700 transition-colors rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <FaShoppingCart size={16} />
                <span className="font-medium">View Orders</span>
              </button>
              <button
                onClick={handleNavigateToAnalytics}
                className="flex items-center w-full p-3 space-x-3 text-orange-700 transition-colors rounded-lg cursor-pointer bg-orange-50 hover:bg-orange-100"
              >
                <FaChartLine size={16} />
                <span className="font-medium">View Analytics</span>
              </button>
              <button
                onClick={handleNavigateToSettings}
                className="flex items-center w-full p-3 space-x-3 text-gray-700 transition-colors rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <FaCog size={16} />
                <span className="font-medium">Settings</span>
              </button>
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="border border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm rounded-xl"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.details}</p>
                      <p className="mt-1 text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 border border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm rounded-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-gray-400" size={16} />
            <span className="text-sm text-gray-600">Last 30 days</span>
          </div>
        </div>
        <div className="flex items-center justify-center h-64 rounded-lg bg-gray-50">
          <div className="text-center">
            <FaChartLine className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="text-gray-500">Chart component will be implemented here</p>
            <p className="text-sm text-gray-400">Revenue analytics and trends</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
