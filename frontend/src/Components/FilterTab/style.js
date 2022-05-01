import { styled } from '@mui/system';
import { Container } from '@mui/material';
import { Add } from "@mui/icons-material";

export const StyledContainer = styled(Container)({
    backgroundColor: '#CDD6DE',
});

export const FilterTabContainer = styled(Container)({
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    '& .filter-tab__item:last-child': {
        marginLeft: 'auto'
    }
});



export const AddButton = styled(Add)({
    color: '#FFF',
    backgroundColor: '#1FBFAE',
    borderRadius: '50%',
    height: 36,
    width: 36,
    cursor: 'pointer',
});