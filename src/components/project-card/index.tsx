import { useNavigate } from "react-router-dom";
import ICard from "../../interfaces/project";
import styles from "./project-card.module.scss";

type Props = {
    card: ICard
}

const ProjectCard = ( {card}: Props) => {
    const navigate = useNavigate();

    return(
        <div className={styles.container} onClick={() => navigate(`${card.id}`)}>
            <div className={styles.projectCard}>
                <div className={styles.projectImage} style={{backgroundImage: `url(${card.imageUrl})`}}>
                </div>
                <div className={styles.cardInfo}>
                    <div className={styles.cardName}>{card.name}</div>
                    <p className={styles.cardDescription}>{card.description}</p>
                    <div className={styles.infoButtom}>
                        <div>
                            <span>Memebers: {card.membersCount}</span>
                        </div>
                        <div>
                            <span>Updated: {card.updatedAtUtc.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;