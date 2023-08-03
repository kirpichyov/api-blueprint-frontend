import AuthContext from "../../services/auth/AuthContext";
import styles from "./header.module.scss";

const Header = () => {

    const logout = () => {
        AuthContext.logout();
        window.location.reload();
    }

    return(
        <header className={styles.header}>
            <div className={styles.left}>
                <span className={styles.logo}>api-blueprint</span>
            </div>
            {AuthContext.isLoggedIn() &&
            <div className={styles.right}>
                <a href="/projects">Projects</a>
                <a onClick={logout}>Sign out</a>
            </div>  
            }

        </header>
    );
}

export default Header;