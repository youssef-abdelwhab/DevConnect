import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Post from './Post';
export default function AllPost(){
    return(
        <Container maxWidth="md"  >
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </Container>
    )

}