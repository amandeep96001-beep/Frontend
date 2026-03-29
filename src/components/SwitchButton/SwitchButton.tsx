import React from 'react';
import styles from './styles/SwitchButton.module.css';

interface SwitchButtonProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ isChecked, onChange }) => {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default SwitchButton;