import React, { Fragment, useState } from "react";

// components

// asset image
import logoNav from "./../../asset/image/logo Stikom.jpeg";

// module react-router-dom haslink scroll animated
import { HashLink as Link } from "react-router-hash-link";
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
    <div className="sticky top-0 bg-white shadow z-50">
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
                        className="bg-white p-2 text-sm cursor-pointer hover:bg-gray-100 border"
                      >
                        {dropdown_item.label}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default Navbar;
