import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h2>My Blog</h2>
    </header>
  );
};
