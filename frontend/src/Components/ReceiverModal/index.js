import { useEffect, useContext, useState } from "react";
import StatusInfo from "../StatusInfo";
import { ReceiversContext } from '../../Context/ReceiverContext';
import { StyledBody, StyledBox, StyledHeader, StyledFooter } from "./style";
import { Modal, RadioGroup, FormControl, Radio, TextField, FormLabel, FormControlLabel } from "@mui/material";
import { Close } from "@mui/icons-material";
import Button from '../Button';

function ReceiverModal() {

    const { showModal, setShowModal, currentReceiver, createReceiver, updateReceiver, setCurrentReceiver } = useContext(ReceiversContext);

    const [name, setName] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [pixType, setPixType] = useState('EMAIL');
    const [pixKey, setPixKey] = useState('');

    useEffect(() => {
        if (currentReceiver) {
            setName(currentReceiver.name || '');
            setCpfCnpj(currentReceiver.cpf_cnpj || '');
            setEmail(currentReceiver.email || '');
            setPixType(currentReceiver.pix_key_type || '');
            setPixKey(currentReceiver.pix_key || '');
        }
    }, [currentReceiver]);

    const pixTypes = [
        { name: 'Telefone', enum: 'TELEFONE' },
        { name: 'CPF', enum: 'CPF' },
        { name: 'CNPJ', enum: 'CNPJ' },
        { name: 'E-mail', enum: 'EMAIL' },
        { name: 'Chave aleatória', enum: 'CHAVE_ALEATÓRIA' },
    ]


    const handleSubmit = () => {
        if (currentReceiver.id) {
            updateReceiver(currentReceiver.id, {
                name,
                cpf_cnpj: cpfCnpj,
                email,
                pix_key_type: pixType,
                pix_key: pixKey
            });
        } else {
            createReceiver({
                name,
                cpf_cnpj: cpfCnpj,
                email,
                pix_key_type: pixType,
                pix_key: pixKey
            });
        }
        clearFormAndExit();
    }

    const clearFormAndExit = () => {
        setName('');
        setCpfCnpj('');
        setEmail('');
        setPixType('EMAIL');
        setPixKey('');
        setCurrentReceiver({});
        setShowModal(false);
    }

    return (
        <Modal
            open={showModal}
            onClose={() => { }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <StyledBox>
                <StyledHeader>
                    <Close onClick={() => setShowModal(false)} />
                </StyledHeader>
                <StyledBody>
                    <h1>{currentReceiver.name ?? 'Novo recebedor'}</h1>

                    <StatusInfo status={currentReceiver.status ?? 'new'} />

                    <h2>Dados do recebedor</h2>

                    <FormControl>
                        <FormLabel>Nome</FormLabel>
                        <TextField
                            disabled={currentReceiver.status === 'valid'}
                            size="small"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>CPF/CNPJ</FormLabel>
                        <TextField
                            disabled={currentReceiver.status === 'valid'}
                            size="small"
                            value={cpfCnpj}
                            onChange={(e) => setCpfCnpj(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <RadioGroup
                            row
                            value={pixType}
                            onChange={(e) => setPixType(e.target.value)}
                        >
                            {pixTypes.map((pixType, index) =>
                                <FormControlLabel
                                    disabled={currentReceiver.status === 'valid'}
                                    key={index}
                                    value={pixType.enum}
                                    label={pixType.name}
                                    control={<Radio color="primary" />}
                                />
                            )}
                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel>{`Chave Pix (${pixType ? pixTypes.find(i => i.enum === pixType).name : ''})`}</FormLabel>
                        <TextField
                            disabled={currentReceiver.status === 'valid'}
                            size="small"
                            value={pixKey}
                            onChange={(e) => setPixKey(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>E-mail para envio do compovante (opcional)</FormLabel>
                        <TextField
                            size="small"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                </StyledBody>
                <StyledFooter>
                    <Button type='cancel' onClick={clearFormAndExit}>Cancelar</Button>
                    <Button type='save' onClick={handleSubmit}>Salvar</Button>
                </StyledFooter>
            </StyledBox>
        </Modal >
    )
}

export default ReceiverModal;