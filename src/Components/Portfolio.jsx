import Container from '@mui/material/Container';
import { Card , Box ,Typography , Stack } from '@mui/material';
import Post from './Post';
import { useDispatch ,useSelector } from 'react-redux';
import {FetchPortfilo, FetchPortfiloPost} from "../redux/slices/Portfilo"
import { useEffect } from 'react';
import { useParams } from "react-router-dom";

export default function Porfolio(){
    const dispatch = useDispatch()

    const {user , posts} = useSelector((state)=>state.Portfilo)

    const { id } = useParams(); 

    useEffect(() => {
        if (id) {
        dispatch(FetchPortfilo({ IDUseer: id }));
        dispatch(FetchPortfiloPost({ IDUseer: id }));
        }
    }, [dispatch, id]);

    return(
        <>
          <Container sx={{mt:3 }} maxWidth="md" >
            <Card sx={{p:2 ,display:"flex" ,flexDirection:"row" , justifyContent:"space-between" , alignItems:"center"}}>
                <Stack sx={{flexDirection:"row" , alignItems:"center" , gap:2}}>
                    <Box component={"img"} sx={{width:"100px" , height:"100px"}} borderRadius={"50%"} src={user.profile_image || "../src/assets/profaileimg.jpg"}></Box>
                    <Stack sx={{gap:2}}>
                        <Typography>{user.name}</Typography>
                        <Typography>{user.username}</Typography>
                    </Stack>
                </Stack>
                <Stack  sx={{gap:2 , mr:6}}>
                    <Typography>Posts : {user.posts_count}</Typography>
                    <Typography>Comments : {user.comments_count}</Typography>
                </Stack>
            </Card>
            <Stack >
                {posts.length > 0 ? (
                    posts.map((post) => <Post key={post.id} post={post} />)
                    ) : (
                    <Typography sx={{ mt: 4, textAlign: "center" }}>No posts available</Typography>
                )} 
            </Stack>
          </Container>
        </>
    )
}