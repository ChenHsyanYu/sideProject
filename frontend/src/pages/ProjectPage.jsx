import NavBar from "../components/NavBar";
import '../css/btn.css';
import Bill from "../components/Bill";
import { useEffect, useRef, useState } from "react";
import { VictoryPie } from 'victory';
import '../css/variables.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { IoIosAddCircle } from "react-icons/io";
import EditBillOverlay from "../components/EditBillOverlay";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneProject } from "../store/slices/projectSlice";

const ProjectPage = () =>{
    const project = useSelector((state) => state.projects)
    const projectInfo = project.projectNow;
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchOneProject())
        // setSeperateBills(projectInfo.projectBills)
    },[])
    const [expense, setExpense] = useState([
        {
            num: projectInfo.projectExpense,
            fill: '#C9D0F9',
        },
        {
            num: projectInfo.projectBudget,
            fill: '#FFC7C9',
        }
    ]);
    const [personalBills, setPersonalBills] = useState([
        {
            id: 0,
            title: "title",
            category: 0,
            amount: 0,
            date: "2024/12/13",
            type: 'personal',
        },
        {
            id: 1,
            title: "大家好",
            category: 0,
            amount: 0,
            date: "2024/12/13",
            type: 'personal',
        }
    ])

    const [seperateBills, setSeperateBills] = useState([
        {
            id: 0,
            title: "哈囉",
            category: 0,
            amount: 0,
            date: "2024/12/13",
            type: 'seperate',
            paidBy: 1,
            seperateMembers: [1,2,3],
            status: 'sent'
        },
        {
            id: 1,
            title: "大家好",
            category: 0,
            amount: 0,
            date: "2024/12/13",
            type: 'seperate',
            paidBy: 1,
            seperateMembers: [1,2,3],
            status: 'sent'
        }
    ])


    const [isDropdownOpened, setOpened] = useState(false);
    const overlayRef = useRef(null);
    // const handleClickOverlay = (event) =>{
    //     if(overlayRef.current)
    // }

    return(
        <>
            <NavBar projectName={projectInfo.projectName}></NavBar>
            <div className="circleArea">
                <button className="blueBtn">Balance</button>
                <div className="circle">
                    {/* <CircularProgress variant="determinate" value={100} thickness={7} size={230} id="back"/>
                    <CircularProgress variant="determinate" value={25} thickness={7} size={230}/> */}
                    <VictoryPie 
                        padAngle={3}
                        innerRadius={110}
                        cornerRadius={8}
                        
                        style={{
                            labels: {
                                display: 'none',
                            },
                            // data: {
                            //     fill: ({ expense }) => expense.fill,
                            //   },
                            }}
                        data={expense.map((expNum) => expNum.num)}
                    />
                </div>
                
                <button className="blueBtn">載具</button>
            </div>
            <Tabs
                defaultActiveKey="personal"
                id="fill-tab-example"
                className="mb-3"
                fill
                variant='underline'
            >
                <Tab eventKey="personal" title="個人花費" className="tab">
                    <div onClick={()=>setOpened(true)}>
                        {personalBills.map((bill) => <Bill key={bill.id} mode='personal' billContent={bill} />)}
                    </div>
                </Tab>
                <Tab eventKey="seperate" title="分帳花費" className="tab">
                    <div onClick={()=>setOpened(true)}>
                        {seperateBills.map((bill) => <Bill key={bill.id} mode='seperate'billContent={bill}/>)}
                    </div>
                </Tab>
            </Tabs>
            <IoIosAddCircle className="toolIcon" onClick={() => setOpened(true)}/>
            {isDropdownOpened && <EditBillOverlay className='overlay' closeFunction={setOpened}/>}

        </>
    )
}

export default ProjectPage;