import { Avatar, Card, Stack, Typography } from "@mui/material"


export default function CommentItem ( {comment} ) {

    return (

        <Card  sx={{borderRadius:"20px" , p:2 , mb:1 , mt:1, backgroundColor:(theme) => theme.palette.background.default }}>
            <Stack sx={{display:"flex" , justifyContent:"space-between" ,flexDirection:"row" , alignItems:"center"}}>
                <Stack  sx={{display:"flex" , flexDirection:"row" , alignItems:"center" , gap:"5px" }}>
                    <Avatar alt={""}  src={comment.author.profile_image} />
                    <Typography>{comment.author.name}</Typography>
                </Stack>
                {/* <Typography>{formattedDate}</Typography> */}
            </Stack>
            <Typography p={1}>{comment.body}</Typography>
        </Card>
  
    )

}