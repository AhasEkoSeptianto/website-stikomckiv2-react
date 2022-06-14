import React, { useEffect } from "react";

// css
import s from "./../../../../asset/css/admin/dashboard/Dashboard.module.css";

// react material ui
import { Grid, Card } from "@mui/material";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { connect } from "react-redux";
import { get, post } from "src/lib/axios";
import MyChart from "./cartjs/chart";
import { SiGooglescholar } from "react-icons/si";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiAdminLine, RiMapPinUserFill } from "react-icons/ri";
import useSWR from "swr";
import { N_GETVisitor } from "src/network/admin/common";
import { N_GetListMahasiswa } from "src/network/admin/mahasiswa";
import { N_GETDosen } from "src/network/admin/dosen";
import { N_GetListAdmin } from "src/network/admin/admin";

const DashboardPage = () => {

	const { data: Visitor } = useSWR('api/getVisitor', N_GETVisitor)
	const { data: Mhs }  = useSWR('api/mahasiswa', N_GetListMahasiswa)
	const { data: Dosen } = useSWR('api/dosen', N_GETDosen)
	const { data: Admin } = useSWR('api/admin', N_GetListAdmin)
	
  const listCardData = [
    { title: "Mahasiswa", subTitle: `Total ${Mhs?.data?.rows} Mahasiswa StikomCki`, icon: <SiGooglescholar size="100%" /> },
    { title: "Dosen", subTitle: `Total ${Dosen?.data?.rows} Dosen StikomCki`, icon: <FaChalkboardTeacher size="100%" /> },
    { title: "Administrator", subTitle: `Total ${Admin?.data?.rows} Administrasi StikomCki`, icon: <RiAdminLine size="100%" /> },
    { title: "Visitor Web Stikom", subTitle: `${Visitor?.data?.visitor} visitor page stikomcki`, icon: <RiMapPinUserFill size="100%" /> },
  ];

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8">
        <div className="grid grid-cols-4 gap-3">
          {listCardData.map((item, idx) => (
            <MyCardResume key={idx} icon={item.icon} title={item.title} subTitle={item.subTitle} />
          ))}
        </div>
      </div>
      <div className="col-span-4"></div>
    </div>
  );
};

type I_MyCardResume = {
  icon: any;
  title: string;
  subTitle?: any,
};

const MyCardResume = (props: I_MyCardResume) => {
  const { icon, title, subTitle } = props;

  return (
    <Card className="p-2 ">
      <div className="w-12 h-12 text-gray-800 mb-5">{icon}</div>
      <p className="font-bold text-lg">{title}</p>
	  <p className="text-sm">{subTitle}</p>
    </Card>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeNav: (nav: any) =>
      dispatch({ type: "change_navDashboard", nav: nav }),
  };
};

export default connect(null, mapDispatchToProps)(DashboardPage);
