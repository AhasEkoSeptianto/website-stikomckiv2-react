import { GET } from "src/lib/axios"
import APIADmIN from "../API"
import { I_GETAdmin } from "./admin"

export const N_GetListAdmin = async ( params: I_GETAdmin ) => {
    return await GET(APIADmIN.ADMIN.LIST, params)
}