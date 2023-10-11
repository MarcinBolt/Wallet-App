import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import css from './UserPanel.module.css';
import { Collapse, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  selectGlobalIsModalDeleteUserOpen,
  selectGlobalIsUserPanelOpen,
  selectUserEmail,
  selectUserFirstName,
} from '../../redux/selectors.js';
import CustomButton from '../CustomButton/CustomButton.jsx';
import UpdateUserModal from './UpdateUserModal/UpdateUserModal.jsx';
import ModalDeleteUser from '../ModalDeleteUser/ModalDeleteUser.jsx';
import { updateIsModalLogoutOpen } from '../../redux/global/global.slice.js';

const theme = createTheme();

const UserPanel = () => {
  const dispatch = useDispatch();

  const userFirstName = useSelector(selectUserFirstName);
  const userEmail = useSelector(selectUserEmail);
  const isUserPanelOpen = useSelector(selectGlobalIsUserPanelOpen);
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

  return (
    <>
      <Box
        boxShadow={isUserPanelOpen ? 10 : 0}
        sx={{
          borderRadius: '20px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '315px',
          background: 'white',
          position: 'fixed',
          top: '70px',
          right: '10px',
          zIndex: 100,
          '@media (min-width: 768px)': {
            top: '10px',
            right: '10px',
          },
        }}
      >
        <Collapse orientation="vertical" in={isUserPanelOpen}>
          <h2 className={css.header}>Hi, {userFirstName} </h2>
          <p className={css.paragraph}>Your e-mail address:</p>
          <p className={css.paragraph}>{userEmail}</p>
          <div className={css.container_input}>
            <CustomButton
              type="submit"
              color="primary"
              content="ACCOUNT SETTINGS"
              onClick={handleOpenPanelModal}
            />
          </div>
          <div className={css.container_input}>
            <CustomButton
              type="submit"
              color="red"
              // onClick={handleModalDeleteUser}
              content="DELETE ACCOUNT"
              style={{ background: 'red' }}
              onClick={handleOpenDeleteModal}
            />
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
            {/* <DialogTitle sx={{ display: 'flex', alignItems: 'center', p: '0', pr: '0', pb: '0' }}>
              <IconButton sx={{ ml: 'auto', pb: '0' }}>
                <CloseIcon sx={{ ml: 'auto' }} />
              </IconButton>
            </DialogTitle> */}
            <UpdateUserModal closeUpdateUserModal={handleClosePanelModal} />
          </Dialog>
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
            open={openDeleteModal}
          >
            {/* <DialogTitle sx={{ display: 'flex', alignItems: 'center', p: '20', pr: '20', pb: '0' }}> */}
            {/* <IconButton sx={{ ml: 'auto', pb: '0' }} onClick={handleCloseDeleteModal}>
              <CloseIcon sx={{ ml: 'auto' }} />
            </IconButton> */}
            {/* </DialogTitle> */}
            <ModalDeleteUser closeDeleteUserModal={handleCloseDeleteModal} />
          </Dialog>
        </Collapse>
      </Box>
    </>
  );
};

export default UserPanel;
