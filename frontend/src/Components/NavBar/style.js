import { styled } from '@mui/system';
import { Link, Container } from '@mui/material';

export const StyledContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '48px 0px',
});

export const NavItem = styled('div')({
    color: '#72818D',
});

export const NavLinks = styled('ul')({
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
});

export const NavLink = styled('span')({
    color: '#72818D',
    textDecoration: 'inherit',
    cursor: 'pointer',
    padding: '8px 13px',
    '&.active': {
        color: '#FFF',
        backgroundColor: '#1FBFAE',
        borderRadius: '20px',
    }
});