import { Button } from "../../components/button";
import Input from "../../components/input";
import Modal from "../../components/modal";
import ProjectCard from "../../components/project-card";
import styles from "./projects.module.scss";
import {useState, useRef}  from 'react';
import Header from "../../components/header";
import AppContainer from "../../components/app-container";
import { useTypesSelector } from "../../hooks/useTypesSelector";
import {useEffect} from "react";
import { useAction } from "../../hooks/useAction";
import Loading from "../loading";
import Loader from "../../components/loader";

const Projects = () => {
    const [modal, setModal] = useState<boolean>(false);
    const [requestIsSend, setRequestIsSend] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const state = useTypesSelector(state => state.project);
    const {fetchProjects} = useAction();
    const {createProject} = useAction();

    useEffect(() => {
        fetchProjects()
    }, []) 

    if(state.loading) {
        return <Loading />
    }

    const handleModal = () => {
        setModal(prev => !prev)
    }

    const handleCreateProject = () => {
        setRequestIsSend(prev => !prev)

        const project = {
            name: inputRef.current?.value
        }

        createProject(project);
        setRequestIsSend(prev => !prev)
    }

    return(
        <>
        <Header />
            <AppContainer padding="65px 0px 0px 0px">
                <div className={styles.projects}>
                    {modal && 
                    <Modal onClose={handleModal}>
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <div className={styles.inputBox}>
                                <Input placeholder="Project name" inputRef={inputRef}/>
                            </div>
                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                                {requestIsSend ? <Loader position="center"/> : <Button title="Create" onClick={handleCreateProject}/>}
                            </div>
                        </div>
                    </Modal>
                    }
                    <div className={styles.controlls}>
                        <Button title="Create project" onClick={handleModal}/>
                    </div>  

                    <div className={styles.cardList}>
                        {state.projects.length <= 0 && 
                        <div>Create your first project</div>
                        }
                        {state.projects.map((project, key) => {
                            return <ProjectCard card={project} key={key}/>
                        })}
                    </div>
                </div>
            </AppContainer>
        </>
    );
}

export default Projects;