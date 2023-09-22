import { useEffect } from 'react';
import css from './ModalLogout.module.css';

export const ModalLogout = ({ closeModal, handleLogout }) => {
  useEffect(() => {
    const close = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [closeModal]);

  return (
    <>
      <div className={css.logoutModalOverlay} onClick={closeModal}></div>
      <div className={css.logoutModalContainer}>
        <div className={css.logoutModalContent}>
          <h2>Confirm</h2>
          <span className={css.logoutInfo}>return to login page</span>
          <div className={css.confirmButtons}>
            <button
              type="button"
              text="LOGOUT"
              className={`${css.logo} ${css.logout_button}`}
              onClick={handleLogout}
            >
              {' '}
              Confirm{' '}
            </button>
            <button onClick={closeModal} type="button" className={css.main_btn}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
