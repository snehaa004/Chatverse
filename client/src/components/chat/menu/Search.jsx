




import { Box, InputBase, styled } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const Component = styled(Box)`
    background: #657166;
    height: 45px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #F2F2F2;
`;

const Wrapper = styled(Box)`
    position: relative;
    border-radius: 10px;
    background-color:#657166;
    margin: 0 13px;
    width: 100%;
    border: 1px solid #919191;
`;

const Icon = styled(Box)`
    color: #919191;
    padding: 8px;
    height: 100%;
    position: absolute;
`;
      
const InputField = styled(InputBase) `
    width: 100%;
    padding: 16px;
    padding-left: 65px;
    font-size: 14px;
    height: 15px;
    width: 100%;
`;

const Search = ({ setText }) => {

    return (
        <Component>
            <Wrapper>
                <Icon>
                    <SearchIcon fontSize="small"/>
                </Icon>
                <InputField
                    placeholder="Search or start new chat"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setText(e.target.value)}
                />
            </Wrapper>
        </Component>
    )
}

export default Search;