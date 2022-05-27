import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Fragment, useMemo, useState } from "react";
import { N_GetListAdmin } from "src/network/admin/admin";
import useSWR from "swr";

import AddIcon from '@mui/icons-material/Add';

export default function AdminPage(){

    const [ params, setParams ] = useState({
        page: 1,
        limit: 10
    })


    const { data: listAdmin } = useSWR([params], N_GetListAdmin)
    console.log(listAdmin)
    return (
        <Fragment>
            <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-2xl">List Admin</h2>
                <Button variant='contained' startIcon={<AddIcon />} color='primary'>Add Admin</Button>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {listAdmin?.data?.data?.map((item: any, idx: number) => (
                        <TableRow
                            key={idx}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {item.name}
                            </TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.phoneNumber}</TableCell>
                            <TableCell>{item.role}</TableCell>
                        </TableRow>    
                        ))}
                    
                    </TableBody>
                </Table>
                </TableContainer>

        </Fragment>
    )
}