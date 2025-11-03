import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Post from "./Post";
import { useSelector , useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {fetchPosts} from "../redux/slices/postsSlice"
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';



export default function AllPost(){

    const dispatch =useDispatch()
    const { posts, loading, error , page , hasMore } = useSelector((state) => state.posts);
    const allPosts = posts || [];

   useEffect(() => {
    if(page == 1){
       dispatch(fetchPosts(page));
    }

  }, [dispatch, page]);

  useEffect(()=>{
    const handleScroll = ()=>{
      if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 200){
        if (!loading && hasMore) {
          dispatch(fetchPosts(page));
        }
      }
    }
    window.addEventListener("scroll", handleScroll);
    return ()=>{
      window.removeEventListener("scroll", handleScroll);
    }
  },[dispatch , loading ,hasMore ,page])

  if (loading && page === 1)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
  if (error) return <Typography color="error">{error}</Typography>;


    return (
    <Container maxWidth="md">
      {allPosts.length > 0 ? (
        allPosts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <Typography sx={{ mt: 4, textAlign: "center" }}>No posts available</Typography>
      )}
      {loading && page > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );

}