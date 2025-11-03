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


export default function NavBarLogge({mode , setMode}){
      const {user} = useSelector((state)=> state.auth)
      const dispatch = useDispatch()

      const handelLogUot = ()=>{
            dispatch(logOutUser()) 
      } 

       
      return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
            <Container>
                <Toolbar>
                <Box sx={{display:"flex" , flexDirection:"row" , gap:1, flexGrow:1 ,alignItems:"center"}}>
                  <Avatar alt={user.profile_image}  src={user.profile_image}/>
                  <Typography variant="subtitle1" component="div" >
                      <Link to="/">
                            {user.name}
                      </Link>
                  </Typography>
                </Box>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/">
                          DevConnect
                    </Link>
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
                     
                        <Button color="inherit" onClick={handelLogUot}><LogoutIcon/></Button>

                </Toolbar>
            </Container>
      </AppBar>
    </Box>
      )
}