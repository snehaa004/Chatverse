import { useContext } from 'react';
import {AppBar,Toolbar ,styled,Box} from '@mui/material';
import { AccountContext } from '../context/AccountProvider';

import LoginDialog from './account/LoginDialog';
import ChatDialog from './chat/ChatDialog';

const Header = styled(AppBar)`
    height: 125px;
    background-color: #657166;
    box-shadow: none;
`
const LoginHeader = styled(AppBar)`
    height: 220px;
    background-color: #657166;
    box-shadow: none;
`
const Component = styled(Box)`
    height:100vh;
    background-color: #cfd6c4;
`
const Messenger = () => {

    const {account}=useContext(AccountContext);

    return(
        <Component>
            {
                account ? 
                <>
                <Header>
                    <Toolbar>

                    </Toolbar>
                </Header>
                
                <ChatDialog />
                </>
                
                :
            <>
                <LoginHeader>
                    <Toolbar>

                    </Toolbar>
                </LoginHeader>
                <LoginDialog styled={{background:'#daebe3'}}/>
            </>
    }
        </Component>
    )
}

export default Messenger;