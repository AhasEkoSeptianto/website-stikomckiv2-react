
import { GET, POST, PUT, DELETE } from "src/lib/axios"
import APIADmIN from "../API"
import { I_GETMahasiswa, I_POSTMahasiswa } from "./mahasiswa"

export const N_GetListMahasiswa = async ( params: I_GETMahasiswa ) => {
    return await GET(APIADmIN.MAHASISWA.LIST, params)
}

export const N_AddAdmin = async ( body: I_POSTMahasiswa ) => {
    return await POST(APIADmIN.MAHASISWA.ADD_MAHASISWA, body)
}

// export const N_EditAdmin = async ( body: I_POSTMahasiswa, unique_id: any ) => {
//     return await PUT(APIADmIN.ADMIN.EDIT_ADMIN, {unique_id: unique_id}, body)
// }

// export const N_DeleteAdmin = async ( unique_id: any ) => {
//     return await DELETE(APIADmIN.ADMIN.DELETE_ADMIN, { unique_id: unique_id } )
// }
