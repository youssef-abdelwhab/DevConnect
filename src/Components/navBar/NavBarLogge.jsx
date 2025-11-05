import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Container from '@mui/material/Container';
import { Link } from "react-router-dom";
import { Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector , useDispatch } from 'react-redux';
import { logOutUser } from "../../redux/slices/authSlice";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState  , useEffect} from 'react';
import {showSnackBar} from "../../redux/slices/UiSlice"


export default function NavBarLogge({mode , setMode}){
      const {user} = useSelector((state)=> state.auth)
      const dispatch = useDispatch()

      const handelLogUot = ()=>{
            dispatch(logOutUser()) 
      } 


      //------------------{Dialog alert log out}---------------------
        const [open, setOpen] = useState(false);

        const handleClose = () => {
          setOpen(false);
        };

      //------------------------{Snack Bar}------------------------
      useEffect(()=>{
        if(!user){
          dispatch(showSnackBar({
          message:"Successfully logged out",
          severity:"success",
      }))

        }

      },[user ,dispatch])

            
      return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
            <Container>
                <Toolbar>
                <Box sx={{display:"flex" , flexDirection:"row" , gap:1, flexGrow:1 ,alignItems:"center"}}>
                  <Avatar alt={user.profile_image}  src={user.profile_image}/>
                    <Typography  component={Link} to="/"  sx={{ fontSize:"1.2rem" , fontWeight:"400", textDecoration: "none", color: "text.primary" ,flexGrow:1}}>

                        {user.name}

                    </Typography>
                </Box>
                    <Typography  component={Link} to="/"  sx={{ fontWeight:900,fontSize:25, textDecoration: "none", color: "text.primary",flexGrow:1}}>

                        Dev Connect

                    </Typography>

                <Button 
                      onClick={() => setMode(prev => prev === "light" ? "dark" : "light")} 
                        sx={{
                          cursor: "pointer",
                          transition: "background-color 0.3s",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                          },
                        }}
                    >
                      {mode ? "☀️" : "🌙"}
                </Button>
                        <Button color="text.primary" onClick={()=>{setOpen(true)}}>< LogoutIcon/></Button>
                </Toolbar>
            </Container>
      </AppBar>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Logout alert"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Did you confirm that I log out?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button  onClick={handleClose}>Disagree</Button>
                <Button sx={{color:"red"}} onClick={handelLogUot} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
    </Box>
      )
}