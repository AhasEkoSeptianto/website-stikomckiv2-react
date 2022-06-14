import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import { Fragment } from "react"

type I_TableAdmin = {
    column: I_Column[],
    data: any[],
    pagination: I_Pagination
}

type I_Column = {
  key: string,
  label: any,
  render?: (record: any) => any
}

type I_Pagination = {
    page: number,
    limit: number,
    totalData: number,
    onPageChange: (page: number) => void,
    onLimitChange: (limit: number) => void
}

export default function TableAdmin( props: I_TableAdmin ){
    const { column, data, pagination } = props

    return (
        <Fragment>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {column.map((item, idx) => (
                    <TableCell key={idx}>
                      <span className="font-bold">{item.label}</span>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((dataSource, idx) => (
                    <Fragment>
                        <TableRow
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            {column?.map((columnH, idx_data) => (
                                <TableCell>
                                  {columnH.render ? columnH.render(dataSource) : dataSource[columnH.key]}
                                </TableCell>    
                            ))}
                        </TableRow>
                    </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[1, 2, 3, 10, 25, 100]}
            component="div"
            count={pagination.totalData}
            rowsPerPage={pagination.limit}
            page={pagination.page - 1}
            onPageChange={(e: any, newPage: any) => {
                pagination.onPageChange(newPage + 1)
            }}
            onRowsPerPageChange={(e: any) => {
                pagination.onLimitChange(e.target.value)
            }}
          />
        </Fragment>
    )
}