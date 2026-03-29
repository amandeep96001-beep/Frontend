import styles from './styles/Button.module.css';
import { ButtonProps } from './interface';

const Button: React.FC<ButtonProps & { className?: string }> = ({
    label,
    onClick,
    disabled,
    variant = 'primary',
    className = '',
    icon,
    loading = false,
    fullWidth = false,
    type = 'button',
    ...rest
}) => {
    return (
        <button
            className={[
                styles.button,
                styles[variant],
                fullWidth ? styles.fullWidth : '',
                className
            ].filter(Boolean).join(' ')}
            onClick={onClick}
            disabled={disabled || loading}
            type={type}
            {...rest}
        >
            {loading ? (
                <span className={styles.loader} />
            ) : icon ? (
                <span className={styles.icon}>{icon}</span>
            ) : null}
            {label}
        </button>
    );
};

export default Button;