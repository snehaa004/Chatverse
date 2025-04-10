import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { Menu, MenuItem, styled } from "@mui/material";
import LanguageDrawer from "../../drawer/LanguageDrawer"; // Import new LanguageDrawer

const MenuOption = styled(MenuItem)`
    font-size: 15px;
    padding: 12px 24px;
    color: #333;
    &:hover {
        background-color: #f1f1f1;
    }
`;

const HeaderMenu = ({ setOpenDrawer }) => {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [openLangDrawer, setOpenLangDrawer] = useState(false); // Language Drawer State

    const handleMenuOpen = (e) => setMenuAnchor(e.currentTarget);
    const handleMenuClose = () => setMenuAnchor(null);

    return (
        <>
            <MoreVert onClick={handleMenuOpen} style={{ cursor: "pointer" }} />
            
            <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                {/* Profile Option - Opens Profile Drawer */}
                <MenuOption onClick={() => { handleMenuClose(); setOpenDrawer(true); }}>
                    Profile
                </MenuOption>

                {/* Language Option - Opens Language Drawer */}
                <MenuOption onClick={() => { handleMenuClose(); setOpenLangDrawer(true); }}>
                    Select Language
                </MenuOption>
            </Menu>

            {/* New Language Drawer */}
            <LanguageDrawer open={openLangDrawer} setOpen={setOpenLangDrawer} />
        </>
    );
};

export default HeaderMenu;
