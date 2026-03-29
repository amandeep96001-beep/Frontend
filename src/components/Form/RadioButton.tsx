import React from 'react';
import styles from './styles/RadioButton.module.css';

interface RadioButtonOption {
  label: string;
  value: string;
}

interface RadioButtonProps {
  name: string;
  options: RadioButtonOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  direction?: 'row' | 'column'; 
}

const RadioButton: React.FC<RadioButtonProps> = ({ name, options, selectedValue, onChange, direction = 'column' }) => {
  return (
    <div className={styles.radioGroup} style={{ flexDirection: direction }}>
      {options.map((option) => (
        <label key={option.value} className={styles.radioLabel}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className={styles.radioInput}
          />
          <span className={styles.radioCustom}></span>
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButton;