import { useContext ,useState} from "react";
import { Box ,styled} from "@mui/material";
import {Chat as MessageIcon} from "@mui/icons-material";
import { AccountContext } from "../../../context/AccountProvider";

//comps
import HeaderMenu from "./HeaderMenu";
import InfoDrawer from "../../drawer/InfoDrawer";

const Component = styled(Box)`
    height: 44px;
    background: #657166;
    display: flex;
    padding: 8px 16px;
    align-items: center;
`;

const Wrapper = styled(Box) `
    margin-left: auto;
    & > * {
        margin-left: 2px;
        padding: 8px;
        color: #000;
    };
    & :first-child {
        font-size: 22px;
        margin-right: 8px;
        margin-top: 3px;
    }
`;
    
const Image = styled('img') ({
    height: 40,
    width: 40,
    borderRadius: '50%'
})



const Header =()    => {

    const [openDrawer, setOpenDrawer] = useState(false);

    const {account} = useContext(AccountContext);

    const toggleDrawer = () => {
        setOpenDrawer(true);
    }
    
    return(
        <>
            <Component>
                <Image src={account.picture} alt="dp" onClick={()=>toggleDrawer()}/>
                    <i>ChatVerse</i>
                <Wrapper>
                    <MessageIcon />
                    <HeaderMenu setOpenDrawer={setOpenDrawer} />
                </Wrapper>
            </Component>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
        </>
    )
}


export default Header;