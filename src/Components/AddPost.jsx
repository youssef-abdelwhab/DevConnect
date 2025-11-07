import { Card } from "@mui/material"
import {TextField } from "@mui/material"
import {Box} from "@mui/material"
import {Button} from "@mui/material"
import { useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function AddPost({Closs}){
    const [imgePost , setimgePost] = useState(null)
    const handelImgePost = (event)=>{
        const file = event.target.files[0];
        setimgePost(URL.createObjectURL(file))

    }

    return (
        <Card  sx={{ display:"flex", flexDirection:"column", alignItems:"center" , gap:2,maxWidth:"900px",   mx:"auto" ,p:2 , width:"100%", m:0 }} >
        <Box onClick={Closs}  sx={{display:"flex", alignSelf: "flex-end" }}>
            <CloseIcon  onClick={Closs} sx={{fontSize:"2rem" , cursor:"pointer" }}  ></CloseIcon>
        </Box>
        {imgePost && (
            <Box sx={{ position: "relative", width: "100%" }}>
                <Box
                component="img"
                src={imgePost}
                alt="post preview"
                sx={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: 1,
                }}
            />
        <label htmlFor="upload-image">
            <Button
            variant="contained"
            color="secondary"
            size="small"
            component="span"
            sx={{
                position: "absolute",
                top: 10,
                right: 80,
                textTransform: "none",
                color:"text.primary",
                borderRadius: 10,
                backgroundColor: "rgba(0,0,0,0.6)",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
            }}
                >
                تغيير الصورة
                </Button>
            </label>
        <label>
            <Button size="small"variant="contained" onClick={()=>{setimgePost(null)}} sx={{ position:"absolute", color:"text.primary",top:10, right:10,zIndex:10 ,borderRadius: 10, backgroundColor: "rgba(0,0,0,0.6)", "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" }}}>
                <DeleteForeverIcon  />
            </Button>
        </label>
        </Box>
         )}
            {!imgePost && 
            <label htmlFor="upload-image">
                <Button variant="contained" component="span" color="primary" sx={{borderRadius:"50%" , height:"100px" ,mb:3 , width:"100px"}}>
                    <AddAPhotoIcon sx={{fontSize:"2.5rem" }} />
                </Button>
            </label>
            }

            <TextField
              autoFocus
                label="اكتب منشورك هنا..."
                variant="outlined"
                multiline
                fullWidth
                minRows={3}   
                maxRows={10}  
            />
            <input id="upload-image" type="file" style={{ display: "none" }}  onChange={handelImgePost}>
            </input>


            <Button variant="contained" fullWidth>
                 Post
            </Button>


        </Card>
    )
}