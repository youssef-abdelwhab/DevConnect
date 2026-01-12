import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Post from "./Post";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { useEffect, useState, FC } from "react";
import { fetchPosts } from "../redux/slices/postsSlice";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AddPost from "./AddPost";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";

const AllPost: FC = () => {
  const [openAddPost, setopenAddPost] = useState<boolean>(false);
  const Closs = (): void => {
    setopenAddPost(false);
  };
  const dispatch = useAppDispatch();
  const { posts, loading, error, page, hasMore } = useAppSelector(
    (state) => state.posts
  );
  const { token } = useAppSelector((steta) => steta.auth);
  const allPosts = posts || [];

  useEffect(() => {
    if (page == 1) {
      dispatch(fetchPosts(page));
    }
  }, [dispatch, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        if (!loading && hasMore) {
          dispatch(fetchPosts(page));
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, loading, hasMore, page]);

  if (loading && page === 1)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <Container maxWidth="md">
        {allPosts.length > 0 ? (
          allPosts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <Typography sx={{ mt: 4, textAlign: "center" }}>
            No posts available
          </Typography>
        )}
        {loading && page > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
      </Container>
      {token && (
        <Fab
          color="primary"
          component={Button}
          onClick={() => setopenAddPost(true)}
          aria-label="add"
          sx={{ position: "fixed", bottom: 24, right: 24 }}
        >
          <AddIcon />
        </Fab>
      )}
      <Dialog
        sx={{ p: 0 }}
        maxWidth="md"
        scroll="body"
        fullWidth
        open={openAddPost}
        onClose={() => setopenAddPost(false)}
      >
        <AddPost onCloss={Closs} />
      </Dialog>
    </>
  );
};
export default AllPost;
