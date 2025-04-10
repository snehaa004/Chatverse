import welcometochatverse from '../../../../src/welcometochatverse.png';

import { Box, Typography ,styled,Divider} from '@mui/material';



const Component = styled(Box)`
    background: #f8f9fa;
    padding: 30px 0;
    text-align: center;
    height: 100%;
`;

const Container = styled(Box)`
    padding: 0 200px;
`;
    
const Image = styled('img')({
    marginBottom: 35,
    marginTop: 200,
    width: 400
})
   
const SubTitle = styled(Typography)`
    font-size: 17px;
    color: #667781;
    font-weight: 400;
    font-family: inherit;
`;

const StyledDivider = styled(Divider)`
    margin: 40px 0;
    opacity: 0.4;
`;


const EmptyChat = () => {
    return(
        <Component>
            <Container>
                <Image src={welcometochatverse} alt='image' />
                <SubTitle>Use your preffered language</SubTitle>
                <SubTitle>Converse your way</SubTitle>
                <SubTitle>Send messages, photos and more</SubTitle>
                <StyledDivider />
            </Container>
        </Component>
    )
}

export default EmptyChat;