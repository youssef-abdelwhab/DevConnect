import { Box, Avatar, Typography, Stack, Card } from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useState } from "react";
import CommentItem from "./CommentItem";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';


export default function CommentModel(){
      const img = "../src/assets/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
    
      const [ImgSrc , setImgSrc] = useState( img)
    
    return(
    <Card sx={{ backgroundColor: "#e0e0e0", alignItems: "center",maxWidth:"900px",  borderRadius: 3, mx:"auto" ,p:2 , width:"96%" }}  >
      <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
        <Avatar  alt={""}  src={img} />
        <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } }}>
          youssef Abdel Whab
        </Typography>
      </Stack>

      <Box component="img"   src={img} onError={() => setImgSrc(img)} alt="Post Img" 
      sx={{objectFit: "cover",width: "100%", borderRadius: 2, mb: 0.4 ,height: ImgSrc === img ? "450px" : "100%" , cursor:"pointer"}}  />
      
      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}>
        5 day
      </Typography>

      <Stack >
        <Typography variant="h6"sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.4rem" } }}>Tatail</Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } }} >
          Body
        </Typography>
      </Stack>
      <Stack alignItems={"center"} direction="row" spacing={0.5} mt={1} >
        <AddCommentIcon  sx={{fontSize:"sm" }}/>
        <Typography variant="subtitle1" color="text.secondary"> 0 Comment</Typography>
      </Stack>

      <Card sx={{ height:"500px", overflow:"scroll"}}>
        <CommentItem/>
        <CommentItem/>
        <CommentItem/>
        <CommentItem/>
        <CommentItem/>
        <CommentItem/>
        <CommentItem/>
        <CommentItem/>
      </Card>
       <Stack sx={{flexDirection:"row" , display:"flex" ,alignItems:"center", mt:2,gap:3 ,background:"#e0e0e0" , border:"none" ,boxShadow:"none", paddingBlock:0.5}} >
        <TextField fullWidth label="fullWidth" id="fullWidth" sx={{background:"#e3f2fd"}} />
        <SendIcon sx={{fontSize:"40px" ,color:"#0d47a1"}}></SendIcon>
        
      </Stack>

    </Card>

       
    )
}