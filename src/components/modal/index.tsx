import styles from "./modal.module.scss";
import React, {useEffect}  from 'react';

type Props = {
    children?: JSX.Element,
    onClose?: () => any
}

const Modal = ({children, onClose} : Props) => {

    useEffect(() => {
        document.body.style.overflowY = "hidden";


        return () => {
            document.body.style.overflowY = "auto";
        }
    }, [])

    return(
        <div className={styles.modal}>
            <div className={styles.container}>
                <div className={styles.top}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;