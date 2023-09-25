import React from 'react';
import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <NavLink className={css.home__link} to="home">
        <span className={css.home__span}>Home</span>
      </NavLink>
      <NavLink className={css.diagram__link} to="diagram">
        <span className={css.diagram__span}>Statistics</span>
      </NavLink>
      <NavLink className={css.dollar__link} to="dollar">
      </NavLink>
    </nav>
  );
};

export default Navigation;
