import { useState } from "react";
import Brand from "../header/Brand";
import Header from "../header/Header";
import MenuIcon from "@mui/icons-material/Menu";
import { HashLink as Link } from "react-router-hash-link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
      { label: "Pengumuman", link: "/pengumuman" },
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

export default function NavbarMobile() {
  const [openTogle, setOpenTogle] = useState(false);
  return (
    <div>
      <div className="p-2 flex items-center justify-between">
        <Brand />
        <MenuIcon
          onClick={() => setOpenTogle(!openTogle)}
          sx={{ width: 40, height: 40 }}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-700 text-center space-y-2  ${
          openTogle ? "max-h-96" : "max-h-0"
        }`}
      >
        {dataNav.map((nav, idx) => (
          <div key={idx} className="p-2 flex items-center justify-center">
            {nav?.dropdown ? (
              <SubNavbar {...nav} />
            ) : (
              <Link to={nav.link}>{nav.label}</Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const SubNavbar = function (props: any) {
  const [openSubNav, setOpenSubNav] = useState(false);

  return (
    <div className="">
      <div
        onClick={() => setOpenSubNav(!openSubNav)}
        className="flex items-center justify-center"
      >
        <p>{props?.label}</p>
        <KeyboardArrowDownIcon sx={{ width: 18, height: 18 }} />
      </div>

      <div
        className={`overflow-hidden transition-all duration-700 text-center space-y-2  ${
          openSubNav ? "max-h-96" : "max-h-0"
        }`}
      >
        {props?.dropdown?.map((item: any, i: number) => (
          <p key={i} className="py-2">
            <Link to={item?.link}>{item?.label}</Link>
          </p>
        ))}
      </div>
    </div>
  );
};
