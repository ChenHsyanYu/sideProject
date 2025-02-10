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
import { setBillNow } from "../store/slices/projectSlice";

const ProjectPage = () =>{
    const project = useSelector((state) => state.projects)
    const projectInfo = project.projectNow;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchOneProject());
    }, []);
    const [personalBills, setPersonalBills] = useState([])
    const [seperateBills, setSeperateBills] = useState([])
    useEffect(() => {
        if (!project.projectBills || project.projectBills.length === 0) return; // ✅ 避免 `undefined`
    
        setPersonalBills(project.projectBills.filter(bill => bill.billingType === "personal"));  // ✅ 一次性更新
        setSeperateBills(project.projectBills.filter(bill => bill.billingType !== "personal"));
    }, [project.projectBills]);  // ✅ 監聽 `project.projectBills`，當 Redux 更新時執行
    
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

    const goBillInfo = (bill) =>{
        dispatch(setBillNow(bill))
    }
    


    const [isDropdownOpened, setOpened] = useState(false);

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
                        {personalBills.map((bill) => <Bill key={bill.billingID} mode='personal' billContent={bill} onClick={()=>goBillInfo(bill)}/>)}
                    </div>
                </Tab>
                <Tab eventKey="seperate" title="分帳花費" className="tab">
                    <div onClick={()=>setOpened(true)}>
                        {seperateBills.map((bill) => <Bill key={bill.billingID} mode='seperate'billContent={bill} onClick={()=>goBillInfo(bill)}/>)}
                    </div>
                </Tab>
            </Tabs>
            <IoIosAddCircle className="toolIcon" onClick={() => setOpened(true)}/>
            {isDropdownOpened && <EditBillOverlay className='overlay' closeFunction={setOpened} propBillContent={project.billNow}/>}

        </>
    )
}

export default ProjectPage;