import { Avatar, Card, Stack, Typography } from "@mui/material"


export default function CommentItem () {
    return (
    <Card sx={{background:"#e0e0e0"}}>
        <Stack  sx={{borderRadius:"20px" , p:2 , mt:2  , background:"#f3e5f5"}}>
            <Stack sx={{display:"flex" , justifyContent:"space-between" ,flexDirection:"row" , alignItems:"center"}}>
                <Stack  sx={{display:"flex" , flexDirection:"row" , alignItems:"center" , gap:"5px" }}>
                    <Avatar alt={""}  src={""} />
                    <Typography>User Name</Typography>
                </Stack>
                <Typography>Time</Typography>
            </Stack>
            <Typography p={1}>coment</Typography>
        </Stack>
    </Card>     
    )

}