import BillMember from "../components/BillMember"
import '../css/newProjectAndBillMember.css';
import { PiCalendarBlankDuotone } from "react-icons/pi";
import Form from 'react-bootstrap/Form';
import { BsPiggyBank } from "react-icons/bs";
import { useState } from "react";
import '../css/btn.css';
import { IoIosAddCircle } from "react-icons/io";
import 'react-calendar/dist/Calendar.css';
import InputBox from "../components/InputBox";
import { MdOutlinePlace } from "react-icons/md";
import { useRef } from "react";
import { addProject, setProjectNow} from "../store/slices/projectSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Calendar from '../components/Calendar';
import dayjs from "dayjs";


const NewProjectPage = () =>{
    const inputRef = useRef("");
    const subTitleRef = useRef("");
    const memberNameRef = useRef([])
    const budgetRef = useRef(0);
    const dispatch = useDispatch();
    const [budgetValue, setValue] = useState(0);
    const startRef = useRef(null);
    const endRef = useRef(null);
    const navigate = useNavigate()
    let newProjectInfo = {}

    const getInputText = () => {
        if(inputRef.current){
            newProjectInfo = dispatch(addProject({
                // lineliffID:"",
                projectID: 0,
                creatorLineliffID: "123",
                projectName: inputRef.current.value,
                projectSubtitle: subTitleRef.current.value,
                isProjectEnded: false,
                projectExpense: 0,
                projectBudget: parseFloat(budgetRef.current.value),
                startTime: startRef.current.value,
                endTime: endRef.current.value,
                emoji: "",
            })).projectInfo
            dispatch(setProjectNow(newProjectInfo))
            navigate('/project')
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
                    <InputBox label="專案名稱" ref={inputRef}/>
                    <InputBox label="副標題" ref={subTitleRef}/>
                </div>
                <hr />
                <div className="block">
                    <PiCalendarBlankDuotone className="smIcon"/>
                    {/* <span>起始時間: {}</span> */}
                    <Calendar label="旅行開始時間" ref={startRef}/>
                </div>
                <div className="block">
                    <PiCalendarBlankDuotone className="smIcon"/>
                    {/* <span>結束時間: {}</span> */}
                    <Calendar label="旅行結束時間" ref={endRef}/>
                    
                </div>
                
                
                
                <hr />
                <div className="block">
                    <BsPiggyBank className="smIcon"/>
                    <div className="budget">
                        <InputBox ref={budgetRef} label="預算"/>
                    </div>

                </div>
                <hr />
                <button className="comfirm" onClick={getInputText}>確認</button>
            </div>
            
        </>
        
    )
}

export default NewProjectPage;