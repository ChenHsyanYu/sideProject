import NavBar from "../components/NavBar";
import '../css/btn.css';
import Bill from "../components/Bill";
import { useRef, useState } from "react";
import { VictoryPie } from 'victory';
import '../css/variables.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { IoIosAddCircle } from "react-icons/io";
import EditBillOverlay from "../components/EditBillOverlay";

const ProjectPage = () =>{
    const [expense, setExpense] = useState([
        {
            num: 100,
            fill: '#C9D0F9',
        },
        {
            num: 30,
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
            <NavBar></NavBar>
            <div className="circleArea">
                <button className="blueBtn">Balance</button>
                <div className="circle">
                    <VictoryPie 
                        padAngle={3}
                        innerRadius={110}
                        cornerRadius={8}
                        data={expense.map((expNum) => expNum.num)}
                        style={{
                            labels: {
                                display: 'none',
                            },

                        }}
                    />
                </div>
                
                <button className="blueBtn">載具</button>
            </div>
            <Tabs
                defaultActiveKey="personal"
                id="fill-tab-example"
                className="mb-3"
                fill
                variant='underliine'
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