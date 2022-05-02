import React, { createContext, useEffect, useContext } from 'react';
import axiosHelper from '../Helpers/AxiosHelper';
import { NotificationContext } from './NotificationContext';

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
    showModal: false,
    receiversSelected: [],
    setReceiversSelected: () => { },
    currentReceiver: {},
    setCurrentReceiver: () => { },
    setShowModal: () => { },
    getReceivers: () => { },
    createReceiver: () => { },
    deleteReceiver: () => { },
    requestDeleteReceiver: () => { },
    updateReceiver: () => { },
    deleteRequest: () => { },
    notify: () => {},
});

export const ReceiversProvider = ({ children }) => {

    const [receivers, setReceivers] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [filter, setFilter] = React.useState('');
    const [filterStatus, setFilterStatus] = React.useState('');
    const [totalCount, setTotalCount] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);
    const [showModal, setShowModal] = React.useState(false);
    const [receiversSelected, setReceiversSelected] = React.useState([]);
    const [currentReceiver, setCurrentReceiver] = React.useState({});

    const { notify } = useContext(NotificationContext);

    useEffect(() => {
        getReceivers();
        setReceiversSelected([])
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
                notify('Erro ao consultar recebedores', 'error');
            });
    }

    const createReceiver = async (receiver) => {
        axiosHelper.post('receiver', receiver)
            .then(response => {
                getReceivers();
                notify('Recebdor criado com sucesso!', 'success');
            })
            .catch(error => {
                notify('Ocorreu um erro ao criar recebedor', 'error');
            });
    }

    const deleteReceiver = async (id) => {
        axiosHelper.delete(`receiver/${id}`)
            .then(response => {
                getReceivers();
                setReceiversSelected([])
                notify('Recebedor excluído com sucesso!', 'success');
            })
            .catch(error => {
                notify('Ocorreu um erro ao excluir recebedor', 'error');
            });
    }

    const requestDeleteReceiver = async (ids) => {
        axiosHelper.post(`receiver/delete-request`, ids)
            .then(response => {
                getReceivers();
                setReceiversSelected([])
                notify('Recebedores excluídos com sucesso!', 'success');
            })
            .catch(error => {
                notify('Erro ao excluir recebedores', 'error');
            });
    }

    const updateReceiver = async (id, data) => {
        axiosHelper.put(`receiver/${id}`, data)
            .then(response => {
                getReceivers();
                notify('Recebedor atualizado com sucesso!', 'success');
            })
            .catch(error => {
                notify('Ocorreu um erro ao atualizar o recebedor', 'error');
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
                createReceiver,
                deleteReceiver,
                updateReceiver,
                requestDeleteReceiver,
                showModal,
                setShowModal,
                receiversSelected,
                setReceiversSelected,
                currentReceiver,
                setCurrentReceiver,
            }}>
            {children}
        </ReceiversContext.Provider>
    );
}