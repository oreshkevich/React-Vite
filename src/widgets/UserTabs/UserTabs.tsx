import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './UserTabs.module.scss';

interface UserTabsProps {
  userId: number | string;
}

export const UserTabs: React.FC<UserTabsProps> = ({userId}) => {
  const tabs = [
    {to: `/users/${userId}/posts`, label: 'Посты'},
    {to: `/users/${userId}/albums`, label: 'Альбомы'},
    {to: `/users/${userId}/todos`, label: 'Задачи'},
  ];

  return (
    <nav className={styles.tabs}>
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({isActive}) =>
            isActive ? `${styles.tab} ${styles.active}` : styles.tab
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
};
