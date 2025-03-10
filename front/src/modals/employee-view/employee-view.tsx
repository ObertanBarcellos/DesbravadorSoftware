import './employee-view.scss'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table, TableBody,
    TableContainer,
    TableHead, TableRow
} from "@mui/material"
import {useEffect, useState} from "react"
import {Employee} from "../../types/employee.ts"
import api from "../../api/api.ts"
import {StyledTableCell, StyledTableRow} from "../../utils/table-row.ts"

interface EmployeeViewProps {
    id: number
}

export function EmployeeView(props: EmployeeViewProps) {
    const { id } = props
    const [ open, setOpen ] = useState(false)
    const [ employees, setEmployees ] = useState<Employee[]>([])

    const getEmployees = async () => {
        const response = await api.get<Employee[]>(`/employee/${ id }`)
        setEmployees(response.data)
    }

    useEffect(() => {
        if (open) {
            getEmployees()
        }
    }, [ open ])

    return (<>
        <button className={ 'actions-button info' } onClick={ () => setOpen( true ) }>Visualizar funcionarios</button>
        <Dialog open={ open } onClose={ () => setOpen( false ) }>
            <DialogTitle>Funcionarios projeto { id }</DialogTitle>
            <DialogContent>
                { employees.length <= 0 && <p className={ 'not-found-employee' }>Nenhum funcionario encontrado</p>}
                { employees.length > 0 && <TableContainer  style={ { borderRadius: 15 } } component={ Paper }>
                    <Table sx={{ minWidth: 300 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell>Nome</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { employees.map((row) => (
                                <StyledTableRow key={ row.id }>
                                    <StyledTableCell>{ row.id }</StyledTableCell>
                                    <StyledTableCell>{ row.name }</StyledTableCell>
                                    <StyledTableCell>{ row.email }</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> }
            </DialogContent>
            <DialogActions className={ 'modal-actions' }>
                <button className={ 'actions-button close' } onClick={ () => setOpen( false ) }>Fechar</button>
            </DialogActions>
        </Dialog>
    </>)
}