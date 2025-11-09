import { Card } from "@mui/material"
import {TextField } from "@mui/material"
import {Box} from "@mui/material"
import {Button} from "@mui/material"
import { useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch ,useSelector } from "react-redux"
import {AddPostPust} from "../redux/slices/postsSlice"
import SaveIcon from '@mui/icons-material/Save';
import {EditPost} from "../redux/slices/postsSlice"

export default function AddPost({Closs , post}){
    const {token} =useSelector((state)=> state.auth)
    const {loading} = useSelector((state) => state.posts )
    const dispatch = useDispatch()
    const isEditMode = Boolean(post);

    const [data , setdata] = useState({
        title : post?.title ||  "",
        body:post?.body ||  "",
        image:post?.image ||  "",
    }) 

    const [imgePost , setimgePost] = useState(post?.image || "")

    const handelImgePost = (event)=>{
        const file = event.target.files[0];
        setimgePost(URL.createObjectURL(file))
        setdata( prev => ({...prev , image : file}))
    }
    
    const handelSudmit = async ()=>{
         let response;
         if(isEditMode){
            response = await dispatch(EditPost({
                IDPOST : post.id,
                formData:{
                    title : data.title ,
                    body : data.body
                },
                token
            }))
         }else{
            const formData = new FormData();
                formData.append("title" , data.title)
                formData.append("body" , data.body)
                if(data.image) formData.append("image" , data.image)

            response = await dispatch(AddPostPust({
                formData,
                token

            }))
         }

        if (response.meta.requestStatus === "fulfilled") {
            Closs();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
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
                
                src={imgePost || data.image}
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
                color:"rgba(255, 255, 255, 1)",
                borderRadius: 10,
                backgroundColor: "rgba(0,0,0,1)",
                "&:hover": { backgroundColor: "rgba(0,0,0,1)" },
            }}
                >
                تغيير الصورة
                </Button>
            </label>
        <label>
            <Button size="small"variant="contained" onClick={()=>{setimgePost(null); setdata(prev => ({...prev, image: null}))}} sx={{ position:"absolute", color:"rgba(255, 255, 255, 1)",top:10, right:10,zIndex:10 ,borderRadius: 10, backgroundColor: "rgba(0,0,0,1)", "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" }}}>
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
            <TextField fullWidth value={data.title} label="عنوان البوست" onChange={(event)=>{
                setdata(prve => ({...prve , title : event.target.value }))
            }} id="fullWidth" />
            <TextField
                onChange={(event)=>{setdata(prve => ({...prve , body : event.target.value}))}}
              autoFocus
                label="اكتب منشورك هنا..."
                variant="outlined"
                multiline
                value={data.body}
                fullWidth
                minRows={3}   
                maxRows={10}  
            />
            <input id="upload-image" type="file" style={{ display: "none" }}  onChange={handelImgePost}>
            </input>

            <Button
                variant="contained"
                fullWidth
                onClick={handelSudmit}  
                disabled={!data.title.trim() || !data.body.trim() || loading} 
                endIcon={loading && <SaveIcon />}
            >
                {loading 
                    ? (isEditMode ? "Saving..." : "Posting...") 
                    : (isEditMode ? "Save Changes" : "Post")
                }    
            </Button>
        </Card>
    )
}