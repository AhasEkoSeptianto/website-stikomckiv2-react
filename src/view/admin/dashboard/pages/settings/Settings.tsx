import React from "react";

import styles from "./../../../../../asset/css/admin/dashboard/pages/settings.module.css";

// comp form
import ChangeName from './form_setting/changeName';
import ChangeAccount from './form_setting/changeAccount';

import { connect } from 'react-redux';

class Settings extends React.Component<any, any> {

	Exit = () => {
		this.props.history.push("/");
	}

	componentDidMount(){
		this.props.changeNav(this.props.location.pathname);
	}

	render() {
		return (
			<div className={styles.body}>

				<h1 className={styles.titleHead}>Setting</h1>
				<div className='space-y-5'>
					{/* settings profile */}
					<div className="bg-white p-3">
						<p className={styles.titleSetting}>Profile</p>
						<ChangeName />
					</div>

					<div className='bg-white p-3'>
						<p className={styles.titleSetting}>Account</p>
						<ChangeAccount />
					</div>
				</div>

				<button className={styles.buttonLogout} onClick={this.Exit}>Exit</button>

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
