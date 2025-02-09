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
import { useRef } from "react";
import { addProject } from "../store/slices/projectSlice";
import { useDispatch } from "react-redux";


const NewProjectPage = () =>{
    const inputRef = useRef("");
    const subTitleRef = useRef("");
    const memberNameRef = useRef([])
    const budgetRef = useRef(0);
    const dispatch = useDispatch();
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
    const getInputText = () => {
        if(inputRef.current){
            console.log(`輸入框:${inputRef.current.value}`)
            console.log(`輸入框:${subTitleRef.current.value}`)
            memberNameRef.current.forEach((member) => {
                console.log(`輸入框: ${member.value}`)
            })
            console.log(budgetRef.current.value);
            dispatch(addProject(JSON.stringify({
                lineliffID:"",
                projectID: 0,
                projectName: inputRef.current.value,
                projectSubtitle: subTitleRef.current.value,
                isProjectEnded: false,
                projectExpense: 0,
                projectBudget: budgetRef.current.value,
                startTime: new Date(),
                endTime: new Date()
            })))
        }else{
            console.log("Ref 未綁定")
        }
        
    }

    return(
        <>
            <h1>新增您的旅程資訊</h1>
            <div className="middle">
                <div className="block">
                    <MdOutlinePlace className="smIcon"/>
                    <InputBox label="Location" ref={inputRef}/>
                    <InputBox label="副標題" ref={subTitleRef}/>
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
                        {/* <div className="span"><span>Budget</span><span>$0-100</span></div> */}
                        <InputBox ref={budgetRef} label="budget"/>
                    </div>
                    
                    {/* {budgetValue} */}

                </div>
                <hr />
                <p className="block">分帳人員</p>
                <div className="block1">
                    {billMembers.map((member, id) => 
                        <div className="row"><span className="rowNum">{id + 1}</span> <BillMember memberName={member.name} ref={(el) => memberNameRef.current[id] = el}/></div>
                    )}
                </div>
                <button className="addMember">新增分帳人員<IoIosAddCircle/></button>
                <button className="comfirm" onClick={getInputText}>確認</button>
            </div>
            
        </>
        
    )
}

export default NewProjectPage;