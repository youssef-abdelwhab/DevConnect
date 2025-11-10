import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";
import BedtimeIcon from '@mui/icons-material/Bedtime';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';

export default function NavBarGuest ({mode , setMode}){
  return(
    <Box >
      <AppBar position="static">
            <Container>
                <Toolbar>
                    <Typography  component={Link} to="/"  sx={{ fontWeight:900,fontSize:"1.2rem", textDecoration: "none", color: "text.primary" , flexGrow:1}}>
                        Dev Connect
                    </Typography>

                
                  <Box >
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
                        {mode === "light" ? (
                            <BedtimeIcon sx={{ color: "white" ,fontSize:'1rem'}} />
                          ) : (
                            <BrightnessHighIcon sx={{ color: "white" ,fontSize:'1rem'}} />
                        )}
                  </Button>
                  <Button component={Link} sx={{"&:hover":{backgroundColor:"#0400002c"}}} to="CreatAccount" color="text.primary"><PersonAddIcon fontSize='1.2rem'/></Button>
                  <Button component={Link} sx={{"&:hover":{backgroundColor:"#0400002c"}}} to="/login" color="text.primary"><LoginIcon fontSize='1.2rem'/></Button>


                  </Box>


                </Toolbar>
            </Container>
      </AppBar>
    </Box>
  )
}