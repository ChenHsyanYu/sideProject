import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProjects } from "../store/slices/projectSlice";
import ProjectBlock from "../components/ProjectBlock";
import NavBar from "../components/NavBar";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from "react-bootstrap/esm/Container";
import { IoAdd } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import '../css/startPageAndProjectBlock.css';
import { setProjectNow } from "../store/slices/projectSlice";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import InputBox from '../components/InputBox';
import { PiCalendarBlankDuotone } from "react-icons/pi";
import Calendar from "../components/Calendar";
import Spinner from 'react-bootstrap/Spinner';
import '../css/btn.css';
import dayjs from "dayjs";

const EditModal = () =>{
    return(
        <>
        </>
    )
}

const LeftClickModal = ({showModal, setModalStatus}) =>{
    const projectData = useSelector((state) => state.projects);
    const projectInfo = projectData.projectNow;
    const projectNameRef = useRef(null);
    const budgetRef = useRef(null);
    const startRef = useRef(null);
    const endRef = useRef(null);
    const subtitleRef = useRef(null);
    const [isEditable, setEditable] = useState(false)
    // let isEditable = false;

    // useEffect(()=>{
    //     if(showModal && projectInfo){
    //         projectNameRef.current.value = projectInfo.projectName;
    //         budgetRef.current.value = projectInfo.projectBudget;
    //         startRef.current.value = projectInfo.startTime;
    //         endRef.current.value = projectInfo.endTime;
    //         subtitleRef.current.value = projectInfo.projectSubtitle;
    //     }
    // },[showModal,projectInfo])

    const editProject = async () =>{
        await fetch('https://sideproject-production-f126.up.railway.app/editProject',{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({...projectInfo, projectName: projectNameRef.current.value, projectSubtitle: subtitleRef.current.value ,projectBudget: budgetRef.current.value, startTime: startRef.current.value, endTime: endRef.current.value})
        })
        setEditable(false);
    }
    
    const deleteProject = async () =>{
        const response = await fetch(`https://sideproject-production-f126.up.railway.app/deleteProject?projectID=${projectInfo.projectID}`,{
            method: 'DELETE',
            headers:{'Content-Type': 'application/json'}
        })
    }
    return (
        <Modal show={showModal} onHide={() => setModalStatus(false)} centered>
          {/* <Modal.Dialog> */}
            <Modal.Header>
                {isEditable ? <p>編輯 {projectInfo.projectName} 資訊</p> : <p>對 <span style={{color: '#464A62', fontWeight: 600}}>{projectInfo.projectName}</span> 進行以下操作：</p>}
            </Modal.Header>
    
            <Modal.Body bsPrefix="modalBody" style={{display: 'flex',justifyContent: 'space-between'}}>
                { !isEditable && 
                    <>
                        <button style={{width:'50%' , borderRight: 1, padding: 10}} onClick={() => setEditable(true)}>編輯</button>
                        <button style={{width:'50%', padding: '10', color: '#FF0A22'}} onClick={()=> deleteProject()}>刪除</button>
                    </>}
                
            </Modal.Body>
            {isEditable &&
                <Modal.Body style={{display:'flex', flexDirection: 'column',gap: 10, justifyContent: 'center'}}>
                    <div style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                        <InputBox label="編輯專案名稱" value={projectInfo.projectName} ref={projectNameRef}/>
                        <InputBox label="編輯專案副標題" value={projectInfo.projectSubtitle} ref={subtitleRef}/>
                    </div>
                    <Calendar label="編輯旅遊起始時間" value={dayjs(projectInfo.startTime)} ref={startRef}/>
                    <Calendar label="編輯旅遊結束時間" value={dayjs(projectInfo.endTime)} ref={endRef}/>
                    <InputBox label="編輯預算" value={projectInfo.projectBudget} ref={budgetRef}/>
                    <div style={{textAlign: 'center'}}><button className="comfirmBtn" style={{borderRadius: 10, padding: 5}} onClick={() => editProject}>確認更改</button></div>
                    
                </Modal.Body>
            }
        </Modal>
      );
}

const StartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpened, setModal] = useState(false);
    let timer;
    const handlePress = (project) =>{
        timer = setTimeout(() =>{
            dispatch(setProjectNow(project));
            setModal(true);
        }, 800)
    }
    const handlePressEnd = () =>{
        clearTimeout(timer)
        setModal(false)
    }
    

    // ✅ 正確取得 Redux state
    const { projects, status, errorMessage, projectNow } = useSelector((state) => state.projects);
    useEffect(() => {
        dispatch(fetchAllProjects());  // ✅ 發送 API 請求
    }, [dispatch]);

    // ✅ API 請求中，顯示 Loading
    if (status === "loading") {
        return <div style={{display:'flex', justifyContent:'center', alignItems: 'center', padding: 40, color: '#464A62', gap: 10}}><Spinner animation="border" /> ...Loading</div>
    }

    // ✅ API 錯誤，顯示錯誤訊息
    if (status === "failed") {
        return <p>Error: {errorMessage}</p>;
    }

    const goProject = (project) =>{
        dispatch(setProjectNow(project));
        navigate('/project')
    }

    return (
        <>
            <NavBar />
            <LeftClickModal showModal={isModalOpened} setModalStatus={setModal} projectInfo={projectNow}/>
            <Tabs
                defaultActiveKey="all"
                id="fill-tab-example"
                className="mb-3"
                fill
                variant="underline"
            >
                <Tab eventKey="all" title="全部" className="tab">
                    <Container className="projectCards" >
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <div key={project.projectID} onClick={() => goProject(project)} onTouchStart={() => handlePress(project)} onTouchEnd={() => handlePressEnd}>
                                    <ProjectBlock projectInfo={project}/>
                                </div>
                            ))
                        ) : (
                            <p>🚀 沒有專案，請新增！</p>
                        )}
                    </Container>
                </Tab>
                <Tab eventKey="add" title={<IoAdd />} className="tab">
                    Tab content for Adding New Project
                </Tab>
            </Tabs>
            <IoIosAddCircle className="toolIcon" onClick={() => navigate('/newProject')}/>
        </>
    );
};

export default StartPage;
