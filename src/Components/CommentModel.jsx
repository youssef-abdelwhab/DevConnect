import { Box, Avatar, Typography, Stack, Card, Button } from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useEffect , useState  } from "react";
import CommentItem from "./CommentItem";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch , useSelector } from "react-redux";
import {fetchComments} from "../redux/slices/CommentSlice";
import {AddComments} from "../redux/slices/CommentSlice"
import {fetchPostById} from "../redux/slices/postsSlice"
import CircularProgress from '@mui/material/CircularProgress';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';


export default function CommentModel({Class , post}){
      const dispath = useDispatch();
      const {Comments , loading ,error} = useSelector((state) => state.Comments);
      const {token} = useSelector((state)=> state.auth)

      useEffect (()=>{
        if(post.id){
          dispath(fetchComments(post.id))
        }
      },[dispath, post.id ])

      //---------------------{add comments}-------------------
      const [comment , setcomment] = useState(null)
      const handelAddComments = async ()=>{
       const result = await dispath(AddComments({
        comment:{body: comment},
        IDPOST:post.id,
        token
      }))
      if (result.meta.requestStatus === "fulfilled") {
        setcomment(""); 
        dispath(fetchPostById(post.id))
      }
      }



    return(
    <Card sx={{ alignItems: "center",maxWidth:"900px",   mx:"auto" ,p:2 , width:"100%" , m:0 }}  >
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

      <Box component="img"   src={post.image} alt="Post Img" 
      sx={{objectFit: "cover",width: "100%", borderRadius: 2, mb: 0.4 , cursor:"pointer"}}  />
      
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

      <Card sx={{ maxHeight:"500px", minHeight:"fit-content",overflow:"scroll"}}>
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
      {token && 
      <Stack sx={{flexDirection:"row" , display:"flex" ,alignItems:"center", mt:2,gap:3 , border:"none" ,boxShadow:"none", paddingBlock:0.5}} >
          <TextField onChange={(event)=>{
            setcomment(event.target.value)
          }}
           fullWidth value={comment} label="اضف تعليقك هنا" id="fullWidth"/>
           {loading ?<HourglassBottomIcon display={loading}/> : <SendIcon onClick={handelAddComments} sx={{fontSize:"40px" ,color:"#0d47a1" , cursor:"pointer"}}/> }

      </Stack>
      }


    </Card>

       
    )
}