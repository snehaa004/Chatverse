import React, { useContext, useState } from 'react';
import { Drawer, Box, Typography, MenuItem, Select, styled, InputLabel, FormControl } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { AccountContext } from '../../context/AccountProvider';

const Header = styled(Box)`
  background: #657166;
  height: 107px;
  color: #FFFFFF;
  display: flex;
  & > svg, & > p {
    margin-top: auto;
    padding: 15px;
    font-weight: 600;
  }
`;

const Component = styled(Box)`
  background: #cfd6c4;
  height: 85%;
  padding: 20px;
`;

const Text = styled(Typography)`
  font-size: 18px;
`;

const drawerStyle = {
  left: 20,
  top: 16,
  height: '95%',
  width: '30%',
  boxShadow: 'none'
};

const menuItemStyle = {
  width: '90%',
  marginLeft: '5%',
};

const LanguageDrawer = ({ open, setOpen }) => {
    const { account, socket } = useContext(AccountContext);
    const [language, setLanguage] = useState(localStorage.getItem('preferredLanguage') || 'en');

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        setLanguage(selectedLanguage);
        localStorage.setItem('preferredLanguage', selectedLanguage);

        if (socket.current) {
            socket.current.emit('setLanguage', {
                userId: account.sub,
                language: selectedLanguage
            });
        }
    };

    return (
        <Drawer
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{ sx: drawerStyle }}
            style={{ zIndex: 1500 }}
        >
            <Header>
                <ArrowBack onClick={() => setOpen(false)} />
                <Text>Select Preferred Language</Text>
            </Header>
            <Component>
                <FormControl fullWidth>
                    <InputLabel id="language-label">Language</InputLabel>
                    <Select
                        labelId="language-label"
                        id="language-select"
                        value={language}
                        onChange={handleLanguageChange}
                        label="Language"
                        MenuProps={{
                            disablePortal: true
                        }}
                    >
                        <MenuItem value="en" sx={menuItemStyle}>English</MenuItem>
                        <MenuItem value="es" sx={menuItemStyle}>Spanish</MenuItem>
                        <MenuItem value="fr" sx={menuItemStyle}>French</MenuItem>
                        <MenuItem value="de" sx={menuItemStyle}>German</MenuItem>
                        <MenuItem value="ml" sx={menuItemStyle}>Malayalam</MenuItem>
                        <MenuItem value="hi" sx={menuItemStyle}>Hindi</MenuItem>
                        <MenuItem value="mr" sx={menuItemStyle}>Marathi</MenuItem>
                        <MenuItem value="zh" sx={menuItemStyle}>Chinese</MenuItem>
                    </Select>
                </FormControl>
            </Component>
        </Drawer>
    );
};

export default LanguageDrawer;
