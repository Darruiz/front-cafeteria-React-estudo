import React, { useState } from 'react';
import styles from '../../styles/bases/Header.module.css';
import logo from '../../assets/bases/coffee-logo.svg';
import { addTeste, showTeste, useTeste } from '../../globals/states/teste/TesteState';

export function Header() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const teste = useTeste();

    // const handleAddTeste = () => {
    //     addTeste(`Item ${teste.length + 1}`);
    // };
    return (
        <header className={styles.header}>
            <div className={styles['logo-container']}>
                <img className={styles.logo} src={logo} alt="Cafeteria Logo" />
                <span className={styles.brand}>Cafeteria</span>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.menu}>
                    <li>
                        <a 
                        href='/'
                        // onClick={handleAddTeste}
                        >
                            Home</a>
                    </li>
                    <li>
                        <a 
                        href='/fazer-pedido'
                        // onClick={showTeste}
                        >Fazer Pedido</a>
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
                    <a 
                        href='/'
                        // onClick={handleAddTeste}
                        >
                            Home</a>
                    </li>
                    <li>
                        <a 
                        href='/fazer-pedido'
                        // onClick={showTeste}
                        >Fazer Pedido</a>
                    </li>
                    <li>
                        <a href="/sobre">Sobre</a>
                    </li>
                </ul>
            </aside>
        </header>
    );
}