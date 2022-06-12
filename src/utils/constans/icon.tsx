import { IconButton } from '@mui/material'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

type I_ActionTable = {
    onClick?: any,
    className?: string
}

export const EditTableIcon = ({onClick, className} : I_ActionTable) => (
    <IconButton onClick={onClick}>
        <AiFillEdit size='100%' className={`w-6 h-6 text-blue-500 cursor-pointer ${className}`} />
    </IconButton>
)


export const DeleteTableIcon = ({ onClick, className } : I_ActionTable) => (
    <IconButton onClick={onClick}>
        <AiFillDelete size='100%' className={`w-6 h-6 text-red-500 cursor-pointer ${className}`} />
    </IconButton>
)