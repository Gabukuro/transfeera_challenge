import { useContext, useEffect } from 'react';
import { Container } from '@mui/material';
import FilterTab from '../../Components/FilterTab';
import ReceiversTable from '../../Components/ReceiversTable';
import { ReceiversProvider, ReceiversContext } from '../../Context/ReceiverContext';
import ReceiverModal from '../../Components/ReceiverModal';
import Notification from '../../Components/Notification';

function ReceiversPage() {

    const { receivers, getReceivers } = useContext(ReceiversContext);

    useEffect(() => {
        if (!receivers) getReceivers();
    });

    return (
        <ReceiversProvider>
            <FilterTab />
            <Container>
                <ReceiversTable />
            </Container>

            <ReceiverModal />
            <Notification />
        </ReceiversProvider>
    )

}

export default ReceiversPage;