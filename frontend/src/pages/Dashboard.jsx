import { Settings, Package, Heart, LogOut } from 'lucide-react';
import { useState } from 'react';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Package },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 text-center hover:shadow-lg transition">
          <div className="text-4xl font-bold text-deep-blue mb-2">0</div>
          <p className="text-gray-600">Total Orders</p>
        </div>
        <div className="card p-6 text-center hover:shadow-lg transition">
          <div className="text-4xl font-bold text-deep-blue mb-2">0</div>
          <p className="text-gray-600">Pending Orders</p>
        </div>
        <div className="card p-6 text-center hover:shadow-lg transition">
          <div className="text-4xl font-bold text-deep-blue mb-2">0</div>
          <p className="text-gray-600">Wishlisted Items</p>
        </div>
        <div className="card p-6 text-center hover:shadow-lg transition">
          <div className="text-4xl font-bold text-deep-blue mb-2">0</div>
          <p className="text-gray-600">Loyalty Points</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="flex border-b">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-deep-blue text-deep-blue'
                    : 'border-transparent text-gray-600 hover:text-deep-blue'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Welcome to your dashboard!</p>
              <p className="text-gray-500">You don't have any orders yet. Start shopping now!</p>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="text-center py-12">
              <p className="text-gray-600">No orders found</p>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="text-center py-12">
              <p className="text-gray-600">Your wishlist is empty</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-4">Account Settings</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-4 card hover:bg-gray-50 transition">
                    Change Password
                  </button>
                  <button className="w-full text-left p-4 card hover:bg-gray-50 transition">
                    Manage Addresses
                  </button>
                  <button className="w-full text-left p-4 card hover:bg-gray-50 transition">
                    Email Preferences
                  </button>
                  <button className="w-full text-left p-4 card hover:bg-red-50 text-red-600 transition flex items-center gap-2">
                    <LogOut size={20} /> Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
