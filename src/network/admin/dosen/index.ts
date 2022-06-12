
import { GET, POST, PUT, DELETE } from "src/lib/axios"
import APIADmIN from "../API"
import { I_GETDosen, I_POSTDosen } from "./dosen"

export const N_GETDosen = async ( params: I_GETDosen ) => {
    return await GET(APIADmIN.DOSEN.LIST, params)
}

export const N_POSTMahasiswa = async ( body: I_POSTDosen ) => {
    return await POST(APIADmIN.DOSEN.ADD_DOSEN, body)
}

export const N_PUTMahasiswa = async ( body: I_POSTDosen, unique_id: any ) => {
    return await PUT(APIADmIN.DOSEN.UPDATE_DOSEN, {unique_id: unique_id}, body)
}

export const N_DELETEMahasiswa = async ( unique_id: any ) => {
    return await DELETE(APIADmIN.DOSEN.DELETE_DOSEN, { unique_id: unique_id } )
}
