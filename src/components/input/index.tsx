import styles from "./input.module.scss";

type Props = {
    placeholder?: string,
    inputRef?: React.Ref<HTMLInputElement>,
    margin?: string,
    onChange?: () => void
}

const Input = ({placeholder, inputRef, margin,onChange} : Props) => {
    return(
        <input style={{margin: margin}} 
        ref={inputRef}
         placeholder={placeholder}
          className={styles.input}></input>
    );
}

export default Input;