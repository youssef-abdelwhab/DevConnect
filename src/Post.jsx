
import { Box, Avatar, Typography, Stack, Card } from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';

export default function Post({post}) {
  return (
    <Card sx={{ backgroundColor: "#e0e0e0", alignItems: "center", p: 2,  mt: 4,  borderRadius: 3, }}  >
      <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
        <Avatar  alt={post.author.username}  src={post.author.profile_image} />
        <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } }}>
          {post.author.username}
        </Typography>
      </Stack>

      <Box component="img"   src={post.image}  alt="Post image" sx={{
          objectFit: "cover",width: "100%", borderRadius: 2, mb: 0.4 }}/>

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
        <Typography variant="subtitle1" color="text.secondary">{post.comments_count} Comment</Typography>
      </Stack>
    </Card>
  );
}
