import { MenuItem, Select } from '@mui/material';
import { useContext, useState } from 'react';
import { StyledFormControl } from './style';
import { ReceiversContext } from '../../Context/ReceiverContext';

function StatusSelect(props) {

    const [value, setValue] = useState('all');
    const { setFilterStatus } = useContext(ReceiversContext);

    const selectOptions = [
        { 'value': 'all', 'label': 'Todos os status' },
        { 'value': 'valid', 'label': 'Válido' },
        { 'value': 'draft', 'label': 'Rascunho' },
        { 'value': 'invalid', 'label': 'Inválido' },
    ]

    const handleChange = (value) => {
        setValue(value);
        if (value === 'all')
            return setFilterStatus('');

        setFilterStatus(value);
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