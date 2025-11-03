import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";





export default function NavBarGuest ({mode , setMode}){




    return(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
            <Container>
                <Toolbar>
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

                  <Link to="CreatAccount">
                        <Button color="inherit"><PersonAddIcon/></Button>
                  </Link>

                  <Link to="/login">
                      <Button color="inherit"><LoginIcon/></Button>
                  </Link>

                </Toolbar>
            </Container>
      </AppBar>
    </Box>
    )
}