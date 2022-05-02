import { useContext, useEffect, useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { StyledFormControl, CloseIcon } from "./style";
import { Search } from "@mui/icons-material";
import { ReceiversContext } from '../../Context/ReceiverContext';


function SearchInput(props) {

    const [value, setValue] = useState("");
    const { setFilter } = useContext(ReceiversContext);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setFilter(value);
        }, 3000);
        return () => clearTimeout(delayDebounce);
    }, [props, setFilter, value]);

    return (
        <StyledFormControl className={props.className ?? ''}>
            <TextField
                size="small"
                variant="outlined"
                placeholder="Buscar por nome do cpf ou conta"
                onChange={(e) => setValue(e.target.value)}
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