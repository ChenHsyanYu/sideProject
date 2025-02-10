import '../css/btn.css'
import { useState, useEffect } from 'react'
import '../css/projectPageAndBill.css'
import { IoIosArrowForward } from "react-icons/io";
import { FaUtensils } from "react-icons/fa";
import categoryIcons from './categoryIcons';

const Bill = ({ mode, billContent, onClicked}) =>{

    const [btnClassName, setClassName] = useState('redBtn');
    const [billInfo, setBill] = useState({});
    useEffect(() => {
        if(billContent){
            setBill(billContent);
        }
        console.log(billContent)
    },[billContent] )

    return(
        <>

            {/* {mode === 'seperate' &&  */}
                <div className='outer' onClick={() => onClicked}>
                    <div className='wrap'>
                        <div className='wrap2'>
                            <div className='title'>
                                <p>{billInfo.billingName}</p>
                                {mode === 'seperate' && <button className={billInfo.billingStatus? 'blueBtn' : 'redBtn'}>{billInfo.billingStatus ? "sent": "not yet"}</button>}
                            </div>
                            <div className='iconWrap'>
                                <div className='icons'>
                                    {categoryIcons(billInfo.billingCategory)}
                                    <div className='date'>{billInfo.billingDate}</div>
                                </div>
                                <p>{billInfo.billingExpense}</p>
                            </div>
                        </div>
                        <IoIosArrowForward />
                    </div>
                </div>
            
        </>
    )
}

export default Bill;