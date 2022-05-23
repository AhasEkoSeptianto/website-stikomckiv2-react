import React, { Fragment } from "react";

// icons material-ui
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";

// material ui
import { Container, Grid } from "@mui/material";

// mycss
import styles from "./Header.module.css";

// link
import { Link } from "react-router-dom";

// lib
import { is_auth } from './../../lib/is_auth';
import { removeCookies, getAllCookies } from './../../lib/cookie';

class Header extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			isAuth: false,
			isLoading: true,
			popMenu: null
		}
	}

	logout = () => {
		removeCookies('user')
		removeCookies('auth-token')
		window.location.reload()
	}

	async componentDidMount(){
		let isLogged = await is_auth();
		this.setState({isAuth: isLogged, isLoading:false});
	}

	render() {

		const { isAuth, popMenu } = this.state

		return (
			<Fragment>
				<div className="bg-gray-100 border-b py-1">
					<Container>
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-7">
								<div className="flex items-center space-x-1">
									<AddIcCallIcon className="text-gray-500" style={{ fontSize: 16 }} />
									<p className='text-gray-600 font-bold text-xs'>
										+62-235-6789
									</p>
								</div>
								<div className="flex items-center space-x-1">
									<EmailIcon className="text-gray-500" style={{ fontSize: 16 }} />
									<p className='text-gray-600 font-bold text-xs'>
										stikomckid@gmail.ac.id
									</p>
								</div>
							</div>
							<div className='flex items-center'>
								<AccountCircleIcon className='text-gray-500 cursor-pointer' style={{ fontSize: '30px' }}   />
								{/* {isAuth ? (
									<Fragment>
										<Link className={styles.container_login} to="/dashboard">
											<p className={styles.p_login}>Dashboard</p>
											<DashboardIcon />
										</Link>
										<div
											className={styles.container_logout}
											onClick={this.logout}
										>
											<p className={styles.p_login}>Logout</p>
											<AccountCircleIcon />
										</div>
									</Fragment>
								) : (
									<Link className='flex items-center text-gray-500' to="/login">
										<p className='text-sm font-bold '>Login</p>
										<AccountCircleIcon  />
									</Link>
								)} */}
							</div>
						</div>
					</Container>
				</div>

				
			</Fragment>
		);
	}
}


export default Header;
