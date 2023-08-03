import { Link } from "react-router-dom";
import Header from "../../components/header";
import styles from "./not-found.module.scss";
import AuthContext from "../../services/auth/AuthContext";

const NotFound = () => {
    return(
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <div className={styles.emoji}>
                    🥺 
                </div>
                <span>404</span>
                <h3>PAGE NOT FOUND</h3>
                {AuthContext.isLoggedIn() ? 
                    <Link to='/projects' style={{color: '#1976d2'}}>Back to projects</Link>
                :   <Link to='/auth' style={{color: '#1976d2'}}>Login to your account</Link>
                }
            </div>
        </div>
    );
}

export default NotFound;