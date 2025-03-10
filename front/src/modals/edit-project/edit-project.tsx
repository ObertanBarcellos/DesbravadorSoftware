import './edit-project.scss'
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
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import api from "../../api/api.ts";
import { Project } from "../../types/project.ts";
import { SubmitHandler, useForm } from 'react-hook-form'
import { StatusTypeNames } from "../../utils/status.ts";
import { RiskTypeNames } from "../../utils/risk.ts";

interface EditProjectProps {
    id: number
    fetchData: () => void
}

export function EditProject(props: EditProjectProps){
    const { id, fetchData } = props
    const [ open, setOpen ] = useState(false)
    const [ project, setProject ] = useState<Project>()
    const [ risk, setRisk ] = useState<string>(RiskTypeNames[0].value)
    const [ status, setStatus ] = useState<string>(StatusTypeNames[0].value)

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<Project>()

    const getProject = async () => {
        try {
            const response = await api.get<Project>(`/project/${ id }`)
            setValue('name', response.data.name)
            setValue('description', response.data.description)

            setValue('risk', response.data.risk)
            setRisk(response.data.risk)

            setValue('status', response.data.status)
            setStatus(response.data.status)

            setProject(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const handleChangeRisk = (event: SelectChangeEvent) => {
        setValue('risk', event.target.value as string)
        setRisk(event.target.value as string)
    }

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setValue('status', event.target.value as string)
        setStatus(event.target.value as string)
    }

    const onSubmit: SubmitHandler<Project> = async data => {
        try {
            if (project) {
                const { startDate, endDate } = project
                await api.put(`/project/${ id }`, {
                    ...data,
                    id,
                    startDate,
                    endDate
                })
                fetchData()

                reset()
                setOpen(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (open) {
            getProject()
        }
    }, [ open ])

    return (
        <>
            <button className={ 'edit' } onClick={ () => setOpen(true) }><EditIcon /></button>
            <Dialog open={ open } onClose={ () => setOpen( false ) }>
                <DialogTitle>Deletar projeto { id }</DialogTitle>
                <DialogContent>
                    <form className={ 'create-project-form' } onSubmit={ handleSubmit(onSubmit) }>
                        <Input className={ errors.name && 'error-color' } placeholder={ 'Nome do projeto' } { ...register("name", { required: true }) } />
                        <Input className={ errors.description && 'error-color' } placeholder={ 'Descrição do projeto' } { ...register("description", { required: true }) } />
                        <Select { ...register("risk", { required: true }) } onChange={ handleChangeRisk } value={ risk }>
                            { RiskTypeNames.map(e => (<MenuItem key={ e.value } value={ e.value }>{ e.name }</MenuItem>)) }
                        </Select>
                        <Select { ...register("status", { required: true }) } onChange={ handleChangeStatus } value={ status }>
                            { StatusTypeNames.map(e => (<MenuItem key={ e.value } value={ e.value }>{ e.name }</MenuItem>)) }
                        </Select>
                    </form>
                </DialogContent>
                <DialogActions className={ 'modal-actions' }>
                    <button className={ 'actions-button close' } onClick={ () => setOpen( false ) }>Fechar</button>
                    <button className={ 'actions-button submit' } onClick={ handleSubmit(onSubmit) }>Salvar</button>
                </DialogActions>
            </Dialog>
        </>
    )
}