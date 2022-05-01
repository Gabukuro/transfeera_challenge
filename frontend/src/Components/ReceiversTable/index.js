import { useState } from 'react';
import { Table, TableCell, TableHead, TableBody, TableRow, TablePagination } from '@mui/material';
import StatusInfo from '../StatusInfo';

function ReceiversTable(props) {

    const [page, setPage] = useState(props.currentPage);
    const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage);
    const [data] = useState(props.data);

    const columns = [
        { field: 'name', headerName: 'Recebdor' },
        { field: 'cpf_cnpj', headerName: 'CPF/CNPJ' },
        { field: 'pix_key', headerName: 'PIX ou conta' },
        { field: 'status', headerName: 'Status' }
    ];

    const handlePageChange = (event, page) => {
        event.preventDefault();
        setPage(page);
    }

    const handleChangeRowsPerPage = (event) => {
        event.preventDefault();
        setRowsPerPage(event.target.value);
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell key={index}>{column.headerName}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            {columns.map((column, index) => (
                                <TableCell key={index}>
                                    {column.field === 'status' ? <StatusInfo status={row[column.field]} /> : row[column.field]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
                <TablePagination
                    count={props.totalPages}
                    page={page}
                    onPageChange={handlePageChange}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Table>
        </>
    )
}

export default ReceiversTable;