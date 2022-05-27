import React, { Fragment } from "react";
// material ui
import { Avatar, Divider, Grid, Icon, IconButton, Menu, MenuItem } from "@mui/material";

// lib
import { is_auth } from "../../../lib/is_auth";

// redux
import { connect } from "react-redux";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SchoolIcon from "@mui/icons-material/School";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import SettingsIcon from "@mui/icons-material/Settings";
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';


import { getCookies, removeCookies } from "src/lib/cookie";
import { changeName, FormatName } from "src/lib/changeFormName";

import LogoStikom from "src/asset/image/logo Stikom.png";
import { Link, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/admin";
import Berita from "./pages/berita/Berita";
import Mahasiswa from "./pages/mahasiswa/Mahasiswa";
import addMhs from "./pages/mahasiswa/addMhs";
import updateMhs from "./pages/mahasiswa/updateMhs";
import Settings from "./pages/settings/Settings";

class BaseDashboardAdmin extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      uri: this.props.match,
      anchorEl: null
    };
  }

  changeDeviceWidth = () => {
    let nav = document.getElementById("nav_dashboard");
    let height = window.innerHeight;
    let width = window.innerWidth;

    console.log(width);

    if (width < 600) {
      this.setState({ isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  };

  async componentDidMount() {
    let isAuth = await is_auth();
    isAuth ? console.log("user loggend") : this.props.history.push("/");
    this.changeDeviceWidth();
    window.addEventListener("resize", this.changeDeviceWidth);
  }

  render() {
    const MenuList = [
      {
        label: "Dashboard",
        icon: <DashboardIcon sx={{ width: 25, height: 25 }} />,
        link: "/dashboard",
      },
      {
        label: 'Admin',
        icon: <SupervisorAccountIcon sx={{ width: 25, height: 25 }} />,
        link: '/dashboard/admin'
      },
      {
        label: "Berita",
        icon: <NewspaperIcon sx={{ width: 25, height: 25 }} />,
        link: "/dashboard/berita",
      },
      {
        label: "Mahasiswa",
        icon: <SchoolIcon sx={{ width: 25, height: 25 }} />,
        link: "/dashboard/mahasiswa",
      },
      {
        label: "Dosen",
        icon: <CastForEducationIcon sx={{ width: 25, height: 25 }} />,
        link: "/dashboard/dosen",
      },
      {
        label: "Setting",
        icon: <SettingsIcon sx={{ width: 25, height: 25 }} />,
        link: "/dashboard/settings",
      },
    ];

    const open = Boolean(this.state.anchorEl);
    
    const HandleClickPopup = (event: any) => {
      this.setState({ ...this.state, anchorEl: event.currentTarget })
    };

    const HandleClosePopup = () => {
      this.setState({ ...this.state, anchorEl: null })
    };

    const Logout = () => {
      removeCookies('auth-token');
      removeCookies('user');
      window.location.href = '/'
    }

    return (
      <div className="grid grid-cols-12">
        <div className="col-span-2 min-h-screen bg-gray-800">
          <div className="p-2 flex items-center space-x-2 mb-5">
            <Avatar sx={{ width: 50, height: 50 }}>
              <PersonRoundedIcon sx={{ fontSize: 50 }} />
            </Avatar>
            <div>
              <p className="font-medium text-white">
                {FormatName(getCookies("user"))}
              </p>
            </div>
          </div>

          <Divider />

          <div className="space-y-1 border-t">
            {MenuList.map((item, idx) => (
              <Link
                to={item.link + ""}
                className="flex items-center p-2 space-x-2 hover:bg-blue-400 text-gray-100 font-medium cursor-pointer"
              >
                {item.icon}
                <p>{item.label}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="col-span-10">
          <div className="w-full flex items-center justify-between bg-blue-500 h-14">
            <div className="flex items-center px-2">
              <img src={LogoStikom} className="w-12" />
              <div className="space-y-0.5">
                <h4
                  className="text-sm font-bold p-0.5"
                  style={{ color: "red", backgroundColor: "rgb(0,0,0,0.5)" }}
                >
                  Sekolah Tinggi Ilmu Komputer
                </h4>
                <h4
                  className="text-blue-400 text-sm font-bold p-0.5 text-blue-100"
                  style={{ backgroundColor: "rgb(0,0,0,0.5)" }}
                >
                  Cipta Karya Informatika Kampus.D
                </h4>
              </div>
            </div>
            <div className="flex items-center space-x-3 px-2 cursor-pointer">
              <p className="text-white underline">
                {FormatName(getCookies("user"))}
              </p>
              <IconButton
                onClick={HandleClickPopup}
              >
                <Avatar sx={{ width: 30, height: 30 }}>
                  <PersonRoundedIcon sx={{ fontSize: 30 }} />
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={this.state.anchorEl}
                id="account-menu"
                open={open}
                onClose={HandleClosePopup}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={Logout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </div>
          <RoutePage />
        </div>
      </div>
    );
  }
}

const RoutePage = () => {
  return (
    <Switch>
				<Route path={'/dashboard'} exact={true} component={Dashboard} />
				<Route path={'/dashboard/admin'} exact={true} component={AdminPage} />
				<Route path={`/dashboard/berita`} exact={true} component={Berita} />
				<Route path={`/dashboard/mahasiswa`} exact={true} component={Mahasiswa} />
				<Route path={`/dashboard/mahasiswa/add`} exact={true} component={addMhs} />
				<Route path={`/dashboard/mahasiswa/update`} exact={true} component={updateMhs} />
				<Route path={`/dashboard/settings`} exact={true} component={Settings} />
			</Switch>
  )
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(BaseDashboardAdmin);
