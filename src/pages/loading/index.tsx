import Loader from "../../components/loader";
import styles from "./loading.module.scss";

const Loading = () => {
    return(
        <div className={styles.container}>
            <Loader position="center"/>
        </div>
    );
}

 export default Loading;