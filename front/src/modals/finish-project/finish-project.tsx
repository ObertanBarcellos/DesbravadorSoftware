import './finish-project.scss'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import { useState } from "react"
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material"
import api from "../../api/api.ts"
import { Project } from "../../types/project.ts";

interface FinishProjectProps {
    project: Project;
    fetchData: () => void
}

export default function FinishProject(props: FinishProjectProps) {
    const { project, fetchData } = props
    const [ open, setOpen ] = useState(false)

    const onSubmit = async () => {
        try {
            await api.put(`/project/${ project.id }`, {
                ...project,
                status: 'CLOSED',
            })

            fetchData()
            setOpen(false)
        } catch (e) {
            console.log(e)
        }
    }

    return (<>
        <Tooltip title="Encerrar Projeto">
            <IconButton className={ 'submit' } onClick={ () => setOpen(true) }>
                <AssignmentTurnedInIcon />
            </IconButton>
        </Tooltip>
        <Dialog open={ open } onClose={ () => setOpen(false) }>
            <DialogTitle>Finalizar projeto</DialogTitle>
            <DialogContent>
                <p>Tem certeza que deseja concluir esse projeto?</p>
                <p>Essa ação não podera ser desfeita!</p>
            </DialogContent>
            <DialogActions className={ 'modal-actions' }>
                <button className={ 'actions-button close' } onClick={ () => setOpen( false ) }>Não</button>
                <button className={ 'actions-button submit' } onClick={ () => onSubmit() }>Sim</button>
            </DialogActions>
        </Dialog>
    </>)
}