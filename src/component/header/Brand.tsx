import { Fragment } from "react";
import { HashLink as Link } from "react-router-hash-link";
import logoNav from "./../../asset/image/logo Stikom.jpeg";

export default function Brand() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <Fragment>
        <img src={logoNav} className="w-16" />
        <div>
          <p className="font-bold text-red-500">Sekolah Tinggi Ilmu Komputer</p>
          <p className="font-bold text-blue-500">
            Cipta Karya informatika Kampus D
          </p>
        </div>
      </Fragment>
    </Link>
  );
}
