import { useState } from "react";
import { Box } from "@mui/material";
//comps
import Header from "./Header";
import Search from "./Search";
import Conversations from "./Conversations";



const Menu = () => {
    const [text,setText]=useState('');

    return(
        <Box>
            <Header />
            <Search setText={setText}/>
            <Conversations text={text} />
        </Box>
    )
}


export default Menu;