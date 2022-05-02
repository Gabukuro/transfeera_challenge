import React, { createContext, useEffect } from 'react';
import axiosHelper from '../Helpers/AxiosHelper';

export const ReceiversContext = createContext({
    receivers: [],
    setReceivers: () => { },
    totalCount: 0,
    setTotalCount: () => { },
    totalPages: 0,
    setTotalPages: () => { },
    page: 1,
    setPage: () => { },
    filter: '',
    setFilter: () => { },
    filterStatus: '',
    setFilterStatus: () => { },
    getReceivers: () => { },
    deleteReceiver: () => { },
    updateReceiver: () => { },
    deleteRequest: () => { },
});

export const ReceiversProvider = ({ children }) => {

    const [receivers, setReceivers] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [filter, setFilter] = React.useState('');
    const [filterStatus, setFilterStatus] = React.useState('');
    const [totalCount, setTotalCount] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);

    useEffect(() => {
        getReceivers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, filter, filterStatus]);

    const getReceivers = async () => {
        axiosHelper.get(`receiver?page=${page}&limit=10&filter=${filter}&status=${filterStatus}`)
            .then(response => {
                let data = response.data;
                setReceivers(data.data);
                setTotalCount(data.totalCount);
                setTotalPages(data.totalPages);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const deleteReceiver = async (id) => {
        axiosHelper.delete(`receiver/${id}`)
            .then(response => {
                getReceivers();
            })
            .catch(error => {
                console.log(error);
            });
    }

    const deleteRequest = async (ids) => {
        axiosHelper.post(`receiver/delete-request`, { ids })
            .then(response => {
                getReceivers();
            })
            .catch(error => {
                console.log(error);
            });
    }

    const updateReceiver = async (id, data) => {
        axiosHelper.put(`receiver/${id}`, data)
            .then(response => {
                getReceivers();
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <ReceiversContext.Provider
            value={{
                receivers,
                setReceivers,
                totalCount,
                setTotalCount,
                totalPages,
                setTotalPages,
                page,
                setPage,
                filter,
                setFilter,
                filterStatus,
                setFilterStatus,
                getReceivers,
                deleteReceiver,
                updateReceiver,
                deleteRequest
            }}>
            {children}
        </ReceiversContext.Provider>
    );
}