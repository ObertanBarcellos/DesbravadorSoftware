import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import './delete-project.scss'
import api from "../../api/api.ts"
import { Project } from "../../types/project.ts"

interface DeleteProjectProps {
    id: number
    fetchData: () => void
}

export default function DeleteProject(props: DeleteProjectProps) {
    const { id, fetchData } = props
    const [ open, setOpen ] = useState( false )

    async function handleDelete ( ) {
        try {
            await api.delete<Project[]>(`/project/${ id }`)
            fetchData()
            setOpen(false)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <button className={ 'delete' } onClick={ () => setOpen(true) }><DeleteForeverIcon /></button>
            <Dialog open={ open } onClose={ () => setOpen( false ) }>
                <DialogTitle>Deletar projeto { id }</DialogTitle>
                <DialogContent>
                    <p>Tem certeza que deseja excluir esse projeto?</p>
                    <p>Essa ação não podera ser desfeita!</p>
                </DialogContent>
                <DialogActions  className={ 'modal-actions'}>
                    <button className={ 'actions-button close' } onClick={ () => setOpen( false ) }>Não</button>
                    <button className={ 'actions-button submit' } onClick={ () => handleDelete() }>Sim</button>
                </DialogActions>
            </Dialog>
        </>
    )
}