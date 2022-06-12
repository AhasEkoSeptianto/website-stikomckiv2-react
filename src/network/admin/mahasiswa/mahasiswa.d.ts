export type I_GETMahasiswa = {
    page: number
    limit: number
}

export type I_POSTMahasiswa = {
    name: string
    nim: string
    jurusan: string
    semester: string | number,
    kelas: number,
    alamat: string,
    notelp: any,
    tahun_ajaran: string,
}