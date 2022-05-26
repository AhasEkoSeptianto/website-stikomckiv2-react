import React from "react";

import s from "./footer.module.css";

// material-ui
import { Grid, TextField, Button, TextareaAutosize } from "@mui/material";

// axios
import Axios from "axios";

import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";

class Footer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
	this.state = {
		contactUsForm: {
			name: '',
			email: '',
			message: ''
		}
	}
  }

  handleSubmit(event: any) {
    event.preventDefault();
    console.log("yep");
    Axios.post("https://website-stikomcki.herokuapp.com/call-us", this.state.contactUsForm, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        alert("msg sucees");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {

	const { contactUsForm } = this.state

	const HandleChangeForm = (e: any) => {
		this.setState({ contactUsForm: { ...contactUsForm, [e.target.name]: e.target.value } })
	}

	console.log(contactUsForm)

    return (
      <div className={s.footerContainer}>
        <Grid container spacing={0}>
          <Grid item sm={2}>
            <div className={s.container_footer_inside}>
              <p>Alamat kami :</p>
              <p className={s.alamat}>
                Jl.Taman Harapan Baru, RT.008/RW 023, Pejuang, Kecamatan Medan
                Satria, Kota Bekasi, Jawa Barat 17175 , Telp.0211234567
              </p>
            </div>
          </Grid>
          <Grid item sm={2}>
            <div className={s.container_footer_inside}>
              <p>Link Cepat</p>
            </div>
            <div className={s.link_Cepat}>
              <ul>
                <li className={s.li_linesremove}>
                  <a href="/" className={s.li_link_cepat}>
                    Home
                  </a>
                </li>
                <li className={s.li_linesremove}>
                  <a href="/tujuan-prodi-TI" className={s.li_link_cepat}>
                    Program Studi TI
                  </a>
                </li>
                <li className={s.li_linesremove}>
                  <a href="/tujuan-prodi-SI" className={s.li_link_cepat}>
                    Program Studi SI
                  </a>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item sm={2}>
            <div className={s.container_footer_inside}>
              <p>Kunjungi juga</p>
            </div>
            <div className={s.link_Cepat}>
              <ul>
                <li className={s.li_linesremove}>
                  <a href="/" className={s.li_link_cepat}>
                    Home
                  </a>
                </li>
                <li className={s.li_linesremove}>
                  <a
                    href="https://www.banpt.or.id/"
                    target="_blank"
                    rel="noreferrer"
                    className={s.li_link_cepat}
                  >
                    Ban PT AKREDITASI
                  </a>
                </li>
                <li className={s.li_linesremove}>
                  <a
                    href="https://www.kemdikbud.go.id"
                    target="_blank"
                    rel="noreferrer"
                    className={s.li_link_cepat}
                  >
                    Kemdikbuk
                  </a>
                </li>
                <li className={s.li_linesremove}>
                  <a
                    href="https://forlap.ristekdikti.go.id/"
                    target="_blank"
                    rel="noreferrer"
                    className={s.li_link_cepat}
                  >
                    Informasi Pendidikan Nasional
                  </a>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item sm={6}>
            <div className={s.container_footer_inside}>
              <p>Hubungi Kami</p>
              <form
                className={s.name_and_email_form}
                onSubmit={this.handleSubmit}
                autoComplete="off"
              >
                <div className={s.name_form}>
                  <div className={s.name}>
                    <AccountCircle className={s.iconsName} />
                    <TextField
                      id="name"
                      name="name"
                      label="Name"
                      variant="standard"
                      required
					  onChange={HandleChangeForm}
                    />
                  </div>
                  <div className={s.email}>
                    <EmailRoundedIcon className={s.iconsEmail} />
                    <TextField
                      id="email"
                      label="Email"
                      type="email"
                      name="email"
                      variant="standard"
					  onChange={HandleChangeForm}
                      required
                    />
                  </div>
                </div>
                <div className={s.msg_form}>
                  <CreateRoundedIcon />
                  <TextareaAutosize
                    id="msg"
                    name="message"
                    className={`${s.textarea_form} border border-gray-400`}
                    placeholder="massage"
                    maxRows={4}
                    minRows={4}
					onChange={HandleChangeForm}
                    required
                  ></TextareaAutosize>
                </div>
                <div className={s.button_form}>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    type="submit"
                  >
                    send
                  </Button>
                </div>
              </form>
            </div>
          </Grid>
        </Grid>
        <div>
          <p className={s.copyright_container}>Copyright &copy; STIKOMCKI_D</p>
        </div>
      </div>
    );
  }
}

export default Footer;
