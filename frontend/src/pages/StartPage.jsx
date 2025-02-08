import NavBar from "../components/NavBar";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { IoAdd } from "react-icons/io5";
import ProjectBlock from "../components/ProjectBlock";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { IoIosAddCircle } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../store/slices/projectSlice";

const StartPage = () => {
    const dispatch = useDispatch();
    const [projects, setProjects] = useState([])
    const {fetchedProject, status, errorMessage} = useSelector((state) => state.projects.projects)

    useEffect(() =>{
        dispatch(fetchProjects());  // 發送 API 請求
    }, [dispatch]);
    
    useEffect(() => {
        setProjects(fetchedProject);  // Redux 狀態改變時同步更新
    }, [fetchedProject]);
    

    return(
        <>
            <NavBar></NavBar>
            <Tabs
                defaultActiveKey="all"
                id="fill-tab-example"
                className="mb-3"
                fill
                variant='underline'
            >
                <Tab eventKey="all" title="全部" className="tab">
                    <Container className="projectCards">
                        {projects.map(project => (
                            <Row><ProjectBlock key={project.projectID} name={project.projectName}/></Row>
                        ))}
                    </Container>
                    
                </Tab>
                <Tab eventKey="Asia" title="亞洲" className="tab">
                    Tab content for Profile
                </Tab>
                <Tab eventKey="add" title={<IoAdd/>} className="tab">
                    Tab content for Loooonger Tab
                </Tab>

            </Tabs>
            <IoIosAddCircle className="toolIcon"/>
        </>
    )
}

export default StartPage;