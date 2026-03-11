// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Admin = () => {
  const mockOrders = [
    { id: '#1001', item: 'The Signature T-Shirt', size: 'M', amount: '₹700', status: 'Processing', date: '2026-03-11' },
    { id: '#1002', item: 'The Signature T-Shirt', size: 'L', amount: '₹700', status: 'Shipped', date: '2026-03-10' },
    { id: '#1003', item: 'The Signature T-Shirt', size: 'S', amount: '₹1400', status: 'Delivered', date: '2026-03-08' },
  ];

  return (
    <div className="min-h-screen bg-brand-white flex">
      {/* Sidebar Navigation */}
      <motion.aside 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-brand-black text-brand-white flex flex-col fixed h-full z-10"
      >
        <div className="p-6">
          <h2 className="text-xl font-display tracking-widest uppercase">TCC Admin</h2>
        </div>
        <nav className="flex-1 px-4 mt-8 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-brand-white/10 rounded-md text-sm font-medium uppercase tracking-wider">
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-brand-white/60 hover:bg-brand-white/5 rounded-md text-sm font-medium uppercase tracking-wider transition-colors">
            Orders
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-brand-white/60 hover:bg-brand-white/5 rounded-md text-sm font-medium uppercase tracking-wider transition-colors">
            Products
          </a>
        </nav>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 lg:p-12">
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-10">
            <h1 className="text-3xl font-display uppercase tracking-tight text-brand-black">Overview</h1>
            <p className="text-brand-darkGray/60 mt-2">Welcome back. Here's what is happening with your store today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Total Revenue', value: '₹2,800' },
              { label: 'Orders', value: '3' },
              { label: 'Conversion Rate', value: '4.2%' },
            ].map((stat, i) => (
              <div key={i} className="bg-brand-gray p-6 border border-brand-black/5">
                <p className="text-xs uppercase tracking-widest text-brand-darkGray/70 mb-2">{stat.label}</p>
                <p className="text-3xl font-medium">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Orders Table */}
          <div className="bg-brand-white border border-brand-gray overflow-hidden">
            <div className="p-6 border-b border-brand-gray">
              <h2 className="text-lg font-medium uppercase tracking-wider">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-gray/50 text-xs uppercase tracking-widest text-brand-darkGray/70">
                    <th className="p-4 font-medium">Order ID</th>
                    <th className="p-4 font-medium">Item</th>
                    <th className="p-4 font-medium hidden sm:table-cell">Size</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {mockOrders.map((order, i) => (
                    <tr key={i} className="border-b border-brand-gray last:border-0 hover:bg-brand-gray/20 transition-colors">
                      <td className="p-4 font-medium">{order.id}</td>
                      <td className="p-4 text-brand-darkGray">{order.item}</td>
                      <td className="p-4 text-brand-darkGray hidden sm:table-cell">{order.size}</td>
                      <td className="p-4 text-brand-darkGray">{order.date}</td>
                      <td className="p-4">
                        <span className={`inline-block px-2 py-1 text-[10px] uppercase tracking-wider rounded-sm ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-right font-medium">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Admin;
