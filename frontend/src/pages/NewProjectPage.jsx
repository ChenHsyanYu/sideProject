import BillMember from "../components/BillMember"
import '../css/newProjectAndBillMember.css';
import { PiCalendarBlankDuotone } from "react-icons/pi";
import Form from 'react-bootstrap/Form';
import { BsPiggyBank } from "react-icons/bs";
import { useState } from "react";
import '../css/btn.css';
import { IoIosAddCircle } from "react-icons/io";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import InputBox from "../components/InputBox";
import { MdOutlinePlace } from "react-icons/md";



const NewProjectPage = () =>{
    const [budgetValue, setValue] = useState(0);
    const consoleValue  = (value) =>{
        setValue(value);
        console.log(value)
    }

    const [date, setDate] = useState(new Date())

    const [billMembers, setBillMember] = useState([
        {
            id: 0,
            name: '',
        },
        {
            id: 1,
            name: '',
        },
        {
            id: 2,
            name: '',
        }
    ]);

    const [isCalendarOpened, setCalendar] = useState(false);

    return(
        <>
            <h1>新增您的旅程資訊</h1>
            <div className="middle">
                <div className="block">
                    <MdOutlinePlace className="smIcon"/>
                    <InputBox label="Location"/>
                    <InputBox label="副標題"/>
                </div>
                <hr />
                <div className="block" onClick={() => setCalendar(!isCalendarOpened)}>
                    <PiCalendarBlankDuotone className="smIcon"/>
                    <span>選擇時間</span>
                </div>
                {isCalendarOpened && <Calendar onChange={setDate} value={date} className="calendar" tileClassName='button'></Calendar>}
                
                <hr />
                <div className="block">
                    <BsPiggyBank className="smIcon"/>
                    <div className="budget">
                        <div className="span"><span>Budget</span><span>$0-100</span></div>
                        <Form.Range 
                            value={budgetValue}
                            onChange={updatedValue => consoleValue(updatedValue)}
                            className="controller"
                        />
                    </div>
                    
                    {/* {budgetValue} */}

                </div>
                <hr />
                <p className="block">分帳人員</p>
                <div className="block1">
                    {billMembers.map(member => 
                        <div className="row"><span className="rowNum">{member.id + 1}</span> <BillMember /></div>
                    )}
                </div>
                <button className="addMember">新增分帳人員<IoIosAddCircle/></button>
                <button className="comfirm">確認</button>
            </div>
            
        </>
        
    )
}

export default NewProjectPage;