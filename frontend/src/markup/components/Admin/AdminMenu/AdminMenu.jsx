import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import {
  ClipboardDocumentListIcon,
  UserIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';
import { CalendarDaysIcon } from '@heroicons/react/24/outline'

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: Squares2X2Icon },
  { name: 'Orders', href: '/admin/orders', icon: ClipboardDocumentListIcon },
  { name: 'Employees', href: '/admin/employees', icon: UserIcon },
  { name: 'Customers', href: '/admin/customers', icon: UsersIcon },
  { name: 'Services', href: '/admin/services', icon: WrenchScrewdriverIcon },
  { name: 'Appointments', href: '/admin/appointments', icon: CalendarDaysIcon },
];

function AdminMenu() {
  const location = useLocation();

  return (
    <motion.div
      className="w-full max-w-sm p-6 bg-white shadow-2xl rounded-xl sticky top-0 h-full"
      // initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.h2
        className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2"
        // initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        // transition={{ delay: 0.1, duration: 0.3 }}
      >
        Admin Menu
      </motion.h2>
      <div className="space-y-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;

          return (
            <Link to={item.href} key={item.name}>
              <motion.div
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 hover:bg-blue-500 hover:text-white'
                }`}
                whileHover={{ 
                  scale: 1.01,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.1 } 
                }}
              >
                <item.icon
                  className={`h-6 w-6 ${
                    isActive ? 'text-white' : 'text-blue-600 group-hover:text-white'
                  }`}
                />
                <span className="text-lg font-medium">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

export default AdminMenu;