import { useContext } from 'react';
import { TableCell, TableHead, TableBody, TableRow, TablePagination, Checkbox } from '@mui/material';
import { StyledTable } from './style';
import StatusInfo from '../StatusInfo';
import Button from '../../Components/Button';
import { ReceiversContext } from '../../Context/ReceiverContext';
import { NotificationContext } from '../../Context/NotificationContext';

function ReceiversTable() {

    const { notify } = useContext(NotificationContext);
    const { receivers, page, setPage, totalCount, receiversSelected, setReceiversSelected, setCurrentReceiver, setShowModal, deleteReceiver, requestDeleteReceiver } = useContext(ReceiversContext);

    const columns = [
        { field: 'name', headerName: 'Recebdor' },
        { field: 'cpf_cnpj', headerName: 'CPF/CNPJ' },
        { field: 'pix_key', headerName: 'PIX ou conta' },
        { field: 'status', headerName: 'Status' }
    ];

    const editReceiver = (receiver) => {
        setCurrentReceiver(receiver);
        setShowModal(true);
    }

    const isSelected = (receiver) => {
        return receiversSelected.includes(receiver.id);
    }

    const toggleSelectAll = () => {
        if (receivers.every(isSelected))
            return setReceiversSelected([]);

        let ids = receivers.map(receiver => receiver.id);
        setReceiversSelected(ids);
    }

    const toggleSelect = (id) => {
        if (receiversSelected.includes(id))
            return setReceiversSelected(receiversSelected.filter(receiverId => receiverId !== id));

        setReceiversSelected([...receiversSelected, id]);
    }

    const handleDelete = () => {
        console.log(receiversSelected);
        if (receiversSelected.length === 0)
            return notify('Selecione pelo menos um recebedor para excluir.', 'info');

        if (receivers.length === 1) {
            deleteReceiver(receiversSelected[0]);
        } else {
            requestDeleteReceiver(receiversSelected);
        }
    }

    return (
        <>
            <Button type="delete" onClick={handleDelete}>Excluir recebedor</Button>

            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell><Checkbox checked={receivers.every(isSelected) && receivers.length !== 0} onChange={() => toggleSelectAll()} /></TableCell>
                        {columns.map((column, index) => (
                            <TableCell key={index}>{column.headerName}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {receivers && receivers.map((receiver, index) => (
                        <TableRow key={index}>
                            <TableCell><Checkbox value={receiver.id} checked={receiversSelected.includes(parseInt(receiver.id))} onChange={(e) => toggleSelect(parseInt(e.target.value))} /></TableCell>
                            {columns.map((column, index) => (
                                <TableCell key={index} onClick={() => editReceiver(receiver)}>
                                    {column.field === 'status' ? <StatusInfo status={receiver[column.field]} /> : receiver[column.field]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                    <TableRow>
                        <TablePagination
                            page={page - 1}
                            count={totalCount}
                            rowsPerPage={10}
                            onPageChange={(event, page) => setPage(page + 1)}
                            rowsPerPageOptions={[]}
                        />
                    </TableRow>
                </TableBody>
            </StyledTable>
        </>
    )
}

export default ReceiversTable;