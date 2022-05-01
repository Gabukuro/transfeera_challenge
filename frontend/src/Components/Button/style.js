const { styled } = require('@mui/system');
const { Button } = require('@mui/material');

export const StyledButton = styled(Button)({
    minWidth: 160,
    padding: '16px 0',
    '&.delete': {
        backgroundColor: '#FF003A',
    },
    '&.save': {
        backgroundColor: '#0096ED',
    },
    '&.cancel': {
        color: '#1FBFAE',
        borderColor: '#1FBFAE',
    }
})