import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const storedProducts = localStorage.getItem('trueCart_products');
      const storedCustomers = localStorage.getItem('trueCart_customers');

      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        // Initialize with sample data if no data exists
        const sampleProducts = [
          {
            id: 1,
            name: 'iPhone 13 Pro',
            category: 'Electronics',
            price: 1099.00,
            stock: 45,
            status: 'Active',
            image: '/assets/Mobiles/1.jpg',
            description: 'The latest iPhone model with advanced camera capabilities and powerful performance.',
            sku: 'IPH-13-PRO-001',
            createdAt: '2024-01-15'
          },
          {
            id: 2,
            name: 'Samsung Galaxy Z Fold 3',
            category: 'Electronics',
            price: 1799.00,
            stock: 23,
            status: 'Active',
            image: '/assets/Mobiles/2.jpg',
            description: 'A foldable smartphone with a large display and multitasking features.',
            sku: 'SAMSUNG-FOLD-002',
            createdAt: '2024-01-14'
          },
          {
            id: 3,
            name: 'MacBook Pro',
            category: 'Computers',
            price: 2499.00,
            stock: 12,
            status: 'Active',
            image: '/assets/Computers/1.jpg',
            description: 'Professional laptop with M1 chip and stunning Retina display.',
            sku: 'MACBOOK-PRO-003',
            createdAt: '2024-01-13'
          },
          {
            id: 4,
            name: 'AirPods Pro',
            category: 'Electronics',
            price: 249.00,
            stock: 67,
            status: 'Active',
            image: '/assets/Mobiles/9.jpg',
            description: 'Wireless earbuds with active noise cancellation.',
            sku: 'AIRPODS-PRO-004',
            createdAt: '2024-01-12'
          },
          {
            id: 5,
            name: 'Samsung TV 55"',
            category: 'TV',
            price: 899.00,
            stock: 8,
            status: 'Active',
            image: '/assets/TV/1.jpg',
            description: '4K Smart TV with Crystal Display technology.',
            sku: 'SAMSUNG-TV-005',
            createdAt: '2024-01-11'
          }
        ];
        setProducts(sampleProducts);
        localStorage.setItem('trueCart_products', JSON.stringify(sampleProducts));
      }

      if (storedCustomers) {
        setCustomers(JSON.parse(storedCustomers));
      } else {
        // Initialize with sample data if no data exists
        const sampleCustomers = [
          {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@email.com',
            phone: '+1 (555) 123-4567',
            address: '123 Main St, New York, NY 10001',
            status: 'Active',
            joinDate: '2023-12-15',
            totalOrders: 5,
            totalSpent: 2499.00,
            lastOrder: '2024-01-15'
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@email.com',
            phone: '+1 (555) 987-6543',
            address: '456 Oak Ave, Los Angeles, CA 90210',
            status: 'Active',
            joinDate: '2023-11-20',
            totalOrders: 3,
            totalSpent: 2048.00,
            lastOrder: '2024-01-14'
          },
          {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike.johnson@email.com',
            phone: '+1 (555) 456-7890',
            address: '789 Pine St, Chicago, IL 60601',
            status: 'Active',
            joinDate: '2023-10-10',
            totalOrders: 2,
            totalSpent: 2499.00,
            lastOrder: '2024-01-13'
          },
          {
            id: 4,
            name: 'Sarah Wilson',
            email: 'sarah.wilson@email.com',
            phone: '+1 (555) 321-6547',
            address: '321 Elm St, Miami, FL 33101',
            status: 'Inactive',
            joinDate: '2023-09-05',
            totalOrders: 1,
            totalSpent: 899.00,
            lastOrder: '2024-01-12'
          }
        ];
        setCustomers(sampleCustomers);
        localStorage.setItem('trueCart_customers', JSON.stringify(sampleCustomers));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Error loading data');
    }
  };

  // Product management functions
  const addProduct = (productData) => {
    try {
      const newProduct = {
        ...productData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: 'Active'
      };
      
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem('trueCart_products', JSON.stringify(updatedProducts));
      toast.success('Product added successfully');
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product');
      throw error;
    }
  };

  const updateProduct = (productId, productData) => {
    try {
      const updatedProducts = products.map(product => 
        product.id === productId 
          ? { ...product, ...productData, updatedAt: new Date().toISOString() }
          : product
      );
      
      setProducts(updatedProducts);
      localStorage.setItem('trueCart_products', JSON.stringify(updatedProducts));
      toast.success('Product updated successfully');
      return updatedProducts.find(p => p.id === productId);
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error updating product');
      throw error;
    }
  };

  const deleteProduct = (productId) => {
    try {
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem('trueCart_products', JSON.stringify(updatedProducts));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product');
      throw error;
    }
  };

  const deleteMultipleProducts = (productIds) => {
    try {
      const updatedProducts = products.filter(product => !productIds.includes(product.id));
      setProducts(updatedProducts);
      localStorage.setItem('trueCart_products', JSON.stringify(updatedProducts));
      toast.success(`${productIds.length} products deleted successfully`);
    } catch (error) {
      console.error('Error deleting products:', error);
      toast.error('Error deleting products');
      throw error;
    }
  };

  // Customer management functions
  const addCustomer = (customerData) => {
    try {
      const newCustomer = {
        ...customerData,
        id: Date.now(),
        joinDate: new Date().toISOString(),
        status: 'Active',
        totalOrders: 0,
        totalSpent: 0
      };
      
      const updatedCustomers = [...customers, newCustomer];
      setCustomers(updatedCustomers);
      localStorage.setItem('trueCart_customers', JSON.stringify(updatedCustomers));
      toast.success('Customer added successfully');
      return newCustomer;
    } catch (error) {
      console.error('Error adding customer:', error);
      toast.error('Error adding customer');
      throw error;
    }
  };

  const updateCustomer = (customerId, customerData) => {
    try {
      const updatedCustomers = customers.map(customer => 
        customer.id === customerId 
          ? { ...customer, ...customerData, updatedAt: new Date().toISOString() }
          : customer
      );
      
      setCustomers(updatedCustomers);
      localStorage.setItem('trueCart_customers', JSON.stringify(updatedCustomers));
      toast.success('Customer updated successfully');
      return updatedCustomers.find(c => c.id === customerId);
    } catch (error) {
      console.error('Error updating customer:', error);
      toast.error('Error updating customer');
      throw error;
    }
  };

  const deleteCustomer = (customerId) => {
    try {
      const updatedCustomers = customers.filter(customer => customer.id !== customerId);
      setCustomers(updatedCustomers);
      localStorage.setItem('trueCart_customers', JSON.stringify(updatedCustomers));
      toast.success('Customer deleted successfully');
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('Error deleting customer');
      throw error;
    }
  };

  const deleteMultipleCustomers = (customerIds) => {
    try {
      const updatedCustomers = customers.filter(customer => !customerIds.includes(customer.id));
      setCustomers(updatedCustomers);
      localStorage.setItem('trueCart_customers', JSON.stringify(updatedCustomers));
      toast.success(`${customerIds.length} customers deleted successfully`);
    } catch (error) {
      console.error('Error deleting customers:', error);
      toast.error('Error deleting customers');
      throw error;
    }
  };

  const value = {
    products,
    customers,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteMultipleProducts,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    deleteMultipleCustomers,
    loadData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
