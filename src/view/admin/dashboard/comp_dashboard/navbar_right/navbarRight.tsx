import React from "react";

import { Switch, Route } from "react-router-dom";


import AddMhs from '../../pages/mahasiswa/addMhs';
import UpdateMhs from '../../pages/mahasiswa/updateMhs';

import Settings from "../../pages/settings/Settings";
import DashboardAdmin from "../../DashboardAdmin";
import Berita from "../../pages/berita/Berita";
import Mahasiswa from "../../pages/mahasiswa/Mahasiswa";


class NavbarRight extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			url: this.props.uri,
		};
	}
	render() {
		return (
			<Switch>
				<Route path={this.state.url.path} exact={true} component={DashboardAdmin} />
				<Route path={`${this.state.url.path}/berita`} exact={true} component={Berita} />
				<Route path={`${this.state.url.path}/mahasiswa`} exact={true} component={Mahasiswa} />
				<Route path={`${this.state.url.path}/mahasiswa/add`} exact={true} component={AddMhs} />
				<Route path={`${this.state.url.path}/mahasiswa/update`} exact={true} component={UpdateMhs} />
				<Route path={`${this.state.url.path}/settings`} exact={true} component={Settings} />
			</Switch>
		);
	}
}

export default NavbarRight;
