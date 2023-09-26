import Container from '@mui/material/Container';
import SvgIcon from '@mui/material/SvgIcon';
import css from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsModalLogoutOpen } from '../../redux/selectors';
import { openModalLogout } from '../../redux/auth/auth.slice';
import { selectUserFirstName } from '../../redux/selectors';
import Logo from '../Logo/Logo';

const Header = () => {
  const name = useSelector(selectUserFirstName);
  const isModalLogoutOpen = useSelector(selectIsModalLogoutOpen);
  const dispatch = useDispatch();

  const handleModalLogoutOpen = ev => {
    ev.preventDefault;
    dispatch(openModalLogout());
  };

  return (
    <div className={css.headerWrapper}>
      <Container
        sx={{
          '@media screen and (min-width: 780px)': {
            padding: '0 32px',
          },
          '@media screen and (min-width: 1280px)': {
            padding: '0 16px',
          },
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          className={css.logoWrapper}
          sx={{
            display: 'flex',
            justifyContent: 'left',
          }}
        >
          <Logo />
        </div>
        <div className={css.userWrapper} onClick={handleModalLogoutOpen}>
          <p className={css.text}>{name}</p>
          <div className={css.exitWrapper}>
            <SvgIcon
              viewBox="0 0 18 18"
              sx={{
                width: '18px',
                height: '18px',
                padding: '0px',
              }}
            >
              <g clipPath="url(#clip0_4_400)">
                <path
                  d="M11.2788 13.0708H12.6844V15.8818C12.6844 17.0443 11.7386 17.99 10.5761 17.99H2.10814C0.945786 17.99 0 17.0443 0 15.8818V2.10814C0 0.945786 0.945786 0 2.10814 0H10.5761C11.7386 0 12.6844 0.945786 12.6844 2.10814V4.91913H11.2788V2.10814C11.2788 1.72073 10.9637 1.40543 10.5761 1.40543H2.10814C1.72073 1.40543 1.40543 1.72073 1.40543 2.10814V15.8818C1.40543 16.2692 1.72073 16.5845 2.10814 16.5845H10.5761C10.9637 16.5845 11.2788 16.2692 11.2788 15.8818V13.0708ZM14.6872 5.68213L13.6934 6.67598L15.3096 8.29234H6.21922V9.69777H15.3096L13.6934 11.314L14.6872 12.3078L18 8.99506L14.6872 5.68213Z"
                  fill="#BDBDBD"
                />
              </g>
              <defs>
                <clipPath id="clip0_4_400">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </SvgIcon>
            <p className={css.exit}>Exit</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;

// logika dodawania modala logout