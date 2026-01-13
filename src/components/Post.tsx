import { Box, Avatar, Typography, Stack, Card } from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Dialog from "@mui/material/Dialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CommentModel from "./comments/CommentModel";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { DeletPost } from "../redux/slices/postsSlice";
import { useState, FC } from "react";
import AddPost from "./AddPost";
import { Link } from "react-router-dom";
import { Post } from "../types/posts";

interface PostType {
  post: Post;
}

const Post: FC<PostType> = ({ post }) => {
  const [open, setOpen] = useState(false);
  const [openComment, setOpenComment] = useState(false);

  const Closs = function handelClossModel(X: boolean) {
    setOpenComment(X);
  };

  const dispatch = useAppDispatch();

  //--------------------{delete icon}-------
  const [OpenDelete, setOpenDelete] = useState(false);
  const handelModelDelete = () => {
    setOpenDelete(true);
  };

  const { user, token } = useAppSelector((state) => state.auth);

  const IDPOST = post.id;
  const handelDeletePost = () => {
    if (!token) return;
    dispatch(DeletPost({ IDPOST, token }));
    setOpenDelete(false);
  };
  // --------------{edite Post}--------------
  const [openEditPost, setEditPost] = useState<boolean>(false);
  const handelModelEdit = () => {
    setEditPost(true);
  };
  return (
    <>
      <Card sx={{ alignItems: "center", p: 1.5, mt: 4, borderRadius: 2 }}>
        <Stack direction="row" alignItems="center">
          <Stack
            component={Link}
            to={`/Portfolio/${post.author.id}`}
            direction="row"
            alignItems="center"
            spacing={1}
            mb={1.5}
            sx={{ flexGrow: 1, textDecoration: "none", color: "text.primary" }}
          >
            <Avatar
              alt={post.author.username}
              src={post.author.profile_image}
            />
            <Typography
              variant="subtitle2"
              fontWeight={600}
              sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } }}
            >
              {post.author.username}
            </Typography>
          </Stack>
          {user && post.author.id == user.id && (
            <Stack direction="row" alignItems="center" spacing={2}>
              <EditIcon
                sx={{ "&:hover": { color: "blue" }, cursor: "pointer" }}
                onClick={handelModelEdit}
              />
              <DeleteIcon
                sx={{ "&:hover": { color: "red" }, cursor: "pointer" }}
                onClick={handelModelDelete}
              />
            </Stack>
          )}
        </Stack>

        {typeof post.image === "string" && post.image.trim() !== "" && (
          <>
            <Box
              component="img"
              src={post.image}
              sx={{
                objectFit: "cover",
                width: "100%",
                borderRadius: 2,
                mb: 0.4,
                cursor: "pointer",
              }}
              onClick={() => {
                setOpen(true);
              }}
            />
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
              <Box
                component="img"
                src={post.image}
                sx={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </Dialog>
          </>
        )}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}
        >
          {post.created_at}
        </Typography>

        <Stack>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.4rem" } }}
          >
            {post.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } }}
          >
            {post.body}
          </Typography>
        </Stack>
        <Stack
          alignItems={"center"}
          direction="row"
          spacing={0.5}
          mt={1}
          onClick={() => {
            setOpenComment(true);
          }}
          sx={{ cursor: "pointer" }}
        >
          <AddCommentIcon sx={{ fontSize: "sm" }} />
          <Typography variant="subtitle1" color="text.secondary">
            {post.comments_count} Comment
          </Typography>
        </Stack>
      </Card>
      <Dialog
        sx={{ p: 0 }}
        open={openComment}
        onClose={() => setOpenComment(false)}
        maxWidth="md"
        scroll="body"
        fullWidth
      >
        <Box sx={{ width: "100%" }}>
          <CommentModel post={post} onClass={Closs}></CommentModel>
        </Box>
      </Dialog>
      <Dialog
        open={OpenDelete}
        onClose={() => setOpenDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete the post"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you deleted the post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Disagree</Button>
          <Button sx={{ color: "red" }} onClick={handelDeletePost} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        sx={{ p: 0 }}
        maxWidth="md"
        scroll="body"
        fullWidth
        open={openEditPost}
        onClose={() => setEditPost(false)}
      >
        <AddPost
          onCloss={() => {
            setEditPost(false);
          }}
          post={post}
        ></AddPost>
      </Dialog>
    </>
  );
};
export default Post;
