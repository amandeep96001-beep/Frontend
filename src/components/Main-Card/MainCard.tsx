import React from 'react';
import styles from './styles/MainCard.module.css';
import { IMainCardProps } from './interface';

const MainCard: React.FC<IMainCardProps> = ({ children }: IMainCardProps) => (
    <div className={styles.mainCard}>
        {children}
    </div>
);

export default MainCard;