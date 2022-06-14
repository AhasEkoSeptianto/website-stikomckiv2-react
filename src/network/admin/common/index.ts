import { GET } from "src/lib/axios"
import APIADmIN from "../API"

export const N_GETVisitor = async () => {
    return await GET(APIADmIN.COMMON.GET_VISITOR, {})
}