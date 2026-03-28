import React from 'react';
import styles from './RadioButton.module.css';

interface RadioButtonProps {
  name: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ name, options, selectedValue, onChange }) => {
  return (
    <div className={styles.radioGroup}>
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