import { useState, useEffect } from 'react';
import { StyledStatusInfo } from './styles';

function StatusInfo(props) {

    const [status, setStatus] = useState(props.status);

    const statuses = {
        valid: 'Dados válidos',
        invalid: 'Dados incorretos',
        draft: 'Rascunho',
        new: 'Novo',
    }

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    return (
        <StyledStatusInfo className={status ?? ''}>
            {statuses[status]}
        </StyledStatusInfo>
    );
}

export default StatusInfo;