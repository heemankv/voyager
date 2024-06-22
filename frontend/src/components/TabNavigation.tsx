import { FilterTypes, TabNavigationProps } from '@/utils/types';
import React, { useState } from 'react';


const TabNavigation: React.FC<TabNavigationProps> = ({ selectedTab, onSelectTab }) => {
  const tabs = Object.values(FilterTypes);

  return (
    <div className="flex border-gray-700 text-white">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelectTab(tab)}
          className={`px-4 py-2 border border-gray-600 ${
            selectedTab === tab ? 'bg-gray-700' : ''
          }`}
        >
          {tab.toLowerCase()}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
