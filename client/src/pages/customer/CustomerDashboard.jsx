import React from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Sidebar, Layout, Button, Text } from 'lucid-react';

const CustomerDashboard = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <Layout>
      <Navbar
        title="Customer Dashboard"
        description="Welcome back!"
        actions={[
          <Button key="logout" onClick={handleLogout}>Logout</Button>
        ]}
      />

      <Sidebar>
        <Sidebar.Item title="Profile" onClick={() => history.push('/profile')} />
        <Sidebar.Item title="Orders" onClick={() => history.push('/orders')} />
        <Sidebar.Item title="Settings" onClick={() => history.push('/settings')} />
      </Sidebar>

      <Layout.Main>
        <div className="p-6 bg-gray-100 min-h-screen">
          <Text variant="h3" className="text-2xl font-semibold mb-4">Welcome back, [User Name]!</Text>
          <Text variant="body" className="text-lg text-gray-700 mb-6">
            Here’s a summary of your activity. You can view your orders, update your profile, and much more.
          </Text>

          {/* Dashboard Stats or Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Text variant="h4" className="text-xl mb-2">Total Orders</Text>
              <Text variant="body" className="text-lg font-bold">10</Text>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Text variant="h4" className="text-xl mb-2">Pending Orders</Text>
              <Text variant="body" className="text-lg font-bold">2</Text>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Text variant="h4" className="text-xl mb-2">Total Spend</Text>
              <Text variant="body" className="text-lg font-bold">$500</Text>
            </div>
          </div>
        </div>
      </Layout.Main>
    </Layout>
  );
};

export default CustomerDashboard;
