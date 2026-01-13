import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/material";

import { useAppDispatch, useAppSelector } from ".././redux/store";
import { registerUser } from "../redux/slices/authSlice";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatAccount() {
  const navigate = useNavigate();
  const { token, loading } = useAppSelector((state) => state.auth);

  // ----------------{show passwrd}----------------
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: any) => {
    event.preventDefault();
  };

  // --------------{imge profail UI}------------
  const [selectedImage, setSelectedImage] = useState(
    "../src/assets/default-avatar-icon-of-social-media-user-vector.jpg"
  );

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setformData((prev) => ({ ...prev, img: file }));
    }
  };
  // ---------------{Form Data Sudmnt }---------
  const dispath = useAppDispatch();
  const [check, setcheck] = useState(false);

  const [formData, setformData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    img: null,
  });

  const handleSubmit = () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("email", formData.email);
    data.append("image", formData.img!);
    dispath(registerUser({ formdata: data, rememberMe: check }));
  };
  useEffect(() => {
    setTimeout(() => {
      if (token) navigate("/");
    }, 500);
  }, [token, navigate]);

  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          p: 2,
          borderRadius: "10px",
        }}
      >
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
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              pt: 1,
            }}
          >
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              onChange={(event) => {
                setformData((prev) => ({ ...prev, name: event.target.value }));
              }}
            />
            <TextField
              id="outlined-basic"
              label="User Name"
              variant="outlined"
              onChange={(event) => {
                setformData((prev) => ({
                  ...prev,
                  username: event.target.value,
                }));
              }}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(event) => {
                setformData((prev) => ({ ...prev, email: event.target.value }));
              }}
            />

            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                onChange={(event) => {
                  setformData((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }));
                }}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="upload-image"
              type="file"
              onChange={handleFileChange}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <label htmlFor="upload-image">
                <Button variant="contained" component="span" color="primary">
                  📸 رفع صورة
                </Button>
              </label>
              <label htmlFor="">
                تتذكرني
                <Checkbox
                  onChange={(event) => {
                    setcheck(event.target.checked);
                  }}
                />
              </label>
            </Box>
            <Button
              variant="contained"
              disabled={loading}
              onClick={handleSubmit}
              endIcon={loading && <SaveIcon />}
            >
              {loading ? "Logging in..." : "LOG IN"}
            </Button>
          </Card>
        </Stack>
      </Card>
    </Container>
  );
}
