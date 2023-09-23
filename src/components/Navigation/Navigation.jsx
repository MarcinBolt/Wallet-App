import React from 'react';
import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <NavLink className={css.home} to="home"></NavLink>
      <NavLink className={css.diagram} to="diagram"></NavLink>
      <NavLink className={css.dollar} to="dollar"></NavLink>
    </nav>
  );
};

export default Navigation;
