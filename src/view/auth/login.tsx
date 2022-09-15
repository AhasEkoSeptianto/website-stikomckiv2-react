import React, { Fragment } from "react";

// mycss;
import s from "./login.module.css";

// logo stikom
import Logo from "./../../asset/image/logo Stikom.png";

// icon material
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';

// router
import { connect } from "react-redux";

// Cookie
import Cookies from "universal-cookie";

// lib
import { post } from "../../lib/axios";
import { is_auth } from "../../lib/is_auth";
import { setCookies } from "../../lib/cookie";
import { Alert, Button, IconButton } from "@mui/material";

function TransitionDown(props: any) {
	return <Slide {...props} direction="down" />;
  }

  

class login extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
        isLoading: false,
      openSnackbar: false,
      transition: TransitionDown,
      form: {
        username: '',
        password: ''
      }
    };
  }

  submitForm = async (e: any) => {
    e.preventDefault()
    this.setState({ isLoading: true });
    			await post(`${process.env.REACT_APP_ENP_BE}api/login`, this.state.form)
            .then(res => {
              console.log(res)
              setCookies('user', res.data.name);
              setCookies('auth-token', res.data.token);
              // this.props.history.push('/dashboard');
              window.location.href = '/dashboard'
            }).catch(err => {
              console.log(err)
            })

    this.setState({ isLoading: false });
  };

  componentDidMount() {
    // alert("gunakan akun\nusername: admin\npassword: admin");
	this.setState({ ...this.state, openSnackbar: true })
  }

  render() {

	const { openSnackbar } = this.state

    const HandleChangeForm = (e: any) => {
      this.setState({ ...this.state, form: { ...this.state.form, [e.target.name]: e.target.value } })
    }
    console.log(this.state.form)
    return (
      <div className={s.bg}>

        <Snackbar
          open={openSnackbar}
          onClose={() => this.setState({ ...this.state, openSnackbar: false })}
          autoHideDuration={5000}
          
        >
           <Alert severity="info">
             <p>gunakan akun</p>
             <p>username: admin</p>
             <p>password: admin</p>
           </Alert>
        </Snackbar>

        <form className={s.container_login} onSubmit={this.submitForm}>
          <div className={s.header_login}>
            <img alt="logo" src={Logo} className={`${s.img_logo} mx-auto`} />
            <p className={s.text_stikom}>StikomCKI.D</p>
          </div>
          <div className={s.container_wrong_pass} id="wrong_user&pass">
            <p className={s.text_wrong_pass}>
              &sdot; Login gagal, mohon periksa kembali username dan password
              yang digunakan
            </p>
          </div>

          {/* form */}
          <div className={s.form}>
            <div className={s.username} id="username">
              <AccountCircleRoundedIcon className={s.logo_login} />
              <input
                id="username_login"
                type="text"
                name="username"
                placeholder="username"
                className={`${s.form_user} outline-none`}
                onChange={HandleChangeForm}
                required
              />
            </div>
            <div className={s.password} id="password">
              <LockOutlinedIcon className={s.logo_login} />
              <input
                id="password_login"
                type="password"
                name="password"
                placeholder="password"
                className={`${s.form_user} outline-none`}
                onChange={HandleChangeForm}
                required
              />
            </div>
            <button className={s.button} type='submit'>
              Login{" "}
              {this.state.isLoading === true ? (
                <Fragment>
                  <p>..</p>
                  <CircularProgress
                    style={{ marginLeft: 10 }}
                    size={15}
                    color="inherit"
                    disableShrink
                  />
                </Fragment>
              ) : null}
            </button>
          </div>
          {/* end form */}
        </form>
      </div>
    );
  }
}

export default login;
