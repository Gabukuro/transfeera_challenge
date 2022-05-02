import { styled } from '@mui/system';

export const StyledBox = styled('div')({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
});

export const StyledHeader = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#1FBFAE',
    padding: '10px',
    borderRadius: '5px 5px 0 0',
    '& > svg': {
        color: '#FFF',
        cursor: 'pointer',
    }
});

export const StyledBody = styled('div')({
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    backgroundColor: '#FFF',
});

export const StyledFooter = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#FFF',
    borderRadius: '0 0 5px 5px',
});