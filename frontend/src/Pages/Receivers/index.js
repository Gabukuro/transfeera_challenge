import { useContext, useEffect } from 'react';
import { Container } from '@mui/material';
import Button from '../../Components/Button';
import FilterTab from '../../Components/FilterTab';
import ReceiversTable from '../../Components/ReceiversTable';
import { ReceiversProvider, ReceiversContext } from '../../Context/ReceiverContext';

function ReceiversPage() {

    const { receivers, getReceivers } = useContext(ReceiversContext);

    useEffect(() => {
        if (!receivers) getReceivers();
    });

    return (
        <ReceiversProvider>
            <FilterTab />
            <Container>
                <Button type="delete">Excluir recebedor</Button>
                <ReceiversTable />
            </Container>
        </ReceiversProvider>
    )

}

export default ReceiversPage;