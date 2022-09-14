import React, { useState } from "react";

// css
import s from "./../../../../asset/css/admin/dashboard/Dashboard.module.css";

// react material ui
import { Grid, Card } from "@mui/material";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { connect } from "react-redux";
import MyChart from "./cartjs/chart";
import { SiGooglescholar } from "react-icons/si";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiAdminLine, RiMapPinUserFill } from "react-icons/ri";
import { GrFormNextLink } from 'react-icons/gr'
import useSWR from "swr";
import { N_GETVisitor } from "src/network/admin/common";
import { N_GetListMahasiswa } from "src/network/admin/mahasiswa";
import { N_GETDosen } from "src/network/admin/dosen";
import { N_GetListAdmin } from "src/network/admin/admin";
import { Link, Route, Switch } from "react-router-dom";
import { GET } from "src/lib/axios";
import { Table } from "antd";
import TableAdmin from "src/component/molecules/admin/table";

const DashboardPage = () => {

	const { data: Visitor } = useSWR('api/getVisitor', N_GETVisitor)
	const { data: Mhs }  = useSWR('api/mahasiswa', N_GetListMahasiswa)
	const { data: Dosen } = useSWR('api/dosen', N_GETDosen)
	const { data: Admin } = useSWR('api/admin', N_GetListAdmin)
	
  const listCardData = [
    { 
      title: "Mahasiswa", 
      subTitle: `Total ${Mhs?.data?.rows} Mahasiswa StikomCki`, 
      icon: <SiGooglescholar color='#423F3E' size="100%" />, 
      clickMore: 'mahasiswa'
    },
    { 
      title: "Dosen", 
      subTitle: `Total ${Dosen?.data?.rows} Dosen StikomCki`, 
      icon: <FaChalkboardTeacher color='#423F3E' size="100%" />,
      clickMore: 'dosen' 
    },
    { 
      title: "Administrator", 
      subTitle: `Total ${Admin?.data?.rows} Administrasi StikomCki`, 
      icon: <RiAdminLine color='#423F3E' size="100%" />,
      clickMore: 'admin'
    
    },
    { 
      title: "Visitor Web Stikom", 
      subTitle: `${Visitor?.data?.visitor} visitor page stikomcki`, 
      icon: <RiMapPinUserFill color='#423F3E' size="100%" />
    },
  ];

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <div className="grid grid-cols-4 gap-3">
          {listCardData.map((item, idx) => (
            <MyCardResume key={idx} icon={item.icon} title={item.title} subTitle={item.subTitle} clickMore={item.clickMore} />
          ))}
        </div>
      </div>
      <div className="col-span-8">
          <LatestArticle />
      </div>
      <div className="col-span-4"></div>
    </div>
  );
};

type I_MyCardResume = {
  icon: any;
  title: string;
  subTitle?: any,
  clickMore?: any
};

const MyCardResume = (props: I_MyCardResume) => {
  const { icon, title, subTitle, clickMore } = props;

  return (
    <Card className="p-2 relative">
      <div className="w-12 h-12 text-gray-800 mb-5">{icon}</div>
      <p className="font-bold text-lg">{title}</p>
	    <p className="text-sm">{subTitle}</p>
      
      {clickMore && (
        <Link to={`/dashboard/${clickMore}`}>
          <div className="absolute top-0 right-0 flex items-center mr-2 cursor-pointer">
            <p className="text-blue-800">more</p>
            <GrFormNextLink size={20} color='#39A2DB' />
          </div>
        </Link>
      )}
    </Card>
  );
};

const LatestArticle = () => {

  const [ params, setParams ] = useState({
    page: 1,
    limit: 5
  })

  const fetching = async () => {
    return GET(`api/broadcast/allData`,{})
  }

  const { data, error } = useSWR(`/api/broadcast/allData`, fetching)
  console.log(data)
  const columns = [
    {
      label: 'Title',
      key: 'title'
    },
    {
      label: 'Content',
      key: 'content'
    }
  ]

  return (
    <div className="mt-10 bg-white p-3 shadow">
      <Link to='/dashboard/berita'>
        <p className="font-bold italic underline mb-5">Latest Articles</p>
      </Link>
      <TableAdmin
        column={columns}
        data={data?.data?.data}
        pagination={{
          page: params.page,
          limit: params.limit,
          onPageChange: (page) => console.log(page),
          onLimitChange: (limit) => console.log(limit),
          totalData: data?.data?.totalData,
        }}
      />
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeNav: (nav: any) =>
      dispatch({ type: "change_navDashboard", nav: nav }),
  };
};

export default connect(null, mapDispatchToProps)(DashboardPage);
