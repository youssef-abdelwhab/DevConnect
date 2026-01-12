import Container from "@mui/material/Container";
import { Card, Typography, Avatar, Stack } from "@mui/material";
import Post from "./Post";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { FetchPortfilo, FetchPortfiloPost } from "../redux/slices/Portfilo";
import { useEffect, FC } from "react";
import { useParams } from "react-router-dom";

const Porfolio: FC = () => {
  const dispatch = useAppDispatch();

  const { user, posts } = useAppSelector((state) => state.Portfilo);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(FetchPortfilo({ id: Number(id) }));
      dispatch(FetchPortfiloPost({ id: Number(id) }));
    }
  }, [dispatch, id]);

  return (
    <>
      <Container sx={{ mt: 3 }} maxWidth="md">
        <Card
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{ flexDirection: "row", alignItems: "center", gap: 3, mb: 2 }}
          >
            {/* <Box component={"img"} sx={{width:"100px" , height:"100px"}} borderRadius={"50%"} src={user.profile_image || "../src/assets/profaileimg.jpg"}></Box> */}
            <Avatar
              alt={user?.name}
              src={user?.profile_image}
              sx={{ width: 100, height: 100 }}
            />
            <Stack sx={{ gap: 1 }}>
              <Typography>{user?.name}</Typography>
              <Typography>{user?.username}</Typography>
            </Stack>
          </Stack>
          <Stack sx={{ gap: 1, mr: 4 }}>
            <Typography>Posts : {user?.posts_count}</Typography>
            <Typography>Comments : {user?.comments_count}</Typography>
          </Stack>
        </Card>
        <Stack>
          {posts.length > 0 ? (
            posts.map((post) => <Post key={post.id} post={post} />)
          ) : (
            <Typography sx={{ mt: 4, textAlign: "center" }}>
              No posts available
            </Typography>
          )}
        </Stack>
      </Container>
    </>
  );
};
export default Porfolio;
