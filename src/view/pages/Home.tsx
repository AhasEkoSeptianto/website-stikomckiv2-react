import React from "react";

// my nav

// myfooter
import Footer from "../../component/footer/Footer.js";

// Scrillable module
import ScrollableAnchor from "react-scrollable-anchor";

// slide js module
// import { Splide, SplideSlide } from "@splidejs/react-splide";

// image background splide js
import bg1 from "./../../asset/image/background/bg1.jpeg";
import bg2 from "./../../asset/image/background/bg2.jpeg";
import bg3 from "./../../asset/image/background/bg3.jpeg";

// mycss
import s from "./../../asset/css/home.module.css";

import { setCookies, getCookies } from "../../lib/cookie";
import Navbar from "../../component/navbar/navbar";
import { get } from "../../lib/axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Button, Paper } from "@mui/material";

class Home extends React.Component {
  async componentDidMount() {
    document.title = "Home";

    let gets = get(`${process.env.REACT_APP_BASE_URL}api/mahasiswa`);

    let visitor = await get(`${process.env.REACT_APP_BASE_URL}api/visitor`);
    console.log(visitor);
  }

  render() {
    const settings = {
      direction: "vertical",
      slidesPerView: 1,
      spaceBetween: 30,
      mousewheel: true,
      cssMode: true, // with this enabled, it works fine. Disabled, it does not
      on: {
        scroll: function () {
          console.log("swiper scrolled");
        },
      },
    };

    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };

    return (
      <div className={s.containermPage}>
        <Navbar />
        <ScrollableAnchor id="main">
          <div></div>
        </ScrollableAnchor>

        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          transitionDuration={1}
        >
          <div className="bg-slider1 w-screen h-sliderImage bg-cover flex flex-col justify-center">
            <div className="w-10/12 mx-auto text-white space-y-1">
              <h2 className="bg-black bg-opacity-70 p-1 w-max text-2xl">Selamat datang</h2>
              <h4 className="bg-black bg-opacity-70 p-1 w-max text-2xl">
                di Sekolah Tinggi Ilmu Komputer Cipta Karya Informatika Kampus D
              </h4>
            </div>
          </div>
          <div className="bg-slider2 w-screen h-sliderImage bg-cover flex flex-col justify-center">
            <div className="w-10/12 mx-auto text-white space-y-1">
              <h2 className="bg-black bg-opacity-70 p-1 w-max text-2xl">BEM</h2>
              <h4 className="bg-black bg-opacity-70 p-1 w-max text-2xl">
                Kegiatan mahasiswa di stikom cki sebagai badan eksekutif
                mahasiswa
              </h4>
            </div>
          </div>
          <div className="bg-slider3 w-screen h-sliderImage bg-cover"></div>
        </Carousel>

        <Footer />
      </div>
    );
  }
}

export default Home;
