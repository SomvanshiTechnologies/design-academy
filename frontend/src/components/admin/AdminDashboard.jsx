import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import BlogManagement from './BlogManagement';
import EventManagement from './EventManagement';
import toast, { Toaster } from 'react-hot-toast';
import { FileText, Calendar, LogOut, Menu, X } from 'lucide-react';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState('blogs');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const menuItems = [
    { id: 'blogs', label: 'Blog Management', icon: FileText },
    { id: 'events', label: 'Event Management', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gray-100 mt-16">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:w-64 bg-white shadow-lg flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
            <p className="text-sm text-gray-600 mt-1">Content Management</p>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeSection === item.id
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon size={20} className="flex-shrink-0" />
                      <span className="ml-3 text-sm font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            
            <button
              onClick={handleLogout}
              className="w-full flex justify-start mt-4 items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <LogOut size={20} className="flex-shrink-0" />
              <span className="ml-3 text-sm font-medium">Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {/* Mobile Header */}
          <header className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
              </div>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu size={20} />
              </button>
            </div>
          </header>

          {/* Content Area */}
          <div className="h-full overflow-y-auto p-4 lg:p-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              {activeSection === 'blogs' && <BlogManagement />}
              {activeSection === 'events' && <EventManagement />}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-80 max-w-sm bg-white shadow-xl z-50 lg:hidden">
            {/* Mobile Menu Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">Content Management</p>
            </div>

            {/* Mobile Navigation Menu */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveSection(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                          activeSection === item.id
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <Icon size={20} className="flex-shrink-0" />
                        <span className="ml-3 text-sm font-medium">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Mobile Logout Button */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <LogOut size={20} className="flex-shrink-0" />
                <span className="ml-3 text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;