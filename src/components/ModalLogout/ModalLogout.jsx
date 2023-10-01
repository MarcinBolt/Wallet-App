import { useEffect, useRef } from 'react';
import closeIcon from '../../assets/icons/close.svg';
import CustomButton from '../CustomButton/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserFirstName } from '../../redux/selectors';
import TitleComponent from '../TitleComponent/Title.Component';
import css from './ModalLogout.module.css';
import { logOut } from '../../redux/auth/auth.operations';

const ModalLogout = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserFirstName);
  const modalBackdropRef = useRef(null);

//const toggleModal = () => console.log(`Modal się zamyka`)

useEffect(() => {
    const handleEscapeKey = ev => {
      if (ev.key === 'Escape') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const closeOnBackdropClick = ev => {
    if (modalBackdropRef.current === ev.target) {
      toggleModal();
    }
  };

  const handleUserLogout = ev => {
    ev.preventDefault;
   dispatch(logOut())
  };

  return (
   
      <div className={css.backdrop} ref={modalBackdropRef} onClick={closeOnBackdropClick}>
        <div className={css.logoutModalContainer}>
          <div className={css.closeIconContainer}>
            <img src={closeIcon} alt="Close" className={css.closeIcon} onClick={toggleModal} />
          </div>
         
            <TitleComponent text={`Confirm Logout`} />
            <span className={css.logoutInfo}>Bye, {userName}! It was nice to serve you!</span>
            <div className={css.confirmButtons}>
              <CustomButton
                type="button"
                color="primary"
                content="Logout"
                onClick={handleUserLogout}
                className={`${css.logo} ${css.logout_button}`}
              />

              <CustomButton
                type="button"
                color="secondary"
                content="Go back to dashboard"
                onClick={toggleModal}
                className={css.main_btn}
              />
            </div>
          </div>
        </div>
     
 
  );
};

export default ModalLogout;
