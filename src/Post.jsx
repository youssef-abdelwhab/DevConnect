import { Box, Avatar, Typography, Stack, Card } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import AddCommentIcon from '@mui/icons-material/AddComment';

export default function Post() {
  return (
    <Card sx={{ backgroundColor: "#e0e0e0", alignItems: "center", p: 2,  mt: 4,  borderRadius: 3, }}  >

      <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
        <Avatar  alt="Youssef AbdelWhab"  src="./src/assets/wallpaperflare.com_wallpaper.jpg" />
        <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } }}>
          Youssef AbdelWhab
        </Typography>
      </Stack>

      <Box component="img"   src="./src/assets/wallpaperflare.com_wallpaper.jpg"  alt="Post image" sx={{
          objectFit: "cover",width: "100%", borderRadius: 2, mb: 1 }}/>

      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}>
        30 minutes ago
      </Typography>

      <Stack >
        <Typography variant="h6"sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.4rem" } }}>عنوان</Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } }} >
          نص تفاصيل
        </Typography>
      </Stack>
      <Stack alignItems={"center"} direction="row" spacing={0.5} mt={1} >
        <AddCommentIcon  sx={{fontSize:"sm" }}/>
        <Typography variant="subtitle1" color="text.secondary">Comment</Typography>
      </Stack>
    </Card>
  );
}
