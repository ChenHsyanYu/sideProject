import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../store/slices/projectSlice";
import ProjectBlock from "../components/ProjectBlock";
import NavBar from "../components/NavBar";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { IoAdd } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import '../css/startPageAndProjectBlock.css';
// import ProgressBar from "../components/ProgressBar";
import { setProjectNow } from "../store/slices/projectSlice";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProjects());  // ✅ 發送 API 請求
    }, [dispatch]);

    // ✅ 正確取得 Redux state
    const { projects, status, errorMessage } = useSelector((state) => state.projects);

    console.log("🔍 Redux projects:", projects); // 🔍 確保 Redux 正確存取資料
    console.log("🔍 Redux status:", status);

    // ✅ API 請求中，顯示 Loading
    if (status === "loading") {
        return <p>Loading...</p>;
    }

    // ✅ API 錯誤，顯示錯誤訊息
    if (status === "failed") {
        return <p>Error: {errorMessage}</p>;
    }

    return (
        <>
            <NavBar />
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
                                <div key={project.projectID} onClick={() => dispatch(setProjectNow(project))}>
                                    <ProjectBlock projectInfo={project} />
                                </div>
                            ))
                        ) : (
                            <p>🚀 沒有專案，請新增！</p>
                        )}
                    </Container>
                </Tab>
                {/* <Tab eventKey="Asia" title="亞洲" className="tab">
                    Tab content for Asia
                    <ProgressBar />
                </Tab> */}
                <Tab eventKey="add" title={<IoAdd />} className="tab">
                    Tab content for Adding New Project
                </Tab>
            </Tabs>
            <IoIosAddCircle className="toolIcon" onClick={() => navigate('/newProject')}/>
        </>
    );
};

export default StartPage;
