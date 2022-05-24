import React from "react";

// react-router-dom
import { Route, Switch } from "react-router-dom";

// pages
import Home from "./view/pages/Home";
import Visi_misi_perguruan_tinggi from "./view/pages/visi_misi_perguruan_tinggi";
import Tujuan_perguruan_tinggi from "./view/pages/tujuan_perguruan_tinggi";
import Kalender_akademik from "./view/pages/kalender_akademik";
import Visi_misi_TI from "./view/pages/visi_misi_TI";
import Tujuan_prodi_TI from "./view/pages/tujuan_prodi_TI";
import Daftar_matakuliah_TI from "./view/pages/daftar_matakuliah_TI";
import Visi_misi_SI from "./view/pages/visi_misi_SI";
import Tujuan_prodi_SI from "./view/pages/tujuan_prodi_SI";
import Daftar_matakuliah_SI from "./view/pages/daftar_matakuliah_SI";

// login page
import Login from "./view/auth/login";
import DashboardAdmin from "./view/admin/dashboard/DashboardAdmin";

class Router extends React.Component {

	render() {
		return (
			<Switch>
				<Route path="/dashboard" component={DashboardAdmin} />
				<Route path="/login" component={Login} />
				<Route
					path="/daftar-matakuliah-SI"
					component={Daftar_matakuliah_SI}
				/>
				<Route path="/tujuan-prodi-SI" component={Tujuan_prodi_SI} />
				<Route path="/visi-misi-SI" component={Visi_misi_SI} />
				<Route
					path="/tujuan-perguruan-tinggi"
					component={Tujuan_perguruan_tinggi}
				/>
				<Route
					path="/visi-misi-perguruan-tinggi"
					component={Visi_misi_perguruan_tinggi}
				/>
				<Route
					path="/kalender-akademik"
					component={Kalender_akademik}
				/>
				<Route path="/visi-misi-TI" component={Visi_misi_TI} />
				<Route path="/tujuan-prodi-TI" component={Tujuan_prodi_TI} />
				<Route
					path="/daftar-matakuliah-TI"
					component={Daftar_matakuliah_TI}
				/>
				<Route path="/" component={Home} />
			</Switch>
		);
	}
}

export default Router;
