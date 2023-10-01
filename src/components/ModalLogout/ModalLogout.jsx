import { useEffect } from 'react';
import css from './ModalLogout.module.css';
import { toast } from 'react-toastify';
import closeIcon from '../../assets/icons/close.svg';
import CustomButton from '../CustomButton/CustomButton';

export const ModalLogout = ({ closeModal, handleLogout }) => {
  useEffect(() => {
    const close = e => {
      if (e.key === 'Escape') {
        closeModal();
        console.log('Modal zamknięty przez Escape');
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [closeModal]);

  const confirmLogout = async () => {
    try {
      await handleLogout();
      closeModal();
       console.log('Potwierdzono wylogowanie');
    } catch (error) {
      toast.error('Błąd podczas wylogowywania.');
      closeModal();
      console.error('Błąd podczas wylogowywania:', error);
    }
  };

  const handleCancel = () => {
    closeModal();
    console.log('Anulowano wylogowanie');
  };

  return (
    <>
      <div className={css.logoutModalOverlay} onClick={closeModal}></div>
      <div className={css.logoutModalContainer}>
        <div className={css.closeIconContainer}>
          <img src={closeIcon} alt="Close" className={css.closeIcon} onClick={closeModal} />
        </div>
        <div className={css.logoutModalContent}>
          <h2>Confirm</h2>
          <span className={css.logoutInfo}>return to login page</span>
          <div className={css.confirmButtons}>
            <CustomButton
              type="button"
              color="primary"
              content="confirm"
              onClick={confirmLogout}
              className={`${css.logo} ${css.logout_button}`}
            >
              {' '}
              Confirm{' '}
            </CustomButton>
            <CustomButton
              type="button"
              color="secondary"
              content="Cancel"
              onClick={handleCancel}
              className={css.main_btn}
            >
              Cancel
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
};
