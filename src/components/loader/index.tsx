import styles from "./loader.module.scss";

interface IPosition {
    position?: 'flex-start' | 'center' | 'flex-end';
  }

const Loader = ({ position } : IPosition) => {
    return(
        <div className={styles.container}
        style={{justifyContent: position}}>
            <div className={styles.loader}></div>
        </div>
    );
}

export default Loader;