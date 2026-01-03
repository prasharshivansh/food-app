"use client";

import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar orange-navbar">
      <div className="navbar-left">
        <div className="navbar-logo-block">
          <span className="chef-hat" aria-label="chef hat" role="img">🍽️</span>
          <div className="navbar-branding">
            <span className="orange-title">ORANGE <span className="feast-title">FEAST</span></span>
            <span className="navbar-subtitle">Recipes & Culinary Adventures</span>
          </div>
        </div>
      </div>
      <div className="navbar-center">
        <Link href="/" className="navbar-link">HOME</Link>
        <Link href="/meals" className="navbar-link">RECIPES</Link>
        <Link href="/share" className="navbar-link">SHARE</Link>
        <Link href="/favorites" className="navbar-link">FAVORITES</Link>
      </div>
      <div className="navbar-right">
        <div className="navbar-search">
          <input type="text" className="navbar-search-input" placeholder="Search..." />
        </div>
      </div>
    </nav>
  );
}
