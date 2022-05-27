import React from "react";

import { Switch, Route } from "react-router-dom";


import AddMhs from '../../pages/mahasiswa/addMhs';
import UpdateMhs from '../../pages/mahasiswa/updateMhs';

import Settings from "../../pages/settings/Settings";

import Berita from "../../pages/berita/Berita";
import Mahasiswa from "../../pages/mahasiswa/Mahasiswa";
import DashboardAdminPage from "../../pages/Dashboard";
import AdminPage from "../../pages/admin";


class NavbarRight extends React.Component<any, any> {
	render() {
		return (
			<Switch>
				<Route path={'/dashboard'} exact={true} component={DashboardAdminPage} />
				<Route path={'/dashboard/admin'} exact={true} component={AdminPage} />
				<Route path={`/dashboard/berita`} exact={true} component={Berita} />
				<Route path={`/dashboard/mahasiswa`} exact={true} component={Mahasiswa} />
				<Route path={`/dashboard/mahasiswa/add`} exact={true} component={AddMhs} />
				<Route path={`/dashboard/mahasiswa/update`} exact={true} component={UpdateMhs} />
				<Route path={`/dashboard/settings`} exact={true} component={Settings} />
			</Switch>
		);
	}
}

export default NavbarRight;
