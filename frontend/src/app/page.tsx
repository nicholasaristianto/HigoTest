"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FiUsers,
  FiMap,
  FiCalendar,
  FiMonitor,
  FiClock,
  FiSmartphone,
  FiGrid,
  FiSearch,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import GenderChart from "../components/GenderChart";
import CustomerLocationChart from "../components/CustomerLocationChart";
import AgeGroupChart from "../components/AgeGroupChart";
import CustomerTable from "../components/CustomerTable";
import DigitalInterestChart from "../components/DigitalInterestChart";
import LoginHourChart from "../components/LoginHourChart";
import BrandDeviceChart from "../components/BrandDeviceChart";

export default function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(1000);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activePanel, setActivePanel] = useState<string | null>("table");

  const totalPages = Math.ceil(total / limit);

  const fetchData = async () => {
    setLoading(true);
    const skip = page * limit;
    const res = await axios.get(`http://localhost:5000/api/customer/all?limit=${limit}&skip=${skip}`);
    setData(res.data.data);
    setTotal(res.data.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  const filteredData = data.filter((c: any) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const chartPanels = [
    {
      id: "gender",
      title: "Customer Gender",
      icon: <FiUsers className="mr-2" />,
      component: <GenderChart />
    },
    {
      id: "location",
      title: "Customer Location",
      icon: <FiMap className="mr-2" />,
      component: <CustomerLocationChart />
    },
    {
      id: "age",
      title: "Age Groups",
      icon: <FiCalendar className="mr-2" />,
      component: <AgeGroupChart />
    },
    {
      id: "digital",
      title: "Digital Interest",
      icon: <FiMonitor className="mr-2" />,
      component: <DigitalInterestChart />
    },
    {
      id: "login",
      title: "Login Hours",
      icon: <FiClock className="mr-2" />,
      component: <LoginHourChart />
    },
    {
      id: "device",
      title: "Device Brands",
      icon: <FiSmartphone className="mr-2" />,
      component: <BrandDeviceChart />
    }
  ];

  const togglePanel = (panelId: string) => {
    setActivePanel(activePanel === panelId ? null : panelId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Customer Analytics Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">Comprehensive overview of customer data and metrics</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center bg-blue-50 rounded-lg px-4 py-2">
                <span className="text-sm font-medium text-blue-800">
                  Total Customers: <span className="font-bold">{total.toLocaleString()}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 bg-white rounded-lg shadow p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search customers by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="items-per-page" className="text-sm text-gray-600">Items per page:</label>
              <select
                id="items-per-page"
                value={limit}
                onChange={(e) => {
                  setPage(0);
                  setLimit(parseInt(e.target.value));
                }}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={100}>100</option>
                <option value={500}>500</option>
                <option value={1000}>1000</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {chartPanels.slice(0, 3).map((panel) => (
            <div key={panel.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-2 text-lg font-semibold text-gray-700">
                {panel.icon}
                {panel.title}
              </div>
              {panel.component}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {chartPanels.slice(3, 6).map((panel) => (
            <div key={panel.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-2 text-lg font-semibold text-gray-700">
                {panel.icon}
                {panel.title}
              </div>
              {panel.component}
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <button
            className={`w-full px-4 py-3 flex items-center text-left font-medium ${activePanel === 'table' ? 'bg-blue-50 text-blue-700' : 'bg-white hover:bg-gray-50'}`}
            onClick={() => togglePanel('table')}
          >
            <FiGrid className="mr-2" />
            Customer Data Table
            <span className="ml-auto">{activePanel === 'table' ? '−' : '+'}</span>
          </button>
          <AnimatePresence initial={false}>
            {activePanel === 'table' && (
              <motion.div
                className="border-t border-gray-200"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="p-4">
                    <CustomerTable data={filteredData} page={page} limit={limit} />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 rounded-b-lg shadow sm:px-6">
          <div className="hidden sm:flex sm:items-center sm:justify-between w-full">
            <p className="text-sm text-gray-700">
              Showing page <span className="font-medium">{page + 1}</span> of{' '}
              <span className="font-medium">{totalPages}</span>
            </p>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                disabled={page === 0}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <FiChevronLeft className="h-5 w-5" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) pageNum = i;
                else if (page < 3) pageNum = i;
                else if (page > totalPages - 4) pageNum = totalPages - 5 + i;
                else pageNum = page - 2 + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === pageNum
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                disabled={page >= totalPages - 1}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <FiChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
}
