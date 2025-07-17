import React from "react";


const LocationSearchPanel = (props) => {

    const locations = [
        "24B, Near Kapoor's cafe Sheriyans coding school,Bhopal",
        "22C, Near Malhotra's cafe Sheriyans coding school,Bhopal",
        "20B, Near Singhai's cafe Sheriyans coding school,Bhopal",
        "18A, Near Sharma's cafe Sheriyans coding school,Bhopal"
    ]

    return(
        <>
        {locations.map((location, index) => (
            <div 
            key={index} onClick={() => {
                props.setVehiclePanelOpen(true)
                props.setPanelOpen(false)
            }}
            className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
            >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
                <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{location}</h4>
            </div>
        ))}
        </>
    )

}


export default LocationSearchPanel;