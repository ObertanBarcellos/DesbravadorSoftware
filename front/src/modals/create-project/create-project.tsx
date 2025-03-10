import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Input,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material";
import { useState } from "react";
import './create-project.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Project } from "../../types/project.ts";
import api from "../../api/api.ts";
import { RiskTypeNames } from "../../utils/risk.ts";

interface DeleteProjectProps {
    fetchData: () => void
}

export default function CreateProject(props: DeleteProjectProps) {
    const { fetchData } = props
    const [ open, setOpen ] = useState( false )
    const [ risk, setRisk ] = useState<string>(RiskTypeNames[0].value)

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<Project>()

    const onSubmit: SubmitHandler<Project> = async data => {
        try {
            console.log(data)
            await api.post('/project', { ...data })

            fetchData()
            reset()
            setOpen(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        setValue('risk', event.target.value as string)
        setRisk(event.target.value as string)
    }

    return (
        <>
            <button className={ 'create-modal-button' } onClick={ () => setOpen(true) }>Criar projeto</button>
            <Dialog open={ open } onClose={ () => setOpen( false ) }>
                <DialogTitle>Criar Projeto</DialogTitle>
                <DialogContent>
                    <form className={ 'create-project-form' } onSubmit={ handleSubmit(onSubmit) }>
                        <Input
                            className={ errors.name && 'error-color' }
                            inputProps={{ maxLength: 25 }}
                            placeholder={ 'Nome do projeto' }
                            { ...register("name", { required: true })
                        } />
                        <Input
                            className={ errors.description && 'error-color' }
                            placeholder={ 'Descrição do projeto' }
                            { ...register("description", { required: true }) }
                        />
                        <Select { ...register("risk", { required: true }) } onChange={ handleChange } value={ risk }>
                            { RiskTypeNames.map(e => (<MenuItem key={ e.value } value={ e.value }>{ e.name }</MenuItem>)) }
                        </Select>
                    </form>
                </DialogContent>
                <DialogActions  className={ 'modal-actions'}>
                    <button className={ 'actions-button close' } onClick={ () => setOpen( false ) }>Fechar</button>
                    <button className={ 'actions-button submit' } onClick={ handleSubmit(onSubmit) }>Salvar</button>
                </DialogActions>
            </Dialog>
        </>
    )
}