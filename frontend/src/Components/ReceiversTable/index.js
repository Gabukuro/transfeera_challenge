import { useContext } from 'react';
import { TableCell, TableHead, TableBody, TableRow, TablePagination } from '@mui/material';
import { StyledTable } from './style';
import StatusInfo from '../StatusInfo';
import { ReceiversContext } from '../../Context/ReceiverContext';

function ReceiversTable() {

    const { receivers, page, setPage, totalCount } = useContext(ReceiversContext)

    const columns = [
        { field: 'name', headerName: 'Recebdor' },
        { field: 'cpf_cnpj', headerName: 'CPF/CNPJ' },
        { field: 'pix_key', headerName: 'PIX ou conta' },
        { field: 'status', headerName: 'Status' }
    ];

    return (
        <StyledTable>
            <TableHead>
                <TableRow>
                    {columns.map((column, index) => (
                        <TableCell key={index}>{column.headerName}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {receivers && receivers.map((row, index) => (
                    <TableRow key={index}>
                        {columns.map((column, index) => (
                            <TableCell key={index}>
                                {column.field === 'status' ? <StatusInfo status={row[column.field]} /> : row[column.field]}
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
    )
}

export default ReceiversTable;