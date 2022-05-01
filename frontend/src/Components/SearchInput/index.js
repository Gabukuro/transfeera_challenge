import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { StyledFormControl, CloseIcon } from "./style";
import { Search } from "@mui/icons-material";


function SearchInput(props) {

    const [value, setValue] = useState("");

    const handleChange = (value) => {
        setValue(value);
        props.onChange(value);
    }

    return (
        <StyledFormControl className={props.className ?? ''}>
            <TextField
                size="small"
                variant="outlined"
                placeholder="Buscar por nome do cpf ou conta"
                onChange={(e) => handleChange(e.target.value)}
                InputProps={{
                    value: value,
                    endAdornment: (
                        <InputAdornment position="end">
                            {value !== "" ? <CloseIcon onClick={() => setValue("")} /> : <Search />}
                        </InputAdornment>
                    )
                }}
            />
        </StyledFormControl>
    )
}

export default SearchInput;