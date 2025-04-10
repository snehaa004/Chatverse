import { useContext } from "react";

import { Dialog , Box,Typography,List,ListItem, styled} from "@mui/material";

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import { AccountContext } from "../../context/AccountProvider";
import {addUser} from '../../service/api';  
const Component =styled(Box)`
    display: flex;
`
const Container = styled(Box)`
    padding:56px 0 56px 56px;
`
const Title =styled(Typography)`
    font-size: 24px;
    color:#525252;
    font-weight: 600;
    font-family:inherit;
    margin-bottom: 20px;
`
const StyledList=styled(List)`
    &>li{
        padding:0;
        margin-top:15px
        font-size: 18px;
        line-height: 28px;
        color: #4a4a4a;
    }
`
const dialogStyle={
    width: '60%',
    height: '96%',
    marginTop: '12%',
    maxWidth: '100%',
    boxShadow: 'none',
    overflow: 'hidden',
    color:'black'
}

const LoginDialog = () => {

    const{setAccount}=useContext(AccountContext);

    const onLoginSuccess = async (res) => {
        const decoded=jwtDecode(res.credential);
        setAccount(decoded);
        await addUser(decoded); 
    }

    const onLoginError = (res) => {
        console.log('Login Failed',res);
    }


    return (
        <Dialog 
            open={true} 
            PaperProps={{sx:dialogStyle}}
            hideBackdrop={true}
        >
            <Component style={{ background: 'white' }}>
                <Container>
                    <Title>To use ChatVerse, Login </Title>
                    <StyledList>
                        <ListItem>1.Click on Google Login.</ListItem>
                        <ListItem>2.Select Your Preferred Google Account.</ListItem>
                        <ListItem>3.Allow us to access your account information.</ListItem>
                    </StyledList>
                </Container>
                <Box style={{position:'relative'}}>
                    <Box style={{position: 'absolute', top: '50%', transform: 'translateX(90%) translateY(-25%)',align:'center'}}>
                    <GoogleLogin
                        onSuccess={onLoginSuccess}
                        onError={onLoginError}
                    />
                    </Box>
                </Box>
            </Component>
            
        </Dialog>
    );
}

export default LoginDialog;