import styles from "./sidebar.module.scss";
import { SidebarList } from './list';
import {useState, useRef}  from 'react';
import Modal from "../modal";
import Input from "../input";
import { Button } from "../button";
import { useAction } from "../../hooks/useAction";
import { useParams } from "react-router-dom";
import Loader from "../loader";

const Sidebar = () => {
    const [modalFolder, setModalFolder] = useState(false);
    const {createFolder} = useAction();
    const inputRef = useRef<HTMLInputElement>(null);
    const {id} = useParams();
    const [requestIsSend, setRequestIsSend] = useState(false);

    const handleModal = () => {
        setModalFolder(prev => !prev)
    }

    const handleCreateFolder = () => {
        const name = inputRef.current?.value as string;

        if(name.length <= 0) {
            return;
        }
        setRequestIsSend(true)

        const model = {
            name: name
        }

        createFolder(model, id as string)

        setRequestIsSend(prev => !prev)
    }

    return(
        <div>
            <div className={styles.sidebar}>
                <div className={styles.top}>
                    <span>Project:</span>
                </div>
                <div className={styles.buttonBox}>
                    <Button title="Add folder" 
                    onClick={handleModal} 
                    padding="2px 10px" 
                    backgroundColor="#1976d2" 
                    color="white"/>
                </div>
                    <SidebarList />
            </div>
            {modalFolder && 
                <Modal onClose={handleModal}>
                    <div>
                        <Input placeholder="Folder name" inputRef={inputRef}/>

                        <div style={{display: "flex", justifyContent: "flex-end"}}>
                            {requestIsSend ? <Loader position="center"/> 
                            : <Button title="Create" onClick={handleCreateFolder}/>}
                        </div>
                    </div>
                </Modal>}
        </div>
    );
}

export default Sidebar;