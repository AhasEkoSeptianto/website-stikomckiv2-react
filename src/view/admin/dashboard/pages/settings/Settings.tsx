import React from "react";

import styles from "./../../../../../asset/css/admin/dashboard/pages/settings.module.css";

// comp form
import ChangeName from './form_setting/changeName';
import ChangeAccount from './form_setting/changeAccount';

import { connect } from 'react-redux';
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

class Settings extends React.Component<any, any> {

	Exit = () => {
		this.props.history.push("/");
	}

	componentDidMount(){
		this.props.changeNav(this.props.location.pathname);
	}

	render() {

		const listSetting = [
			{
				label: 'Profile',
				params: 'profile',
				comp: <ChangeName />
			},
			{
				label: 'Account',
				params: 'account',
				comp: <ChangeAccount />
			}
		]

		const queryParams = new URLSearchParams(this.props.location.search)
		let tab = queryParams.get('tab')
		
		if (!tab){
			tab = listSetting[0].params
		}

		return (
			// <div className={styles.body}>

			// 	<h1 className={styles.titleHead}>Setting</h1>
			// 	<div className='space-y-5'>
			// 		{/* settings profile */}
			// 		<div className="bg-white p-3">
			// 			<p className={styles.titleSetting}>Profile</p>
			// 			<ChangeName />
			// 		</div>

			// 		<div className='bg-white p-3'>
			// 			<p className={styles.titleSetting}>Account</p>
			// 			<ChangeAccount />
			// 		</div>
			// 	</div>

			// 	<button className={styles.buttonLogout} onClick={this.Exit}>Exit</button>

			// </div>
			<div className="grid grid-cols-12 gap-10">
				<div className="col-span-3">
					<div className="bg-white shadow rounded">
						<p className='p-3 text-lg font-semibold bg-gray-700 text-white'>Settings</p>
						<Divider />
						<div style={{ minHeight: 200 }}>
							{listSetting.map((item, idx) => (
								<Link to={`/dashboard/settings?tab=${item.params}`}>
									<p className={`px-5 py-2 hover:bg-gray-300 cursor-pointer font-normal ${item.params === tab ? 'bg-gray-300' : ''}`} key={idx}>{item.label}</p>
									<Divider />
								</Link>
							))}
						</div>
					</div>
				</div>
				<div className='col-span-9 space-y-5'>
					<div className="bg-white p-3">
						<p className={styles.titleSetting}>{tab?.toUpperCase()}</p>
						{listSetting.filter(item => item.params === tab)?.[0].comp}
					</div>
			 	</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		changeNav : (nav: any) => dispatch({type:'change_navDashboard', nav:nav}),
	}
}

export default connect(null, mapDispatchToProps)(Settings);
