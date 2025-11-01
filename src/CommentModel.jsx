import { Box, Avatar, Typography, Stack, Card } from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useState , useEffect } from "react";
import CommentItem from "./CommentItem";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch , useSelector } from "react-redux";
import {fetchComments} from "./redux/slices/CommentSlice";
import CircularProgress from '@mui/material/CircularProgress';


export default function CommentModel({Class , post}){
    
      const dispath = useDispatch();
      const {Comments , loading ,error} = useSelector((state) => state.Comments);

      useEffect (()=>{
        dispath(fetchComments(post.id))
      },[dispath, post.id])

      const img = "../src/assets/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";
      const [ImgSrc , setImgSrc] = useState(post.image || img);

    return(
    <Card sx={{ backgroundColor: "#e0e0e0", alignItems: "center",maxWidth:"900px",  borderRadius: 3, mx:"auto" ,p:2 , width:"94%" }}  >
      <Stack sx={{display:"flex" ,justifyContent:"space-between" ,flexDirection:"row" , alignContent:"center"}}> 
        <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
          <Avatar alt={post.author.username}  src={post.author.profile_image}/>
          <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } }}>
            {post.author.username}
          </Typography>
        </Stack>
        <Box onClick={()=>Class(false)}>
            <CloseIcon sx={{fontSize:"35px" , cursor:"pointer" }}  ></CloseIcon>
        </Box>

      </Stack>

      <Box component="img"   src={ImgSrc} onError={() => setImgSrc(img)} alt="Post Img" 
      sx={{objectFit: "cover",width: "100%", borderRadius: 2, mb: 0.4 ,height: ImgSrc === img ? "450px" : "100%" , cursor:"pointer"}}  />
      
      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}>
        {post.created_at}
      </Typography>

      <Stack >
        <Typography variant="h6"sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.4rem" } }}>{post.title}</Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } }} >
          {post.body}
        </Typography>
      </Stack>
      <Stack alignItems={"center"} direction="row" spacing={0.5} mt={1} >
        <AddCommentIcon  sx={{fontSize:"sm" }}/>
        <Typography variant="subtitle1" color="text.secondary"> {post.comments_count} Comment</Typography>
      </Stack>

      <Card sx={{ maxheight:"500px", minHeight:"fit-content",overflow:"scroll"}}>
        {loading &&(
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <CircularProgress />
          </Box>
        )}
        {!loading && error && (
            <Typography color="error" textAlign="center">
              حدث خطأ أثناء تحميل التعليقات 😢
            </Typography>
        )}
        {!loading && !error &&  Comments.length === 0 && (
            <Typography textAlign="center">
              لا توجد تعلقات الان 
            </Typography>
        )}
        {!loading && !error && Comments.length > 0 && (
             Comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </Card>
       <Stack sx={{flexDirection:"row" , display:"flex" ,alignItems:"center", mt:2,gap:3 ,background:"#e0e0e0" , border:"none" ,boxShadow:"none", paddingBlock:0.5}} >
        <TextField fullWidth label="fullWidth" id="fullWidth" sx={{background:"#e3f2fd"}} />
        <SendIcon sx={{fontSize:"40px" ,color:"#0d47a1" , cursor:"pointer"}}></SendIcon>
        
      </Stack>

    </Card>

       
    )
}