import { useEffect, useRef } from 'react'; 
import CustomButton from '../CustomButton/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserFirstName } from '../../redux/selectors'; 
import css from './ModalDeleteUser.module.css';
import { deleteUser, logOut } from '../../redux/auth/auth.operations';
import { updateIsModalLogoutOpen } from '../../redux/global/global.slice';
import { useNavigate } from 'react-router';

const ModalDeleteUser = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserFirstName);
  const modalBackdropRef = useRef(null);

  const handleModalDeleteUser = () => { 
    dispatch(updateIsModalLogoutOpen(!isModalDeleteUserOpen));
  }; 

  const navigate = useNavigate();
  const onClickDeleteUser = () => {  
    dispatch(deleteUser())
    ;
  } 

  return (
    <div className={css.backdrop} ref={modalBackdropRef}  
    >
      <div className={css.logoutModalContainer}> 
        <span className={css.logoutTitle}>Confirm Account Deletion</span> 
        <span className={css.logoutInfo}>Are you sure, {userName}? We'll miss you!</span>
        <div className={css.confirmButtons}>
          <CustomButton
            type="button"
            color="primary"
            content="Delete User"
            onClick={onClickDeleteUser}
            sx = {{
                width: '240px',
                padding: '30px'
            }}
            className={`${css.logo} ${css.delete_button}`}
          />

          <CustomButton
            type="button"
            color="secondary"
            content="Go back to dashboard"
            onClick={() => navigate('/dashboard', { replace: false })}
            className={css.delete_button}
            sx = {{
                width: '240px'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteUser;
