import { LuMenu } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { AiOutlineScan } from "react-icons/ai";
import { PiCalendarBlankDuotone } from "react-icons/pi";
import '../css/NavBar.css';

const NavBar = ({projectName}) => {
    return(
        // <Navbar>
            <div className="navBar">
                    <div className="icons">
                        <LuMenu className="icon"/>
                        <HiOutlineUserCircle className="icon" id='userIcon'/> 
                    </div>
                    <div className='projectTitle'>{projectName}</div>
                    <div className="icons">
                        <AiOutlineScan className="icon" />
                        <PiCalendarBlankDuotone className="icon"/> 
                    </div>
            </div>
        // </Navbar>
    );
}

export default NavBar;