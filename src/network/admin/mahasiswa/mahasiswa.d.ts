export type I_GETMahasiswa = {
    page: number
    limit: number
}

export type I_POSTMahasiswa = {
    name: string
    email: string
    phoneNumber: any
    role: string
}