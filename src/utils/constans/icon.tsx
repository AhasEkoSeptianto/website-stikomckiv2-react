import { IconButton } from '@mui/material'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

type I_ActionTable = {
    onClick?: any,
    className?: string
}

export const EditTableIcon = ({onClick, className} : I_ActionTable) => (
    <IconButton>
        <AiFillEdit size='100%' className={`w-6 h-6 text-blue-500 cursor-pointer ${className}`} onClick={onClick} />
    </IconButton>
)


export const DeleteTableIcon = ({ onClick, className } : I_ActionTable) => (
    <IconButton>
        <AiFillDelete size='100%' className={`w-6 h-6 text-red-500 cursor-pointer ${className}`} onClick={onClick} />
    </IconButton>
)