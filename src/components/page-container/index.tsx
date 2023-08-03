import Header from "../header";
import styles from "./page-container.module.scss";

type Props = {
    children?: JSX.Element,
  }

const PageContainer = ({children} : Props) => {
    return(
        <div className={styles.container}>
            <Header />
            {children}
        </div>
    );
}

export default PageContainer;