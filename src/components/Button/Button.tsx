import styles from './Button.module.css';
import { ButtonProps } from './interface';



const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, variant = 'primary' }) => {
    return (
        <button className={styles.button + ' ' + styles[`${variant}`]} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
}

export default Button;