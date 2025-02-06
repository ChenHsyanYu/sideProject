import NavBar from "../components/NavBar";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { IoAdd } from "react-icons/io5";
import ProjectBlock from "../components/ProjectBlock";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { IoIosAddCircle } from "react-icons/io";

const StartPage = () => {
    const [projects, setProjects] = useState(
        [
            {
                id: 0
            },
            {
                id: 1
            },
            {
                id: 2
            }
        ]
    )

    return(
        <>
            <NavBar></NavBar>
            <Tabs
                defaultActiveKey="all"
                id="fill-tab-example"
                className="mb-3"
                fill
                variant='underliine'
            >
                <Tab eventKey="all" title="全部" className="tab">
                    <Container className="projectCards">
                        {projects.map(project => (
                            <Row><ProjectBlock key={project.id}/></Row>
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