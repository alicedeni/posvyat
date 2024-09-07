import React, { useState } from 'react';
import TumbleweedIcon from '../assets/icons/Tumbleweed.svg'; 
import TumbleweedIconMobile from '../assets/icons/Tumbleweed.svg'; 

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); 

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="header">
      <nav className="header-nav">
        <ul className="header-nav-list">
          <li>
            <a href="/registration" className="header-nav-list-item">регистрация</a>
          </li>
          <li>
            <a href="/transfer" className="header-nav-list-item">трансфер</a>
          </li>
          <li>
            <a href="/">
            <img src={TumbleweedIcon} alt="Tumbleweed" className="header-icon" />
            </a>
          </li>
          <li>
            <a href="/check-in" className="header-nav-list-item">расселение</a>
          </li>
          <li>
            <a href="/castes" className="header-nav-list-item">касты</a>
          </li>
        </ul>
      </nav>
      <div className="header-mobile-toggle" onClick={toggleMobileMenu}></div> 
      {isMobileMenuOpen && (
        <div className="header-mobile">
          <ul className="header-mobile-list">
            <li className="header-mobile-list-item"><a href="/">Главная</a></li>
            <li className="header-mobile-list-item"><a href="/registration">Регистрация</a></li>
            <li className="header-mobile-list-item"><a href="/transfer">Трансфер</a></li>
            <li className="header-mobile-list-item"><a href="/check-in">Расселение</a></li>
            <li className="header-mobile-list-item"><a href="/castes">Касты</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;