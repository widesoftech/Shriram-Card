import React, { useEffect, useState } from 'react'
import template from "../assets/JD Template.jpeg"
import { useLocation } from 'react-router-dom'
import { ApproveCard } from '../services/opretions/fieldApi';

const IdCardJDVertical = (props) => {
    console.log("Props : ", props);
    const location = useLocation();
    const [data, setData] = useState([]);
    // const data = location.state?.item

    useEffect(() => {
        if (location.state) {
            setData(location.state?.item)
        }
        else {
            setData(props.data)
        }
    }, [location.state, props])

    console.log("data1 : ", data);
   
    let date = ""
    if(data.dateofBirth) {
        date = data?.dateofBirth.slice(0,10)
    }

    const ApproveCardData = async () => {
        const res = await ApproveCard({ isApprove: true, _id: data._id, isRejecte: false });
        setData(res.newData);
    }

    // const data = {
    //     Class: "2",
    //     aadharnumber: null,
    //     address: "fdsaf fdafd fdsa fdsa fdsa fdsa fdsa NAGPUR",
    //     admin: "6675bc86fb1c650717d0c649",
    //     admissionNo: null,
    //     bloodGroup: null,
    //     contactNumber: 9999999999,
    //     dateofBirth: "2024-03-26T00:00:00.000Z",
    //     designation: null,
    //     emergencyConNo: null,
    //     formField: "667bb9cf4f33bd8ca473f2f8",
    //     modeOfTransportation: null,
    //     name: "RAM dfdsa fdsafdsa",
    //     role: "Staff",
    //     rollNo: null,
    //     schoolName: "J D",
    //     section: "C",
    //     uploadyourPassport:"https://res.cloudinary.com/djc3fsuzx/image/upload/v1719388395/IDCards/ycui6eod2i8jmmchbuzi.jpg"
    //     , __v: 0,
    //     _id: "667bba484f33bd8ca473f2fc"
    // }

    // let date = ""
    // if (data.dateofBirth) {
    //     date = data?.dateofBirth.slice(0, 10)
    // }

    return (
        <div className=' bg-gray-200 '>
            <div className=' flex relative justify-center w-11/12 mx-auto py-10'>
                <img className=' relative' height={40} src={template} alt="" />
                <img className=' absolute top-[19rem]  h-[19rem] rounded-lg' width={244} src={data?.uploadyourPassport} alt="" />
                <div className=' absolute top-[42rem] font-semibold text-3xl '>
                    {data.name && <p><span className=' font-bold mr-[5.4rem] '>Name</span>: {data.name}</p>}

                    {data.Class && <p><span className=' font-bold mr-[6.1rem]'>Class</span>: {data.Class}</p>}
                    {data.section && <p><span className=' font-bold mr-[3.9rem]'>Section</span>: {data.section} </p>}
                    {data.designation && <p><span className=' font-bold'>Designation</span>: {data.designation}</p>}
                    {data.dateofBirth && <p><span className=' font-bold mr-[4rem] '>D. O. B.</span>: {data.dateofBirth ? new Date(data.dateofBirth)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "/")
                        : ""}</p>}

                    {data.bloodGroup && <p><span className=' font-bold mr-[1.9rem]'>Blood Gr.</span> : {data.bloodGroup}</p>}
                    {data.contactNumber && <p><span className=' font-bold mr-[0rem]'>Contact No.</span>: {data.contactNumber}</p>}
                    <div className=' flex'>
                        {data.address && <span className=' font-bold mr-[3.3rem] '>Address</span>}
                        {data.address && <p className=' w-[26rem] '> : {data.address}</p>}
                    </div>
                </div>

            </div>
            <div className=' w-11/12 mx-auto flex justify-center gap-5 pb-5 text-3xl'  >
                {data.isApprove ?
                    (
                        <p className=' text-white bg-green-600 px-4 py-2 rounded'>Data is Approved</p>
                    )
                    : (<>
                        <button onClick={ApproveCardData} className=' px-5 py-3 rounded bg-green-600 hover:bg-green-700 duration-150 text-white'>Approve</button>
                        <button className=' px-5 py- rounded bg-red-500 hover:bg-red-600 duration-150 text-white'>Rejecte</button>
                    </>)
                }
            </div>
        </div>
    )
}

export default IdCardJDVertical
