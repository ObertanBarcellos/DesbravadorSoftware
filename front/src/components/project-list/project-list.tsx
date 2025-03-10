import { useEffect, useState } from 'react';
import { Project } from '../../types/project';
import api from '../../api/api';
import './project-list.scss'
import ProjectWidget from "../project-widget/project-widget.tsx";
import CreateProject from "../../modals/create-project/create-project.tsx";

export default function ProjectList() {
  const [ projects, setProjects ] = useState<Project[]>([])

  const fetchData = async () => {
    try {
      const response = await api.get<Project[]>('/project')
      console.log(response.data)
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
      <div className='project-list-header'>
          <h1>Projetos</h1>
          <CreateProject fetchData={ () => fetchData() } />
      </div>
      <div className={ 'project-list-content' }>
        { projects.map((project) => (
            <ProjectWidget key={ project.id } fetchData={ () => fetchData() } project={ project } />
        )) }
      </div>
      <div className={ 'project-list-footer' }>

      </div>
    </div>
  )
}