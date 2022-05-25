import React, { Fragment } from "react";

// icons material-ui
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// material ui
import { Menu, MenuItem } from "@mui/material";

// link
import { Link } from "react-router-dom";

// lib
import { is_auth } from "../../lib/is_auth";
import { removeCookies } from "../../lib/cookie";

import IconButton from "@mui/material/IconButton";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from '../atoms/button/index'
import DashboardIcon from "@mui/icons-material/Dashboard";

class Header extends React.Component<any, any>{
  constructor(props: any) {
    super(props);
    this.state = {
      isAuth: false,
      isLoading: true,
      popMenu: null,
    };
  }

  logout = () => {
    removeCookies("user");
    removeCookies("auth-token");
    window.location.reload();
  };

  async componentDidMount() {
    let isLogged = await is_auth();
    this.setState({ isAuth: isLogged, isLoading: false });
  }

  render() {
    const { isAuth, popMenu } = this.state;

    const handleClose = () => {
      this.setState({ ...this.state, popMenu: null });
    };

    return (
      <Fragment>
        <div className="bg-gray-100 border-b py-1">
          <div className="flex items-center justify-between container mx-auto">
            <div className="flex items-center space-x-7">
              
              <div className="flex items-center space-x-1">
                <AddIcCallIcon
                  className="text-gray-500"
                  style={{ fontSize: 16 }}
                />
                <p className="text-gray-600 font-bold text-xs">+62-235-6789</p>
              </div>
              <div className="flex items-center space-x-1">
                <EmailIcon className="text-gray-500" style={{ fontSize: 16 }} />
                <p className="text-gray-600 font-bold text-xs">
                  stikomckid@gmail.ac.id
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <IconButton
                onClick={(e) =>
                  this.setState({ ...this.state, popMenu: e.currentTarget })
                }
                size="small"
                sx={{ ml: 2 }}
                aria-controls={Boolean(popMenu) ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(popMenu) ? "true" : undefined}
              >
                {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}
                <AccountCircleIcon
                  sx={{ width: 32, height: 32 }}
                  className="text-gray-500 cursor-pointer"
                />
              </IconButton>

              <Menu
                anchorEl={popMenu}
                id="account-menu"
                open={Boolean(popMenu)}
                onClose={handleClose}
                onClick={handleClose}
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
                {isAuth ? (
                  <Fragment>
                    <MenuItem>
                      <Link to="/dashboard">
                        <DashboardIcon
                          className="mr-3"
                          sx={{ width: 20, height: 20 }}
                        />
                        <span>Admin Dashboard</span>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <LogoutIcon
                        className="mr-3"
                        sx={{ width: 20, height: 20 }}
                      />
                      <span>Logout</span>
                    </MenuItem>
                  </Fragment>
                ) : (
                  <MenuItem>
                    <Link to="/login">
                      <LoginIcon
                        className="mr-3"
                        sx={{ width: 20, height: 20 }}
                      />
                      <span>Login</span>
                    </Link>
                  </MenuItem>
                )}
              </Menu>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Header;
