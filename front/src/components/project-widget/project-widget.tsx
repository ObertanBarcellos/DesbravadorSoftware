import './projetc-widget.scss'
import { Project } from "../../types/project.ts"
import { RiskTypeNames } from "../../utils/risk.ts"
import DeleteProject from "../../modals/delete-project/delete-project.tsx"
import { EditProject } from "../../modals/edit-project/edit-project.tsx"
import { StatusTypeNames } from "../../utils/status.ts"
import ViewProject from "../../modals/view-project/view-project.tsx"
import { formatProjectDescription } from "../../utils/string.ts"
import EmployeeProject from "../../modals/employee-project/employee-project.tsx"
import FinishProject from "../../modals/finish-project/finish-project.tsx"


interface ProjectWidgetProps {
    project: Project;
    fetchData: () => void;
}

export default function ProjectWidget(props: ProjectWidgetProps) {
    const { project, fetchData } = props
    const { id, status, risk, name, description } = project

    return (
        <div key={ id } className={ 'project-widget-container' }>
            <div className={ 'project-list-actions' }>
                <h1>Nº { id }</h1>
                <div className={ 'actions' }>
                    <ViewProject id={ id } />
                    { status != 'CLOSED' && <EmployeeProject id={ id } /> }
                    { status != 'CLOSED' && <FinishProject fetchData={ fetchData } project={ project } /> }
                    { status != 'CLOSED' && <EditProject fetchData={ fetchData } id={ id } /> }
                    { status != 'STARTED' && status != 'IN_PROGRESS' && status != 'CLOSED' && <DeleteProject fetchData={ fetchData } id={ id } /> }
                </div>
            </div>
            <div className={ 'project-widget-header' }>
                <h2>{ name }</h2>
            </div>
            <p>{ formatProjectDescription(description) }</p>
            <div className={ 'project-widget-footer' }>
                <p className={ risk } >{ RiskTypeNames.find(e => e.value == risk)?.name }</p>
                <p>{ StatusTypeNames.find(e => e.value == status)?.name }</p>
            </div>
        </div>
    )
}