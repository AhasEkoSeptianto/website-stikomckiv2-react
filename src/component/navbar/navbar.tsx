import React, { Fragment, useState } from "react";

// components

// asset image
import logoNav from "./../../asset/image/logo Stikom.jpeg";

// module react-router-dom haslink scroll animated
import { HashLink as Link } from "react-router-hash-link";

import { Button, Container, Grid, Menu, MenuItem } from "@mui/material";
import { TreeItem, TreeView } from "@mui/lab/";

// mycss
import styles from "./navbar.module.css";

// icons material-ui
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Header from "../header/Header";

function Navbar() {
  const [activeMenu, setActiveMenu] = useState<any>({
    "Perguruan Tinggi": false,
    "Program Study TI": false,
    "Program Study SI": false,
  });

  const dataNav = [
    {
      label: "Perguruan Tinggi",
      dropdown: [
        {
          label: "Visi Misi Perguruan Tinggi",
          link: "/visi-misi-perguruan-tinggi#main",
        },
        { label: "Kalender Akademik", link: "/kalender-akademik#main" },
        {
          label: "Tujuan Perguruan Tinggi",
          link: "/tujuan-perguruan-tinggi#main",
        },
        { label: "Berita Terbaru", link: "/berita-terbaru" },
        { label: "Pengumuman", link: "#" },
      ],
    },
    {
      label: "Program Study TI",
      dropdown: [
        { label: "Visi Misi TI", link: "/visi-misi-ti#main" },
        { label: "Tujuan Prodi TI", link: "/tujuan-prodi-ti#main" },
        { label: "Daftar Matakuliah TI", link: "/daftar-matakuliah-ti#main" },
      ],
    },
    {
      label: "Program Study SI",
      dropdown: [
        { label: "Visi Misi SI", link: "/visi-misi-si#main" },
        { label: "Tujuan Prodi SI", link: "/tujuan-prodi-si#main" },
        { label: "Daftar Matakuliah SI", link: "/daftar-matakuliah-si#main" },
      ],
    },
    { label: "Pendaftaran Mahasiswa Baru", link: "#" },
  ];

  return (
    <Fragment>
      <Header />
      <div className="container mx-auto flex items-center justify-between py-1">
        <Link to="/" className="flex items-center space-x-2">
          <Fragment>
            <img src={logoNav} className="w-16" />
            <div>
              <p className="font-bold text-red-500">
                Sekolah Tinggi Ilmu Komputer
              </p>
              <p className="font-bold text-blue-500">
                Cipta Karya informatika Kampus D
              </p>
            </div>
          </Fragment>
        </Link>

        <div className="flex items-center space-x-5">
          {dataNav.map((nav, idx) => (
            <div>
              <div
                className="flex items-center space-x-1 cursor-pointer"
                onMouseOver={(e) =>
                  setActiveMenu({ ...activeMenu, [nav.label]: true })
                }
                onMouseOut={(e) =>
                  setActiveMenu({ ...activeMenu, [nav.label]: false })
                }
              >
                <h3 className="text-lg ">{nav.label}</h3>
                {nav.dropdown && (
                  <KeyboardArrowDownIcon sx={{ width: 18, height: 18 }} />
                )}
              </div>
              <div className="relative h-0">
                <div
                  className={`absolute top-0 divide-y transition-height duration-300 ease-in-out ${
                    activeMenu[nav.label] ? "h-60" : "h-0"
                  } overflow-hidden  z-50 `}
                  onMouseOver={(e) =>
                    setActiveMenu({ ...activeMenu, [nav.label]: true })
                  }
                  onMouseOut={(e) =>
                    setActiveMenu({ ...activeMenu, [nav.label]: false })
                  }
                >
                  {nav.dropdown?.map((dropdown_item, idx) => (
                    <Link to={dropdown_item.link}>
                      <p
                        key={idx}
                        className="bg-white p-2 text-sm cursor-pointer hover:bg-gray-100"
                      >
                        {dropdown_item.label}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {/* <Button
            aria-controls={Boolean(anchorEl.perguruanTinggi) ? "nav_perguruanTinggi" : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl.perguruanTinggi) ? "true" : undefined}
            onClick={e => handleClick(e, 'perguruanTinggi')}
			endIcon={<KeyboardArrowDownIcon />}
		  >
            Dashboard
          </Button>
          <Menu
            id="nav_perguruanTinggi"
            anchorEl={anchorEl.perguruanTinggi}
            open={Boolean(anchorEl.perguruanTinggi)}
            onClose={() => handleClose('perguruanTinggi')}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleClose('perguruanTinggi')}>Profile</MenuItem>
            <MenuItem onClick={() => handleClose('perguruanTinggi')}>My account</MenuItem>
            <MenuItem onClick={() => handleClose('perguruanTinggi')}>Logout</MenuItem>
          </Menu> */}
          {/* <Button
            id="basic-button"
            aria-controls={
              Boolean(anchorEl.perguruanTinggi)
                ? "nav_perguruanTinggi"
                : undefined
            }
            aria-haspopup="true"
            aria-expanded={
              Boolean(anchorEl.perguruanTinggi) ? "true" : undefined
            }
            onClick={(e) =>
              setAnchorEl({ ...anchorEl, perguruanTinggi: e.currentTarget })
            }
          >
            Perguruan Tinggi
          </Button>
          <Menu
            id="nav_perguruanTinggi"
            anchorEl={anchorEl}
            open={Boolean(anchorEl.perguruanTinggi)}
            onClose={() => setAnchorEl({ ...anchorEl, perguruanTinggi: null })}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu> */}
        </div>
      </div>
    </Fragment>
  );
}

function Navbars() {
  // handle dropdown for dekstop mode
  const [open_A, setDropDown_A] = useState("none");

  const handleChangeDropDownPerkuliahan = () => {
    var togle = document.getElementById("toglePerguruan");
    // if (open_A === "none") {
    // 	togle.setAttribute("style", "display:block");
    // 	setDropDown_A("block");
    // } else if (open_A === "block") {
    // 	togle.setAttribute("style", "display:none");
    // 	setDropDown_A("none");
    // }
  };

  const [open_B, setDropDown_B] = useState("none");

  const handleChangeDropDownProgramTI = () => {
    var togle = document.getElementById("togleProgramTI");
    // if (open_B === "none") {
    // 	togle.setAttribute("style", "display:block");
    // 	setDropDown_B("block");
    // } else if (open_B === "block") {
    // 	togle.setAttribute("style", "display:none");
    // 	setDropDown_B("none");
    // }
  };

  const [open_C, setDropDown_C] = useState("none");

  const handleChangeDropDownProgramSI = () => {
    var togle = document.getElementById("togleProgramSI");
    // if (open_C === "none") {
    // 	togle.setAttribute("style", "display:block");
    // 	setDropDown_C("block");
    // } else if (open_C === "block") {
    // 	togle.setAttribute("style", "display:none");
    // 	setDropDown_C("none");
    // }
  };

  // handle togle pada mode mobile

  const [open_togle_mobile, set_togle_mobile] = useState("closed");

  const togle_button_hp = () => {
    let togle = document.getElementById("togle_mobile");
    // if (open_togle_mobile === "closed") {
    // 	togle.setAttribute("style", "display:block;");
    // 	set_togle_mobile("open");
    // } else if (open_togle_mobile === "open") {
    // 	togle.setAttribute("style", "display:none;");
    // 	set_togle_mobile("closed");
    // }
  };

  return (
    <div className={styles.mainDisplay} id="nav">
      <Header />
      <Container className={styles.contianer}>
        <Grid container spacing={1} className={styles.container_nav}>
          <Grid item sm={6} className={styles.nav_left}>
            <Link to="/" className={styles.link}>
              <img alt="logo" src={logoNav} className={styles.logo_nav} />
            </Link>
            <Link to="/" className={styles.link}>
              <div className={styles.container_text_nav}>
                <p className={styles.text_nav_top}>
                  Sekolah Tinggi Ilmu Komputer
                </p>
                <p className={styles.text_nav_bot}>
                  Cipta Karya informatika Kampus D
                </p>
              </div>
            </Link>
          </Grid>
          <Grid item sm={6} className={styles.container_for_hp}>
            <ul className={styles.ulNav}>
              <li
                className={styles.listNavBtn}
                onMouseEnter={handleChangeDropDownPerkuliahan}
                onMouseLeave={handleChangeDropDownPerkuliahan}
              >
                <div className={styles.headDropdown}>
                  <span>Perguruan Tinggi</span>
                  <ExpandMoreIcon className={styles.imgIcons} />
                </div>
                <div className={styles.togleDropdown} id="toglePerguruan">
                  <ul>
                    <Link
                      to="/visi-misi-perguruan-tinggi#main"
                      className={styles.link}
                    >
                      <li className={styles.listDropDown}>
                        Visi dan Misi perguruan tinggi
                      </li>
                    </Link>
                    <Link to="/kalender-akademik#main" className={styles.link}>
                      <li className={styles.listDropDown}>Kalender Akademik</li>
                    </Link>

                    <Link
                      to="/tujuan-perguruan-tinggi#main"
                      className={styles.link}
                    >
                      <li className={styles.listDropDown}>
                        Tujuan Perguruan Tinggi
                      </li>
                    </Link>
                    <Link to="/berita#main" className={styles.link}>
                      <li className={styles.listDropDown}>Berita terbaru</li>
                    </Link>
                    <Link to="/pengumuman#main" className={styles.link}>
                      <li className={styles.listDropDown}>Pengumuman</li>
                    </Link>
                  </ul>
                </div>
              </li>
              <li
                className={styles.listNavBtn}
                onMouseEnter={handleChangeDropDownProgramTI}
                onMouseLeave={handleChangeDropDownProgramTI}
              >
                <div className={styles.headDropdown}>
                  <span>Program Study TI</span>
                  <ExpandMoreIcon className={styles.imgIcons} />
                </div>
                <div className={styles.togleDropdown} id="togleProgramTI">
                  <ul>
                    <Link to="/visi-misi-TI#main" className={styles.link}>
                      <li className={styles.listDropDown}>Visi dan Misi TI</li>
                    </Link>
                    <Link to="/tujuan-prodi-TI#main" className={styles.link}>
                      <li className={styles.listDropDown}>Tujuan Prodi TI</li>
                    </Link>
                    <Link
                      to="/daftar-matakuliah-TI#main"
                      className={styles.link}
                    >
                      <li className={styles.listDropDown}>
                        Daftar Mata Kuliah TI
                      </li>
                    </Link>
                  </ul>
                </div>
              </li>
              <li
                className={styles.listNavBtn}
                onMouseEnter={handleChangeDropDownProgramSI}
                onMouseLeave={handleChangeDropDownProgramSI}
              >
                <div className={styles.headDropdown}>
                  <span>Program Study SI</span>
                  <ExpandMoreIcon className={styles.imgIcons} />
                </div>
                <div className={styles.togleDropdown} id="togleProgramSI">
                  <ul>
                    <Link to="/visi-misi-SI#main" className={styles.link}>
                      <li className={styles.listDropDown}>Visi dan Misi SI</li>
                    </Link>
                    <Link to="/tujuan-prodi-SI#main" className={styles.link}>
                      <li className={styles.listDropDown}>Tujuan Prodi SI</li>
                    </Link>
                    <Link
                      to="/daftar-matakuliah-SI#main"
                      className={styles.link}
                    >
                      <li className={styles.listDropDown}>
                        Daftar Mata Kuliah SI
                      </li>
                    </Link>
                  </ul>
                </div>
              </li>
              <a href="https://pmb.stikomcki.ac.id/" className={styles.link}>
                <li className={styles.pmb}>Pendaftaran mahasiswa baru</li>
              </a>
            </ul>

            {/* togle untuk navigasi hp device */}
            <div className={styles.navigated_device}>
              {/* togle utama */}
              <div className={styles.togleHp}>
                <ViewHeadlineIcon
                  className={styles.iconTogle}
                  fontSize="large"
                  onClick={togle_button_hp}
                />
              </div>
              <div className={styles.dropdownTogleHp} id="togle_mobile">
                {/* togle header untuk togle list 1 heress */}
                <TreeView
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                >
                  <Link to="/#main" className={styles.link}>
                    <TreeItem nodeId="0" label="Home" />
                  </Link>
                  <TreeItem nodeId="1" label="Perguruan Tinggi">
                    <Link
                      to="/visi-misi-perguruan-tinggi#main"
                      className={styles.link}
                    >
                      <TreeItem
                        nodeId="2"
                        label="Visi dan Misi perguruan tinggi"
                      />
                    </Link>
                    <Link to="/kalender-akademik#main" className={styles.link}>
                      <TreeItem nodeId="3" label="Kalender Akademik" />
                    </Link>
                    <Link
                      to="/tujuan-perguruan-tinggi#main"
                      className={styles.link}
                    >
                      <TreeItem nodeId="4" label="Tujuan Perguruan Tinggi" />
                    </Link>
                    <Link to="/berita#main" className={styles.link}>
                      <TreeItem nodeId="4" label="Berita terbaru" />
                    </Link>
                    <Link to="/pengumuman#main" className={styles.link}>
                      <TreeItem nodeId="4" label="Pengumuman" />
                    </Link>
                  </TreeItem>
                  <TreeItem nodeId="5" label="Program Study TI">
                    <Link to="/visi-misi-TI#main" className={styles.link}>
                      <TreeItem nodeId="6" label="Visi dan Misi TI" />
                    </Link>
                    <Link to="/tujuan-prodi-TI#main" className={styles.link}>
                      <TreeItem nodeId="7" label="Tujuan Prodi TI" />
                    </Link>
                    <Link
                      to="/daftar-matakuliah-TI#main"
                      className={styles.link}
                    >
                      <TreeItem nodeId="8" label="Daftar Mata Kuliah TI" />
                    </Link>
                  </TreeItem>
                  <TreeItem nodeId="9" label="Program Study SI">
                    <TreeItem nodeId="10" label="Visi dan Misi SI" />
                    <TreeItem nodeId="11" label="Tujuan Prodi SI" />
                    <TreeItem nodeId="12" label="Daftar Mata Kuliah SI" />
                  </TreeItem>
                  <TreeItem nodeId="13" label="Pendaftaran mahasiswa baru" />
                </TreeView>
              </div>
            </div>
            {/* end togle device */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Navbar;
