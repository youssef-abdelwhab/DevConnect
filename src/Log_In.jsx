import Card from '@mui/material/Card';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Container from '@mui/material/Container';
import  {Link}  from 'react-router-dom';


export default function Log_In(){
const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };







    return(
        <Container  maxWidth="sm" sx={{mt:10}}>

        <Card sx={{background:"#e0e0e0" ,display:"flex", flexDirection:"column" , textAlign:"center" , p:2 , borderRadius:"10px"}}  >

            <Typography variant="h4" p={1.5} mb={1.5}>
                Log In
            </Typography>
            <Stack m={1}>
 

            <Card sx={{ display:"flex",flexDirection:"column" ,background:"#e0e0e0" , gap:"20px"  , pt:1}}   >
                <TextField sx={{ background:"#f5f5f5"}}  id="outlined-basic" label="User Name" variant="outlined" />

                <FormControl sx={{ background:"#f5f5f5"}} variant="outlined">

                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                            } label="Password"/>
                    </FormControl>
                    <Button variant="contained"  > LOG IN </Button>


              </Card>

                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" }, mt:2}}>
                    <Link to="/CreatAccount">
                        Create a new account ...
                    </Link>
                </Typography>

            </Stack>
            </Card>
         

        </Container>
    )
}