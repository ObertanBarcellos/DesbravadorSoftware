import './employee-project.scss'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material"
import { useEffect, useState } from "react"
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import api from "../../api/api.ts"
import { Employee } from "../../types/employee.ts"
import { StyledTableCell, StyledTableRow } from "../../utils/table-row.ts"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import employeeApi from "../../api/employeeApi.ts"

interface EmployeeProjectProps {
    id: number
}

export default function EmployeeProject(props: EmployeeProjectProps) {
    const { id } = props
    const [ open, setOpen ] = useState(false)
    const [ employees, setEmployees ] = useState<Employee[]>([])
    const [ loading, setLoading ] = useState<boolean>(false)

    const getEmployees = async () => {
        const response = await api.get<Employee[]>(`/employee/${ id }`)
        setEmployees(response.data)
    }

    const addEmployee = async () => {
        try {
            setLoading(true)
            const response = await employeeApi.get('')

            await api.post('/employee', {
                name: response.data.results[0].name.first + ' ' + response.data.results[0].name.last,
                email: response.data.results[0].email,
                projectId: id
            })

            getEmployees()
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteEmployee = async (employeeId: number) => {
        try {
            await api.delete(`/employee/${ employeeId }`)

            getEmployees()
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (open) {
            getEmployees()
        }
    }, [ open ])

    return (
        <>
            <Tooltip title="Funcionários">
                <IconButton className={ 'users' } onClick={ () => setOpen(true) }>
                    <PeopleAltIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={ open } onClose={ () => setOpen( false ) }>
                <DialogTitle>Funcionarios do projeto { id }</DialogTitle>
                <DialogContent className={ 'employee-container' }>
                    { employees.length <= 0 && <p className={ 'not-found-employee' }>Nenhum funcionario encontrado</p>}
                    { employees.length > 0 && <TableContainer  style={ { borderRadius: 15 } } component={ Paper }>
                        <Table sx={{ minWidth: 300 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell></StyledTableCell>
                                    <StyledTableCell>Nome</StyledTableCell>
                                    <StyledTableCell>Email</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { employees.map((row) => (
                                    <StyledTableRow key={ row.id }>
                                        <StyledTableCell className={ 'delete' } onClick={ () => deleteEmployee(row.id) }>
                                            <DeleteForeverIcon />
                                        </StyledTableCell>
                                        <StyledTableCell>{ row.name }</StyledTableCell>
                                        <StyledTableCell>{ row.email }</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> }
                </DialogContent>
                <DialogActions className={ 'modal-actions'}>
                    <button className={ 'actions-button close' } onClick={ () => setOpen( false ) }>Fechar</button>
                    <button className={ `actions-button info ${ loading && 'disabled' }` } disabled={ loading } onClick={ () => addEmployee() }>Adicionar Funcionario</button>
                </DialogActions>
            </Dialog>
        </>
    )
}