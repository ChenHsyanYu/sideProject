import { FaUtensils } from "react-icons/fa";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { PiAirplaneTiltFill } from "react-icons/pi";
import { FaTrainSubway } from "react-icons/fa6";
import { RiCake3Fill } from "react-icons/ri";
import { FaHotel } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";

const iconMode = (mode) => {
    switch(mode){
        case 'food':
            return <FaUtensils />
        case 'shopping':
            return <RiShoppingBag4Fill />
        case 'flight': 
            return <PiAirplaneTiltFill /> 
        case 'transportation':
            return <FaTrainSubway /> 
        case 'dessert':
            return <RiCake3Fill />
        case 'accomodation':
            return <FaHotel />
        case 'internet':
            return <FaWifi />
        case 'others':
            return <IoAddCircle />
    }
}

export default iconMode;