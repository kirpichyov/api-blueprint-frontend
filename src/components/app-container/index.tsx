import React from "react";
import styles from "./app-container.module.scss";

type Props = {
    children?: JSX.Element,
    padding? : string,
    margin? : string
  }

const AppContainer = ({children, margin, padding}: Props) => {

    return(
        <div style={{margin: margin, padding: padding}} className={styles.appContainer}
        >
            {children}
        </div>
    );
}

export default AppContainer;