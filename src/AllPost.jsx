import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Post from './Post';
import { useSelector , useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {fetchPosts} from "./redux/slices/postsSlice"
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';



export default function AllPost(){

    const dispatch =useDispatch()
    const { posts, loading, error } = useSelector((state) => state.posts);
    const allPosts = posts || [];

   useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
  if (error) return <Typography color="error">{error}</Typography>;
    console.log( AllPost)
    return(
        <Container maxWidth="md"  >
      {allPosts.length > 0 ? (
        allPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))
      ) : (
        <Typography sx={{ mt: 4, textAlign: "center" }}>No posts available</Typography>
      )}
        </Container>
    )

}