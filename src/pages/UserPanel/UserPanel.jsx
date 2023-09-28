import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../utils/hooks/user.auth';
// import { logIn } from '../redux/auth/auth.operations.js';
import css from './UserPanel.module.css';
import { Modal } from '@mui/material';
 

 const theme = createTheme();

 





const UserPanel = () => {


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
 
  // const  userName = useAuth();
  // const  userEmail = useAuth();
  const userName  = 'Damian';
    const  userEmail = 'dd@dd.net';
  let isShown = false;
  

  const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };
  
 

  //for testing ONLY
  const handleClick = () => {
    console.log('works')
    
    isShown = !isShown;
    console.log(isShown)
    
  }

  return (
    <Container
      // maxWidth="sx"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        maxWidth: '200px'
      }}
    >
      
      <ThemeProvider theme={theme}>
        <h1>Hello {userName} </h1>
        <p>Your E-mail is {userEmail}</p>

        <Button onClick={handleOpen}>Update/Delete user</Button>
      <Dialog
       
        open={open}
        onClose={handleClose}
        
      > 
        <Button
                type="button"
                href="#/register"
                onClick={() => handleClick()}
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 ,
                maxWidth: '100px'}}
              >
                Change name
        </Button>
        <Button
                type="button"
                href="#/register"
                onClick={() => handleClick()}
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 ,
                maxWidth: '100px'}}
              >
                Change email
        </Button>
        <Button
                type="button"
                href="#/register"
                onClick={() => handleClick()}
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 ,
                maxWidth: '100px'}}
              >
                Delete Account
        </Button>


        </Dialog>
        
         
       
      </ThemeProvider>
    </Container>
  );
};
export default UserPanel;
