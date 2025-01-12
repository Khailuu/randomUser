// import React from 'react'
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <img
        src="https://inchi.vn/data/cms_upload/files/blog/logo-dep/100.jpg"
        alt="logo"
        className={styles.logo}
      />
    </header>
  );
};

export default Header;
