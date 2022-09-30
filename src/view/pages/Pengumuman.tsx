import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Footer from "src/component/footer/Footer";
import Navbar from "src/component/navbar/navbar";
import { Image } from 'antd';
import moment from "moment";
import { TIMESTAMP_FORMAT_SHOW } from "src/utils/constans/TimestampFormat";

export default function PengumumanDefaultPage(){
    
    const [ allBroadcast, setAllBroadCast ] = useState([])
    const [ loadingFetch, setLoadingFetch ] = useState(true)

    useEffect(() => {
        axios.get(process.env.REACT_APP_ENP_BE + 'api/broadcast/allData')
            .then(res => {
                setAllBroadCast(res?.data?.data)
                setLoadingFetch(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingFetch(false)
            })
    },[])

    return (
        <Fragment>
            <Navbar />

            <div className="grid grid-cols-3 gap-5 m-10">
                {allBroadcast.map((item:any, idx:number) => (
                    <div className="bg-white h-max shadow hover:shadow-2xl hover:cursor-pointer">
                        <p className="text-lg p-2 text-center font-semibold mb-5">{item.title}</p>
                        <img className="mx-auto" src={item.imageUrl} />
                        <div className="p-2">
                            <p className="mt-5 mb-2 text-xs">{moment(item.time_post).format(TIMESTAMP_FORMAT_SHOW) }</p>
                            <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </Fragment>
    )
}