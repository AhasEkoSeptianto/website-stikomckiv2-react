export type I_GETDosen = {
    page: number
    limit: number
}

export type I_POSTDosen = {
    name: string
    nim: string
    jurusan: string
    semester: string | number,
    kelas: number,
    alamat: string,
    notelp: any,
    tahun_ajaran: string,
}