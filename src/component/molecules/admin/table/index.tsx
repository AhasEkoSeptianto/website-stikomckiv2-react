import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import { Fragment } from "react"

type I_TableAdmin = {
    column: I_Column[],
    loading?: boolean,
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
    const { column, data, pagination, loading } = props

    return (
        <div className='relative'>
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
                { data?.map((dataSource, idx) => (
                  <TableBody>
                    <TableRow
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                        {column?.map((columnH, idx_data) => (
                            <TableCell>
                              {columnH.render ? columnH.render(dataSource) : dataSource[columnH.key]}
                            </TableCell>    
                        ))}
                    </TableRow>
                  </TableBody>
                ))}
            </Table>
          </TableContainer>
          {loading && data?.length <= 0 && (
            <div className='w-full flex justify-center items-center h-32'>
                <CircularProgress /> 
            </div>
          )}

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
        </div>
    )
}