import React, { useRef, useState } from "react";
import {useGSAP} from "@gsap/react"
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/locationPanel/locationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import { Link } from 'react-router-dom'


const Home = () => {

    const [pickup, setPickup]           = useState("");
    const [distination, setDistinarion] = useState("");
    const [panelOpen, setPanelOpen]     = useState(false);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const vehiclePanelRef = useRef(null);
    const ConfirmRidePanelRef =  useRef(null);
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    

    const handleSubmit = (e) => {
        e.DefaultPrevent();
    }

    useGSAP(function(){
        if(panelOpen)
        {
            gsap.to(panelRef.current,{
                height : '70%',
                // opacity : 1
            })
            gsap.to(panelCloseRef.current,{
                opacity:1
            })
        }else
        {
            gsap.to(panelRef.current,{
                height : '0%',
                // opacity:0
            })

            gsap.to(panelCloseRef.current,{
                opacity:0
            })
        }
    },[panelOpen])

    useGSAP(function() {

        if(vehiclePanelOpen)
        {
            gsap.to(vehiclePanelRef.current,{
                transform : 'translateY(0)',
               
            })
        }else
        {
            gsap.to(vehiclePanelRef.current,{
                transform : 'translateY(100%)',
               
            })
        }
    },[vehiclePanelOpen])

    useGSAP(function () {
        
        
        if (confirmRidePanel) {
            gsap.to(ConfirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ConfirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePanel ])

   

    return (
        <div className='h-screen relative overflow-hidden'>
        <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='h-screen w-screen'>
            {/* image for temporary use  */}
            <img className="h-full w-full object-screen" src= 'https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif' />
        </div>
        <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
            <div className='h-[30%] p-6 bg-white relative'>
                <h5 ref={panelCloseRef} className='absolute opacity-0 right-6 top-6 text-2xl' onClick={() => setPanelOpen(false)}>
                    <i className="ri-arrow-down-wide-line"></i>
                </h5>
                <h4 className='text-2xl font-semibold'>Find a trip</h4>
                <form onSubmit={handleSubmit}>
                    <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                    <input
                        
                        className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                        type="text"
                        placeholder='Add a pick-up location'
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        onClick={() => {
                            setPanelOpen(true)
                            
                        }}
                    />
                    <input
                       
                        className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                        type="text"
                        placeholder='Enter your destination' 
                        value= {distination}
                        onChange={(e) => setDistinarion(e.target.value)}
                    />
                    <button
                   
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>
                    
                    <Link to='/chat' className='g-black  px-4 py-2 rounded-lg mt-3 w-full'>Chat with user</Link>
                </form>
                
            </div>
            <div className='bg-white h-0' ref={panelRef}>
                <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}/>
            </div>
        </div>
        <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 '>
            <VehiclePanel setVehiclePanelOpen={setVehiclePanelOpen} setConfirmRidePanel={setConfirmRidePanel}/>
        </div>
        <div ref={ConfirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
            <ConfirmRide setConfirmRidePanel={setConfirmRidePanel}/>
        </div>
        <div className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
            
        </div>
        <div  className='fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12'>
            
        </div>
    </div>
    )
}

export default Home;