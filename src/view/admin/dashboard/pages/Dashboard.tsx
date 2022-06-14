import React from "react";

// css
import s from "./../../../../asset/css/admin/dashboard/Dashboard.module.css";


// react material ui
import { Grid, Card } from '@mui/material'; 

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


import { connect } from 'react-redux';
import { get, post } from "src/lib/axios";
import MyChart from "./cartjs/chart";

class DashboardPage extends React.Component<any, any> {

	constructor(props: any){
		super(props);
		this.state = {
			date: new Date(),
			visitor: 0,
			mahasiswa: 0,
		}
	}


	async componentDidMount(){

		this.props.changeNav(this.props.location.pathname);
		

		let Visitor: any = await get(`${process.env.REACT_APP_ENP_BE}api/getvisitor`);
		this.setState({visitor: Visitor.data.visitor});

		let Mahasiswa = await post(`${process.env.REACT_APP_ENP_BE}api/mahasiswa`, { skip: 0 });
		this.setState({mahasiswa: Mahasiswa.data.allMhs.length });

	}

	render() {

		return (
			<div>

			</div>
		);
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		changeNav : (nav: any) => dispatch({type:'change_navDashboard', nav:nav}),
	}
}

export default connect(null, mapDispatchToProps)(DashboardPage);
