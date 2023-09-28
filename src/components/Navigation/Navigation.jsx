import React from 'react';
import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <ul className={css.list}>
        <li>
          <NavLink className={css.home__link} to="/">
            <span className={css.home__span}>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={css.diagram__link} to="statistics">
            <span className={css.diagram__span}>Statistics</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={css.dollar__link} to="currency"></NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
