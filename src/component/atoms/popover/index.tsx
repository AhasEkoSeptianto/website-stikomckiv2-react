import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';

type I_Popover = {
    label: any,
    content: any
}
export default function Popover(props: I_Popover) {
    const { label, content } = props 
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div className='h-full w-full'>
      <button aria-describedby={id} type="button" className='w-full h-full' onClick={handleClick}>
        {label}
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        {content}
      </Popper>
    </div>
  );
}