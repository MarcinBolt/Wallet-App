import React from 'react';
import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <NavLink className={css.home} to="home">
        <svg>
          <use href="../assets/icons/nav.sprite.svg#home-icon"></use>
        </svg>
        <span className={css.home}>Home</span>
      </NavLink>
      <NavLink className={css.diagram} to="diagram">
        <svg>
          <use href="../assets/icons/nav.sprite.svg#diagram-icon"></use>
        </svg>
        <span className={css.statistics}>Statistics</span>
      </NavLink>
      <NavLink className={css.dollar} to="dollar">
        <svg>
          <use href="../assets/icons/nav.sprite.svg#currency-icon"></use>
        </svg>
      </NavLink>
    </nav>
  );
};

export default Navigation;
