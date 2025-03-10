import './view-project.scss'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useEffect, useState} from "react";
import api from "../../api/api.ts";
import {Project} from "../../types/project.ts";
import {StatusTypeNames} from "../../utils/status.ts";
import {RiskTypeNames} from "../../utils/risk.ts";
import {projectViewDate} from "../../utils/date.ts";
import {EmployeeView} from "../employee-view/employee-view.tsx";

interface ViewProjectProps {
    id: number
}

export default function ViewProject(props: ViewProjectProps) {
    const { id } = props
    const [ open, setOpen ] = useState(false)
    const [ project, setProject ] = useState<Project>()

    const getProject = async () => {
        try {
            const response = await api.get<Project>(`/project/${ id }`)
            setProject(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (open) {
            getProject()
        }
    }, [ open ])


    return ( <>
            <button className={ 'view' } onClick={ () => setOpen(true) }><FullscreenIcon /></button>
            <Dialog open={ open } onClose={ () => setOpen(false) }>
                <DialogTitle>Projeto { id }</DialogTitle>
                <DialogContent className={ 'view-project-content' }>
                    <div className={ 'view-project-item' }>
                        <p>Nome: { project?.name }</p>
                    </div>
                    <div className={ 'view-project-item' }>
                        <p>Descrição: { project?.description }</p>
                    </div>
                    <div className={ 'view-project-item' }>
                        <p>Status: { project && StatusTypeNames.find(e => e.value == project.status)?.name }</p>
                    </div>
                    <div className={ 'view-project-item' }>
                        <p>Risco: { project && RiskTypeNames.find(e => e.value == project.risk)?.name }</p>
                    </div>
                    <div className={ 'view-project-item' }>
                        <p>Data de inicio: { project ? projectViewDate(project.startDate) : '' }</p>
                    </div>
                    <div className={ 'view-project-item' }>
                        <p>Data de termino: { project ? projectViewDate(project.endDate) : '' }</p>
                    </div>
                </DialogContent>
                <DialogActions className={ 'modal-actions' }>
                    <EmployeeView id={ id } />
                    <button className={ 'actions-button close' } onClick={ () => setOpen( false ) }>Fechar</button>
                </DialogActions>
            </Dialog>
        </>
    )
}