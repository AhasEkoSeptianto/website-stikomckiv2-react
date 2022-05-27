
import { GET, POST, PUT, DELETE } from "src/lib/axios"
import APIADmIN from "../API"
import { I_GETAdmin, I_POSTAdmin } from "./admin"

export const N_GetListAdmin = async ( params: I_GETAdmin ) => {
    return await GET(APIADmIN.ADMIN.LIST, params)
}

export const N_AddAdmin = async ( body: I_POSTAdmin ) => {
    return await POST(APIADmIN.ADMIN.ADD_ADMIN, body)
}

export const N_EditAdmin = async ( body: I_POSTAdmin, unique_id: any ) => {
    return await PUT(APIADmIN.ADMIN.EDIT_ADMIN, {unique_id: unique_id}, body)
}

export const N_DeleteAdmin = async ( unique_id: any ) => {
    return await DELETE(APIADmIN.ADMIN.DELETE_ADMIN, { unique_id: unique_id } )
}
