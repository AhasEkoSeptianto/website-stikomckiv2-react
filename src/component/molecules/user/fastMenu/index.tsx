import { Divider, Paper, Stack } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { TIMESTAMP_FORMAT_SHOW } from "src/utils/constans/TimestampFormat";

export default function FastMenu() {
  const CONT_FASTMENU = [
    {
      menu: "Kategory",
      dropdown: [
        { subMenu: "Berita", link: "#" },
        { subMenu: "Pengumuman", link: "#" },
      ],
    },
    {
      menu: "Berita Terbaru",
      dropdown: [
        { subMenu: "Berita", link: "#" },
      ],
    },
  ];

  const [ allBroadcast, setAllBroadCast ] = useState<any>([])
  const [ loadingFetch, setLoadingFetch ] = useState(true)
  useEffect(() => {
    axios.get(process.env.REACT_APP_ENP_BE + 'api/broadcast/allData')
        .then(res => {
            setAllBroadCast(res?.data?.data)
            setLoadingFetch(false)
        })
        .catch(err => {
            setLoadingFetch(false)
        })
},[])

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
    <Paper className="p-2" variant='outlined'>
        
          <Carousel
            responsive={responsive}
            infinite
            showDots
            autoPlay
            customLeftArrow={<p></p>}
            customRightArrow={<p></p>}
            transitionDuration={5}
          >
            <div>
              <div className="">
                  <p className="text-lg p-2 text-center font-semibold mb-5">{allBroadcast?.[0]?.title}</p>
                  <img className="mx-auto" src={allBroadcast?.[0]?.imageUrl} />
                  <div className="p-2">
                      <p className="mt-5 mb-2 text-xs">{moment(allBroadcast?.[0]?.time_post).format(TIMESTAMP_FORMAT_SHOW) }</p>
                      <div dangerouslySetInnerHTML={{ __html: allBroadcast?.[0]?.content }}></div>
                  </div>
              </div>
            </div>
            <div>
              <div className="">
                <p className="text-lg p-2 text-center font-semibold mb-5">{allBroadcast?.[1]?.title}</p>
                <img className="mx-auto" src={allBroadcast?.[1]?.imageUrl} />
                <div className="p-2">
                    <p className="mt-5 mb-2 text-xs">{moment(allBroadcast?.[1]?.time_post).format(TIMESTAMP_FORMAT_SHOW) }</p>
                    <div dangerouslySetInnerHTML={{ __html: allBroadcast?.[1]?.content }}></div>
                </div>
              </div>
            </div>
            <div>
              <div className="">
                <p className="text-lg p-2 text-center font-semibold mb-5">{allBroadcast?.[2]?.title}</p>
                <img className="mx-auto" src={allBroadcast?.[2]?.imageUrl} />
                <div className="p-2">
                    <p className="mt-5 mb-2 text-xs">{moment(allBroadcast?.[2]?.time_post).format(TIMESTAMP_FORMAT_SHOW) }</p>
                    <div dangerouslySetInnerHTML={{ __html: allBroadcast?.[2]?.content }}></div>
                </div>
              </div>
            </div>
            
          </Carousel>
        
      
    </Paper>
  );
}
