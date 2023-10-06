import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../../utils/hooks/user.auth';
import css from './UserPanel.module.css';
import { Collapse, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  selectGlobalIsModalDeleteUserOpen,
  selectGlobalIsUserPanelOpen,
  selectTransactionsCurrency,
} from '../../redux/selectors';
import CustomButton from '../CustomButton/CustomButton';
import UserPanelModal from './UserPanelModal';
import ModalDeleteUser from '../ModalDeleteUser/ModalDeleteUser';
import { updateIsModalLogoutOpen } from '../../redux/global/global.slice';

// const theme = createTheme();

const UserPanel = () => {
  const dispatch = useDispatch();

  const isModalDeleteUserOpen = useSelector(selectGlobalIsModalDeleteUserOpen);
  const handleModalDeleteUser = () => {
    dispatch(updateIsModalLogoutOpen(!isModalDeleteUserOpen));
  };

  const [openPanelModal, setOpenPanelModal] = useState(false);
  const handleOpenPanelModal = () => setOpenPanelModal(true);
  const handleClosePanelModal = () => setOpenPanelModal(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  // useEffect(() => {
  //   window.addEventListener('keyup', handleKeyDown);
  //   return () => {
  //     window.removeEventListener('keyup', handleKeyDown);
  //   };
  // });

  // useEffect(() => {
  //   const handleEscapeKey = ev => {
  //     if (ev.key === 'Escape') {
  //       toggleUserPanel();
  //     }
  //   };
  //   window.addEventListener('keydown', handleEscapeKey);
  //   return () => {
  //     window.removeEventListener('keydown', handleEscapeKey);
  //   };
  // }, []);

  // const handleKeyDown = event => {
  //   if (event.code === 'Escape') {
  //     setOpenPanelModal(false);
  //   }
  // };
  //const userName = 'Damian';
  //const userEmail = 'dd@dd.net';

  const userName = useAuth().userName;
  const userEmail = useAuth().userEmail;
  const IsUserPanelOpen = useAuth().isUserPanelOpen;

  return (
    <>
      <Box
        boxShadow={10}
        sx={{
          borderRadius: '20px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          // minHeight: '92vh',
          maxWidth: '320px',
          background: 'white',
          position: 'fixed',
          top: '5px',
          right: 0,
          zIndex: 100,

          // ...(IsUserPanelOpen &&
          //   {
          //      right: '10px',
          //   }),
        }}
      >
        {/* COLLAPSE the entire User Panel to the left, click User Name in Header to OPEN */}
        <Collapse orientation="horizontal" in={IsUserPanelOpen}>
          <h1 className={css.header}>Hello {userName} </h1>
          <p className={css.paragraph}>Your E-mail is {userEmail}</p>
          <div className={css.container_input}>
            <CustomButton
              type="submit"
              color="primary"
              content="UPDATE ACCOUNT"
              onClick={handleOpenPanelModal}
            ></CustomButton>
          </div>
          <div className={css.container_input}>
            <CustomButton
              type="submit"
              color="secondary"
              // onClick={handleModalDeleteUser}
              content="DELETE ACCOUNT"
              onClick={handleOpenDeleteModal}
            ></CustomButton>
          </div>
          <Dialog
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              // minHeight: '100vh',
              // maxWidth: '100%',
              background: 'transparent',
              // left: '70%',
            }}
            PaperProps={{ sx: { borderRadius: '20px' } }}
            className="mui-fixed"
            open={openPanelModal}
          >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', p: '0', pr: '0', pb: '0' }}>
              <IconButton sx={{ ml: 'auto', pb: '0' }} onClick={handleClosePanelModal}>
                <CloseIcon sx={{ ml: 'auto' }} />
              </IconButton>
            </DialogTitle>
            <UserPanelModal></UserPanelModal>
          </Dialog>
        </Collapse>
      </Box>

      <Dialog
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          maxWidth: '200px',
          background: 'transparent',
          left: '70%',
        }}
        PaperProps={{ sx: { borderRadius: '20px' } }}
        className="mui-fixed"
        open={openDeleteModal}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', p: '20', pr: '20', pb: '0' }}>
          <IconButton sx={{ ml: 'auto', pb: '0' }} onClick={handleCloseDeleteModal}>
            <CloseIcon sx={{ ml: 'auto' }} />
          </IconButton>
        </DialogTitle>
        <ModalDeleteUser></ModalDeleteUser>
      </Dialog>
    </>
  );
};

export default UserPanel;
