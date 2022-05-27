import { Breadcrumbs } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';

export default function AdminBreadCrumbs() {

    
    const location = useLocation()
    const url = location?.pathname?.split('/')
    url.splice(url.indexOf(''),1)
    
    const GetRoute = (pos_idxRoute: number) => {
        let route = ''

        for (let i=0; i<=pos_idxRoute; i++){
            route = route + `/${url[i]}`
        }
        return route
    }

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        
        <Link to='/dashboard'>
            <HomeIcon fontSize='small' className='cursor-pointer' />
        </Link>
        
        {url?.map((item: any, idx: any) => (
            <Link key={idx} to={GetRoute(idx)}>
                <p>{item}</p>
            </Link>
        ))}

      </Breadcrumbs>
    </div>
  );
}
