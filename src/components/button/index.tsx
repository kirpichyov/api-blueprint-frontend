import styles from "./button.module.scss";

type Props = {
    title: string,
    borderColor?: string,
    color?: string,
    onClick?: () => any,
    padding?: string,
    backgroundColor? : string
  };

export const Button = ({title, borderColor, color, onClick, padding, backgroundColor} : Props) => {
    return(
        <button className={styles.button}
        onClick={onClick}
        style=
        {{
            borderColor: borderColor,
            color: color,
            padding: padding,
            backgroundColor: backgroundColor
        }}>
            {title}
        </button>
    );
}

