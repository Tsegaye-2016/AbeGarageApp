import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

function Card({ title, value, icon: Icon, color }) {
  const colorMap = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      iconBg: 'bg-blue-200',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      iconBg: 'bg-green-200',
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      iconBg: 'bg-purple-200',
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-600',
      iconBg: 'bg-red-200',
    },
  };

  const colors = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      className={`rounded-2xl p-5 shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-4">
        {Icon && (
          <div
            className={`p-3 rounded-full ${colors.iconBg} ${colors.text} flex items-center justify-center`}
          >
            <Icon className="h-6 w-6" />
          </div>
        )}
        <div>
          <h4 className="text-sm font-medium text-gray-500">{title}</h4>
          <p className={`text-3xl font-bold ${colors.text}`}>
            <CountUp end={parseInt(value) || 0} duration={1.5} separator="," />
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
