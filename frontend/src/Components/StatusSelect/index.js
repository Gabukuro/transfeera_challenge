import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { StyledFormControl } from './style';

function StatusSelect(props) {

    const [value, setValue] = useState('all');

    const selectOptions = [
        {'value': 'all', 'label': 'Todos os status'},
        {'value': 'valid', 'label': 'Válido'},
        {'value': 'draft', 'label': 'Rascunho'},
    ]

    const handleChange = (value) => {
        setValue(value);
        props.onChange(value);
    }

    return (
        <StyledFormControl variant='standard' className={props.className ?? ''}>
            <Select 
                disableUnderline
                value={value}
                onChange={(e) => handleChange(e.target.value)}
            >
                {selectOptions.map((option, index) => ( 
                    <MenuItem key={index} value={option.value} >{option.label}</MenuItem>
                ))}
            </Select>
        </StyledFormControl>
    )
}

export default StatusSelect;