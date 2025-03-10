import { useEffect, useState } from 'react'
import { Project } from '../../types/project'
import api from '../../api/api'
import './project-list.scss'
import ProjectWidget from "../project-widget/project-widget.tsx"
import CreateProject from "../../modals/create-project/create-project.tsx"

export default function ProjectList() {
  const [ projects, setProjects ] = useState<Project[]>([])

  const fetchData = async () => {
    try {
      const response = await api.get<Project[]>('/project')
      setProjects(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
      fetchData()
  }, [])

  return (
    <div className={ 'project-list-container' }>
      <div className={ 'project-list-header' }>
          <h1>Projetos</h1>
          <CreateProject fetchData={ () => fetchData() } />
      </div>
      { projects.length == 0 && <div className={ 'project-list-not-found' }>
          <img src={ '/1662569.png' } alt='Not Found' draggable={ false } />
          <p>Não foi possivel localizar nenhum projeto!</p>
      </div> }
      <div className={ `project-list-content ${ projects.length < 3 && 'has-few' }` }>
        { projects.length > 0 && projects.map((project) => (
            <ProjectWidget key={ project.id } fetchData={ () => fetchData() } project={ project } />
        )) }
      </div>
      <div className={ 'project-list-footer' }>
        <p>Projeto técnico desenvolvido para <a href={ 'https://www.desbravador.com.br/' } target={ '_blank' }>Debravador Software</a></p>
        <p>Feito com ❤️ por <a href={ 'https://github.com/ObertanBarcellos' } target={ '_blank' }>Obertan Barcellos</a></p>
      </div>
    </div>
  )
}