import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button'; 
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'; 
import { createTheme,  ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../utils/hooks/user.auth'; 
import css from './UserPanel.module.css';
import { Collapse, DialogTitle, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AccountBoxIcon from '@mui/icons-material/AccountBox'; 
import MoneyIcon from '@mui/icons-material/Money';
import CloseIcon from '@mui/icons-material/Close';
import { deleteUser, updateUser } from '../../redux/auth/auth.operations'; 
import PersonOffIcon from '@mui/icons-material/PersonOff'; 
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'; 
import { selectGlobalIsModalDeleteUserOpen, selectGlobalIsUserPanelOpen, selectTransactionsCurrency } from '../../redux/selectors'; 
import CustomButton from '../CustomButton/CustomButton';
import UserPanelModal from './UserPanelModal';
import ModalDeleteUser from '../ModalDeleteUser/ModalDeleteUser';
import { updateIsModalLogoutOpen } from '../../redux/global/global.slice';

const theme = createTheme();
  
const UserPanel = () => {
 
const isModalDeleteUserOpen = useSelector(selectGlobalIsModalDeleteUserOpen);   
const dispatch = useDispatch();
const handleModalDeleteUser = () => { 
  dispatch(updateIsModalLogoutOpen(!isModalDeleteUserOpen));
}; 

const [openPanelModal, setOpenPanelModal] = React.useState(false);
const handleOpenPanelModal = () => setOpenPanelModal(true);
const handleClosePanelModal = () => setOpenPanelModal(false);
 
const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
const handleOpenDeleteModal = () => setOpenDeleteModal(true);
const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  React.useEffect(() => {
    window.addEventListener("keyup", handleKeyDown);
    return () => {
      window.removeEventListener("keyup", handleKeyDown);
    };
  });
 
  const handleKeyDown = (event) => { 
    if (event.code === "Escape") {
      handleClose();
    }
  };
  
  const userName = useAuth().userName;
  const userEmail = useAuth().userEmail; 
  const IsUserPanelOpen = useAuth().isUserPanelOpen;
  // const onClickDeleteUser = () => { 
  //   dispatch(deleteUser())
  //   ;
  // } 
   
  return ( 
    <>
    <Box  
      sx={{ 
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '92vh',
        maxWidth: '450px',
        background: 'white',
        position: 'fixed',
        top: 0, 
        right: 0, 
        ...IsUserPanelOpen && {
          //  right: 0, 
        },  
      }}
    > 
 
      {/* <Collapse orientation="horizontal" in={IsUserPanelOpen} >  */}
        <h1>Hello {userName} </h1>
        <p>Your E-mail is {userEmail}</p> 
        <div className={css.container_input}> 
           <CustomButton type="submit" color="primary" 
          content="UPDATE ACCOUNT" onClick={handleOpenPanelModal}></CustomButton>
        </div>
        <div className={css.container_input}> 
          <CustomButton type="submit" color="secondary" 
          // onClick={handleModalDeleteUser} 
          content="DELETE ACCOUNT"  onClick={handleOpenDeleteModal}></CustomButton>
          
        </div>
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
          PaperProps={{ sx: { borderRadius: "20px" } }}
          className="mui-fixed" 
          open={openPanelModal} 
        > 

          <DialogTitle sx={{ display: 'flex', alignItems: 'center',
           p: '20', pr: '20', pb: '0'  }}> 
            <IconButton sx={{ ml: 'auto', pb: '0' }} onClick={handleClosePanelModal}>
              <CloseIcon sx={{ ml: 'auto' }}/>
            </IconButton>
          </DialogTitle>
          <UserPanelModal></UserPanelModal> 
        </Dialog> 
  {/* </Collapse>  */}




  {/* {isModalDeleteUserOpen && <ModalDeleteUser toggleModal={handleModalDeleteUser} />} */}
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
          PaperProps={{ sx: { borderRadius: "20px" } }}
          className="mui-fixed" 
          open={openDeleteModal} 
        > 

        <DialogTitle sx={{ display: 'flex', alignItems: 'center',
           p: '20', pr: '20', pb: '0'  }}> 
          <IconButton sx={{ ml: 'auto', pb: '0' }} onClick={handleCloseDeleteModal}>
              <CloseIcon sx={{ ml: 'auto' }}/>
          </IconButton>
        </DialogTitle>
        <ModalDeleteUser></ModalDeleteUser> 
      </Dialog> 
  </>
  );
 }
  
 ;
export default UserPanel;
