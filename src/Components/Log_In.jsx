import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import SaveIcon from '@mui/icons-material/Save';
// hocks react
import { useState , useEffect } from 'react';
// rudxe 
import { useDispatch , useSelector} from 'react-redux';
import {loginUser} from "../../src/redux/slices/authSlice"

// llink
import { useNavigate } from "react-router-dom";
import  {Link}  from 'react-router-dom';



export default function Log_In(){
    const navigate = useNavigate()
    const {loading  ,token} = useSelector( state => state.auth)
    const dispatch = useDispatch()
    const [ check , setcheck] = useState(false)


// -----------------{buttm Sudmit fromdata}----------
    const [formdata ,setformdata] = useState({
        username: "",
        password:""
    })
    const handleSubmit = ()=>{
        const data = new FormData();
        data.append("username" , formdata.username)
        data.append("password" , formdata.password)
        dispatch(loginUser({formdata : data , rememberMe : check}))
    }

 // ----------------{show passwrd}----------------
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };


    useEffect(()=>{
        setTimeout(() => {
            if(token) navigate("/");
        }, 500);

    }, [token  , navigate])


    return(
        <Container  maxWidth="sm" sx={{mt:10}}>

        <Card sx={{ display:"flex", flexDirection:"column" , textAlign:"center" , p:2 , borderRadius:"10px"}}  >

            <Typography variant="h4" p={1.5} mb={1.5}>
                Log In
            </Typography>
            <Stack m={1}>
 

            <Card sx={{ display:"flex",flexDirection:"column" , gap:"20px"  , pt:1}}   >
                <TextField   id="outlined-basic" label="User Name" variant="outlined" onChange={(event)=>{
                    setformdata(priv =>({...priv , username : event.target.value}))
                }

                } />

                <FormControl variant="outlined">

                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={(event)=>{
                            setformdata(prev => ({...prev , password: event.target.value}))
                        }}
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
                    <label >
                        تتذكرني
                        <Checkbox  onChange={(event)=>{
                            setcheck(event.target.checked)
                        }} />

                    </label>
                    <Button
                            variant="contained"
                            disabled={loading}
                            onClick={handleSubmit}
                            endIcon={loading && <SaveIcon />}
                            >
                            {loading ? "Logging in..." : "LOG IN"}
                    </Button>



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