import { styled } from "@mui/system";

export const StyledStatusInfo = styled('div')({
    borderRadius: 20,
    color: '#FFF',
    width: 180,
    padding: 5,
    textAlign: 'center',
    '&.valid': {
        backgroundColor: '#1FBFAE',
    },
    '&.invalid': {
        backgroundColor: '#FF003A',
    },
    '&.draft': {
        backgroundColor: '#B2C1CD'
    },
    '&.new': {
        backgroundColor: '#0096ED'
    }
})