import { styled } from "@mui/system"
import { FormControl } from "@mui/material"
import { Close } from "@mui/icons-material";

export const StyledFormControl = styled(FormControl)({
    width: 256,
    backgroundColor: '#FFF',
    borderRadius: 4
});

export const CloseIcon = styled(Close)({
    cursor: 'pointer'
})