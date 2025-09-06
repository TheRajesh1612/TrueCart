import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCog,
  FaBell,
  FaShieldAlt,
  FaPalette,
  FaDatabase,
  FaDownload,
  FaTrash,
  FaSave,
  // FaUpload,
  // FaEye,
  // FaEyeSlash,
  // FaUser,
  // FaEnvelope,
  // FaPhone,
  // FaGlobe,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import { toast } from "react-toastify";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);
  const { isDarkMode } = useTheme();
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "TrueCart",
    siteDescription: "Your trusted online shopping destination",
    contactEmail: "admin@truecart.com",
    contactPhone: "+1 (555) 123-4567",
    timezone: "UTC-5",
    currency: "USD",

    // Notification Settings
    emailNotifications: true,
    orderNotifications: true,
    productNotifications: true,
    customerNotifications: true,

    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,

    // Appearance Settings
    theme: "light",
    primaryColor: "orange",
    sidebarCollapsed: false,
    animations: true,

    // Data Settings
    autoBackup: true,
    backupFrequency: "daily",
    dataRetention: 365,
    exportFormat: "JSON",
  });

  const handleSettingChange = (category, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = () => {
    // Save settings to localStorage
    localStorage.setItem("adminSettings", JSON.stringify(settings));
    toast.success("Settings saved successfully!");
  };

  const handleResetSettings = () => {
    if (
      window.confirm("Are you sure you want to reset all settings to default?")
    ) {
      const defaultSettings = {
        siteName: "TrueCart",
        siteDescription: "Your trusted online shopping destination",
        contactEmail: "admin@truecart.com",
        contactPhone: "+1 (555) 123-4567",
        timezone: "UTC-5",
        currency: "USD",
        emailNotifications: true,
        orderNotifications: true,
        productNotifications: true,
        customerNotifications: true,
        twoFactorAuth: false,
        sessionTimeout: 30,
        passwordExpiry: 90,
        loginAttempts: 5,
        theme: "light",
        primaryColor: "orange",
        sidebarCollapsed: false,
        animations: true,
        autoBackup: true,
        backupFrequency: "daily",
        dataRetention: 365,
        exportFormat: "JSON",
      };
      setSettings(defaultSettings);
      toast.info("Settings reset to default values");
    }
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "admin-settings.json";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Settings exported successfully!");
  };

  const tabs = [
    { id: "general", label: "General", icon: FaCog },
    { id: "notifications", label: "Notifications", icon: FaBell },
    { id: "security", label: "Security", icon: FaShieldAlt },
    { id: "appearance", label: "Appearance", icon: FaPalette },
    { id: "data", label: "Data", icon: FaDatabase },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl p-6 shadow-lg transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-r from-gray-800 to-gray-700 text-white"
            : "bg-gradient-to-r from-gray-700 to-gray-600 text-white"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-bold">Settings</h1>
            <p className="text-gray-200">
              Manage your admin panel configuration and preferences.
            </p>
          </div>
          <ThemeToggle size="lg" />
        </div>
      </motion.div>

      {/* Settings Container */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div
            className={`${
              isDarkMode ? "bg-gray-800/80" : "bg-white/80"
            } backdrop-blur-sm rounded-xl shadow-lg border p-4 transition-colors duration-300 ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h2
              className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Categories
            </h2>
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-orange-100 text-orange-700 border-l-4 border-orange-500"
                        : isDarkMode
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={16} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div
            className={`${
              isDarkMode ? "bg-gray-800/80" : "bg-white/80"
            } backdrop-blur-sm rounded-xl shadow-lg border p-6 transition-colors duration-300 ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <h3
                  className={`${
                    isDarkMode ? "text-white" : "text-gray-900"
                  } mb-6 text-xl font-semibold`}
                >
                  General Settings
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      } block mb-2 text-sm font-medium`}
                    >
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "siteName",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      } block mb-2 text-sm font-medium`}
                    >
                      Site Description
                    </label>
                    <input
                      type="text"
                      value={settings.siteDescription}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "siteDescription",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      } block mb-2 text-sm font-medium`}
                    >
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "contactEmail",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      } block mb-2 text-sm font-medium`}
                    >
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={settings.contactPhone}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "contactPhone",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      } block mb-2 text-sm font-medium`}
                    >
                      Timezone
                    </label>
                    <select
                      value={settings.timezone}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "timezone",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="UTC-5">UTC-5 (Eastern Time)</option>
                      <option value="UTC-6">UTC-6 (Central Time)</option>
                      <option value="UTC-7">UTC-7 (Mountain Time)</option>
                      <option value="UTC-8">UTC-8 (Pacific Time)</option>
                      <option value="UTC+0">UTC+0 (GMT)</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      } block mb-2 text-sm font-medium`}
                    >
                      Currency
                    </label>
                    <select
                      value={settings.currency}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "currency",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD (C$)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h3
                  className={`${
                    isDarkMode ? "text-white" : "text-gray-900"
                  } mb-6 text-xl font-semibold`}
                >
                  Notification Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Email Notifications
                      </h4>
                      <p className="text-sm text-gray-600">
                        Receive notifications via email
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) =>
                          handleSettingChange(
                            "notifications",
                            "emailNotifications",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Order Notifications
                      </h4>
                      <p className="text-sm text-gray-600">
                        Get notified about new orders
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.orderNotifications}
                        onChange={(e) =>
                          handleSettingChange(
                            "notifications",
                            "orderNotifications",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Product Notifications
                      </h4>
                      <p className="text-sm text-gray-600">
                        Get notified about product updates
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.productNotifications}
                        onChange={(e) =>
                          handleSettingChange(
                            "notifications",
                            "productNotifications",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Customer Notifications
                      </h4>
                      <p className="text-sm text-gray-600">
                        Get notified about customer activities
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.customerNotifications}
                        onChange={(e) =>
                          handleSettingChange(
                            "notifications",
                            "customerNotifications",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <h3
                  className={`${
                    isDarkMode ? "text-white" : "text-gray-900"
                  } mb-6 text-xl font-semibold`}
                >
                  Security Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Two-Factor Authentication
                      </h4>
                      <p className="text-sm text-gray-600">
                        Enable 2FA for enhanced security
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.twoFactorAuth}
                        onChange={(e) =>
                          handleSettingChange(
                            "security",
                            "twoFactorAuth",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label
                        className={`${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        } block mb-2 text-sm font-medium`}
                      >
                        Session Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) =>
                          handleSettingChange(
                            "security",
                            "sessionTimeout",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        className={`${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        } block mb-2 text-sm font-medium`}
                      >
                        Password Expiry (days)
                      </label>
                      <input
                        type="number"
                        value={settings.passwordExpiry}
                        onChange={(e) =>
                          handleSettingChange(
                            "security",
                            "passwordExpiry",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        className={`${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        } block mb-2 text-sm font-medium`}
                      >
                        Max Login Attempts
                      </label>
                      <input
                        type="number"
                        value={settings.loginAttempts}
                        onChange={(e) =>
                          handleSettingChange(
                            "security",
                            "loginAttempts",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <h3
                  className={`${
                    isDarkMode ? "text-white" : "text-gray-900"
                  } mb-6 text-xl font-semibold`}
                >
                  Appearance Settings
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      } block mb-2 text-sm font-medium`}
                    >
                      Theme
                    </label>
                    <select
                      value={settings.theme}
                      onChange={(e) =>
                        handleSettingChange(
                          "appearance",
                          "theme",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      } block mb-2 text-sm font-medium`}
                    >
                      Primary Color
                    </label>
                    <select
                      value={settings.primaryColor}
                      onChange={(e) =>
                        handleSettingChange(
                          "appearance",
                          "primaryColor",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="orange">Orange</option>
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="purple">Purple</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Sidebar Collapsed
                      </h4>
                      <p className="text-sm text-gray-600">
                        Start with collapsed sidebar
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.sidebarCollapsed}
                        onChange={(e) =>
                          handleSettingChange(
                            "appearance",
                            "sidebarCollapsed",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div>
                      <h4 className="font-medium text-gray-900">Animations</h4>
                      <p className="text-sm text-gray-600">
                        Enable smooth animations
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.animations}
                        onChange={(e) =>
                          handleSettingChange(
                            "appearance",
                            "animations",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Data Settings */}
            {activeTab === "data" && (
              <div className="space-y-6">
                <h3
                  className={`${
                    isDarkMode ? "text-white" : "text-gray-900"
                  } mb-6 text-xl font-semibold`}
                >
                  Data Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div>
                      <h4 className="font-medium text-gray-900">Auto Backup</h4>
                      <p className="text-sm text-gray-600">
                        Automatically backup data
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.autoBackup}
                        onChange={(e) =>
                          handleSettingChange(
                            "data",
                            "autoBackup",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      } block mb-2 text-sm font-medium`}>
                        Backup Frequency
                      </label>
                      <select
                        value={settings.backupFrequency}
                        onChange={(e) =>
                          handleSettingChange(
                            "data",
                            "backupFrequency",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>

                    <div>
                      <label className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      } block mb-2 text-sm font-medium`}>
                        Data Retention (days)
                      </label>
                      <input
                        type="number"
                        value={settings.dataRetention}
                        onChange={(e) =>
                          handleSettingChange(
                            "data",
                            "dataRetention",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      } block mb-2 text-sm font-medium`}>
                        Export Format
                      </label>
                      <select
                        value={settings.exportFormat}
                        onChange={(e) =>
                          handleSettingChange(
                            "data",
                            "exportFormat",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="JSON">JSON</option>
                        <option value="CSV">CSV</option>
                        <option value="XML">XML</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`flex items-center justify-between backdrop-blur-sm rounded-xl shadow-lg border p-6 transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-800/80 border-gray-700"
            : "bg-white/80 border-gray-200"
        }`}
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={handleExportData}
            className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-gray-600 rounded-lg hover:bg-gray-700"
          >
            <FaDownload size={16} />
            <span>Export Settings</span>
          </button>

          <button
            onClick={handleResetSettings}
            className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
          >
            <FaTrash size={16} />
            <span>Reset to Default</span>
          </button>
        </div>

        <button
          onClick={handleSaveSettings}
          className="flex items-center px-6 py-2 space-x-2 text-white transition-colors bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700"
        >
          <FaSave size={16} />
          <span>Save Settings</span>
        </button>
      </motion.div>
    </div>
  );
};

export default Settings;
