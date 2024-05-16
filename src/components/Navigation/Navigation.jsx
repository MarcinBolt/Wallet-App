import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { NavLink } from 'react-router-dom';
import Media from 'react-media';
import { mediaQueries } from '../../utils/constants';
import css from './Navigation.module.css';

const Navigation = () => {
  const { mobile } = mediaQueries;

  return (
    <nav className={css.nav}>
      <ul className={css.list}>
        <li className={css.listItem}>
          <NavLink className={css.link} to="/dashboard" end>
            <SvgIcon
              viewBox="0 0 38 38"
              color="inherit"
              sx={{
                width: '44px',
                height: '44px',
                padding: '0px',
                fill: 'var(--color-icon-navi-hover)',
                transition: 'all 50ms ease-in-out',
                '@media screen and (min-width: 768px)': {
                  width: '24px',
                  height: '24px',
                },
              }}
            >
              <path
                className={css.svg}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 0C2.68629 0 0 2.68629 0 6V32C0 35.3137 2.68629 38 6 38H32C35.3137 38 38 35.3137 38 32V6C38 2.68629 35.3137 0 32 0H6ZM15.9333 21.3594V29.5555H9.1V18.6274H5L18.6667 6.33325L32.3333 18.6274H28.2333V29.5555H21.4V21.3594H15.9333Z"
                fill=""
              />
            </SvgIcon>

            <span className={css.span}>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={css.link} to="statistics">
            <SvgIcon
              viewBox="0 0 38 38"
              color="inherit"
              sx={{
                width: '44px',
                height: '44px',
                padding: '0px',
                fill: 'var(--color-icon-navi-hover)',
                transition: 'all 50ms ease-in-out',
                '@media screen and (min-width: 768px)': {
                  width: '24px',
                  height: '24px',
                },
              }}
            >
              <path
                className={css.svg}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 0C2.68629 0 0 2.68629 0 6V32C0 35.3137 2.68629 38 6 38H32C35.3137 38 38 35.3137 38 32V6C38 2.68629 35.3137 0 32 0H6ZM29.5 16.5555C30.7833 16.5555 31.8333 15.4555 31.8333 14.1111C31.8333 12.7666 30.7833 11.6666 29.5 11.6666C28.2166 11.6666 27.1666 12.7666 27.1666 14.1111C27.1666 14.3311 27.19 14.5389 27.2483 14.7344L23.1066 19.0855C22.92 19.0244 22.71 19 22.5 19C22.29 19 22.08 19.0244 21.8933 19.0855L18.9183 15.9689C18.9766 15.7733 19 15.5533 19 15.3333C19 13.9889 17.95 12.8889 16.6666 12.8889C15.3833 12.8889 14.3333 13.9889 14.3333 15.3333C14.3333 15.5533 14.3566 15.7733 14.415 15.9689L9.09498 21.53C8.90831 21.4689 8.70998 21.4444 8.49998 21.4444C7.21664 21.4444 6.16664 22.5444 6.16664 23.8889C6.16664 25.2333 7.21664 26.3333 8.49998 26.3333C9.78331 26.3333 10.8333 25.2333 10.8333 23.8889C10.8333 23.6689 10.81 23.4611 10.7516 23.2655L16.06 17.6922C16.2466 17.7533 16.4566 17.7778 16.6666 17.7778C16.8766 17.7778 17.0866 17.7533 17.2733 17.6922L20.2483 20.8089C20.19 21.0044 20.1666 21.2244 20.1666 21.4444C20.1666 22.7889 21.2166 23.8889 22.5 23.8889C23.7833 23.8889 24.8333 22.7889 24.8333 21.4444C24.8333 21.2244 24.81 21.0044 24.7516 20.8089L28.905 16.47C29.0916 16.5311 29.29 16.5555 29.5 16.5555Z"
                fill=""
              />
            </SvgIcon>
            <span className={css.span}>Statistics</span>
          </NavLink>
        </li>
        <li>
          <Media queries={{ small: mobile }}>
            {matches =>
              matches.small ? (
                <NavLink className={css.link} to="currency">
                  <SvgIcon
                    className={css.icon}
                    viewBox="0 0 38 38"
                    sx={{
                      width: '44px',
                      height: '44px',
                      padding: '0px',
                      fill: 'var(--color-icon-navi-hover)',
                      transition: 'all 50ms ease-in-out',
                      '@media screen and (min-width: 768px)': {
                        width: '24px',
                        height: '24px',
                      },
                    }}
                  >
                    <path
                      className={css.svg}
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6 0C2.68629 0 0 2.68629 0 6V32C0 35.3137 2.68629 38 6 38H32C35.3137 38 38 35.3137 38 32V6C38 2.68629 35.3137 0 32 0H6ZM15.7523 15.5989C15.7523 16.7809 16.6607 17.5399 19.4852 18.2741C22.3096 19.0082 25.3332 20.2151 25.3332 23.7489C25.3332 26.2996 23.4046 27.7056 20.9783 28.166V30.8412H17.2455V28.1411C14.8565 27.631 12.8159 26.1005 12.6666 23.3756H15.4039C15.5408 24.8438 16.5487 25.9885 19.1119 25.9885C21.8617 25.9885 22.4714 24.6198 22.4714 23.7613C22.4714 22.6041 21.8493 21.5092 18.7386 20.7626C15.2671 19.9289 12.8905 18.498 12.8905 15.6238C12.8905 13.2223 14.8316 11.6546 17.2455 11.132V8.44434H20.9783V11.1693C23.5788 11.8039 24.8853 13.7698 24.9724 15.91H22.2225C22.1479 14.3546 21.3267 13.297 19.1119 13.297C17.0091 13.297 15.7523 14.2426 15.7523 15.5989Z"
                      fill=""
                    />
                  </SvgIcon>
                </NavLink>
              ) : null
            }
          </Media>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
