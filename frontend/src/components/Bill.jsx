import '../css/btn.css'
import { useState, useEffect } from 'react'
import '../css/projectPageAndBill.css'
import { IoIosArrowForward } from "react-icons/io";
import { FaUtensils } from "react-icons/fa";

const Bill = ({ mode, billContent}) =>{

    const [btnClassName, setClassName] = useState('redBtn');
    const [billInfo, setBill] = useState({});
    useEffect(() => {
        if(billContent){
            setBill(billContent);
        }
    },[billContent] )

    return(
        <>

            {/* {mode === 'seperate' &&  */}
                <div className='outer'>
                    <div className='wrap'>
                        <div className='wrap2'>
                            <div className='title'>
                                <p>{billInfo.title}</p>
                                {mode === 'seperate' && <button className={btnClassName}>{mode}</button>}
                            </div>
                            <div className='iconWrap'>
                                <div className='icons'>
                                    <FaUtensils className='icon'/>
                                    <div className='date'>12 Nov 2024</div>
                                </div>
                                <p>$2,400.00</p>
                            </div>
                        </div>
                        <IoIosArrowForward />
                    </div>
                </div>
                {/* } */}

            {/* {mode === 'personal' && 
                <div className='outer'>
                    <div className='wrap'>
                        <div className='wrap2'>
                            <div className='title'>
                                <p>唐吉訶德</p>
                                <button className={btnClassName}>{status}</button>
                            </div>
                            <div className='iconWrap'>
                                <div className='icons'>
                                    <FaUtensils />
                                    <div>12 Nov 2024</div>
                                </div>
                                <p>$2,400.00</p>
                            </div>
                        </div>
                        <IoIosArrowForward />
                    </div>
                </div>} */}
            


            
        </>
    )
}

export default Bill;