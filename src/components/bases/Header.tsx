import React, { useState } from 'react';
import styles from '../../styles/bases/Header.module.css';
import logo from '../../assets/bases/coffee-logo.svg';

export function Header() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles['logo-container']}>
                <img className={styles.logo} src={logo} alt="Cafeteria Logo" />
                <span className={styles.brand}>Cafeteria</span>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.menu}>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/fazer-pedido">Fazer Pedido</a>
                    </li>
                    <li>
                        <a href="/sobre">Sobre</a>
                    </li>
                </ul>
                <div className={styles.hamburger} onClick={toggleSidebar}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </nav>

            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
                <button className={styles.close} onClick={toggleSidebar}>
                    &times;
                </button>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/fazer-pedido">Fazer Pedido</a>
                    </li>
                    <li>
                        <a href="/sobre">Sobre</a>
                    </li>
                </ul>
            </aside>
        </header>
    );
}