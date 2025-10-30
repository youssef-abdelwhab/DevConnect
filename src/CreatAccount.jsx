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



export default function CreatAccount(){
const [showPassword, setShowPassword] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState("../src/assets/default-avatar-icon-of-social-media-user-vector.jpg");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
    setSelectedImage(URL.createObjectURL(file));
      console.log("الصورة المختارة:", file.name);

    }
  }

    return(
        <Container  maxWidth="sm" sx={{mt:5 ,textAlign:"center"}} >



        <Card sx={{background:"#e0e0e0" ,display:"flex", flexDirection:"column" , textAlign:"center" , p:2 , borderRadius:"10px"}}  >
                        <Typography variant="h4" p={1.5} mb={1.5}>
                Create a new account
            </Typography>
        {selectedImage && (
            <img
            src={selectedImage}
            alt="Preview"
            style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                margin: "10px auto",
                border: "2px solid #1976d2",
            }}
            />
        )}


            <Stack m={1}>
 

            <Card sx={{ display:"flex",flexDirection:"column" ,background:"#e0e0e0" , gap:"20px"  , pt:1}}   >
                <TextField sx={{ background:"#f5f5f5"}}  id="outlined-basic" label="Name" variant="outlined" />
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
                          <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id="upload-image"
                                type="file"
                                onChange={handleFileChange}
                            />
                    <label htmlFor="upload-image">
                        <Button variant="contained" component="span" color="primary">
                            📸 رفع صورة
                        </Button>
                    </label>

                    
                    <Button variant="contained"  >  Create an Account</Button>
              </Card>
            </Stack>
            </Card>
         

        </Container>
    )
}