
import { Box, Avatar, Typography, Stack, Card } from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
export default function Post({post}) {


  const img = "../src/assets/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"

  const [ImgSrc , setImgSrc] = useState(post.image || img)

  const [open , setOpen] = useState(false)

  return (
    <Card sx={{ backgroundColor: "#e0e0e0", alignItems: "center", p: 2,  mt: 4,  borderRadius: 3, }}  >
      <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
        <Avatar  alt={post.author.username}  src={post.author.profile_image} />
        <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } }}>
          {post.author.username}
        </Typography>
      </Stack>

      <Box component="img"   src={ImgSrc} onError={() => setImgSrc(img)} alt="Post Img" 
      sx={{objectFit: "cover",width: "100%", borderRadius: 2, mb: 0.4 ,height: ImgSrc === img ? "450px" : "100%" , cursor:"pointer"}} onClick={()=>{setOpen(true)}} />
      
      <Dialog open={open}  onClose={() => setOpen(false)} maxWidth="lg" sx={{ background:"rgba(242, 234, 234, 0.66)"}}>
          <Box
            component="img"
            src={ImgSrc}
            alt="Full Image"
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
      </Dialog>


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
