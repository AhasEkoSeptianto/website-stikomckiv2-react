import { Skeleton } from '@mui/material';
import Stack from '@mui/material/Stack';

export default function LoadingTable(){
    return (
        <Stack spacing={1}>
            <Skeleton variant='rectangular' height={60} />
            <Skeleton variant='rectangular' height={30} />
            <Skeleton variant='rectangular' height={30} />
            <Skeleton variant='rectangular' height={30} />
            <Skeleton variant='rectangular' height={30} />
            <Skeleton variant='rectangular' height={30} />
        </Stack>
    )
}