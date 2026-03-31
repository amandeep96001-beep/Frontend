import React from 'react';
import styles from './styles/InputField.module.css';

interface InputFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  className?: string;
  multiline?: boolean;
  rows?: number;
  variant?: 'default' | 'calendar' | 'discount' | 'dropdown';
  currencySymbol?: string;
  onCalendarClick?: () => void;
  calendarIcon?: React.ReactNode;
  dropdownOptions?: { label: string; value: string }[];
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  className = '',
  multiline = false,
  rows = 5,
  variant = 'default',
  currencySymbol = '$',
  onCalendarClick,
  calendarIcon,
  dropdownOptions,
  disabled = false,
}) => {
  return (
    <div className={`${styles.inputFieldContainer} ${className}`}>
      <label className={styles.label}>{label}</label>
      {variant === 'discount' ? (
        <div className={styles.discountInputWrapper}>
          <span className={styles.currencyPrefix}>{currencySymbol}</span>
          <input
            className={`${styles.input} ${styles.discountInput}`}
            type="number"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        </div>
      ) : variant === 'calendar' ? (
        <div className={styles.calendarContainer}>
          <input
            className={`${styles.input} ${styles.calendarInput}`}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={!!onCalendarClick}
            onClick={onCalendarClick}
            disabled={disabled}
          />
          <span
            className={styles.calendarIcon}
            onClick={onCalendarClick}
          >
            {calendarIcon || (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" fill="#f3f4f6" stroke="#64748b" strokeWidth="1.5"/><path d="M16 3v4M8 3v4" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/><path d="M3 9h18" stroke="#64748b" strokeWidth="1.5"/></svg>
            )}
          </span>
        </div>
      ) : multiline ? (
        <textarea
          className={styles.textarea}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          disabled={disabled}
        />
      ) : variant === 'dropdown' ? (
        <div className={styles.dropdown}>
          <select
            className={styles.input}
            value={value}
            onChange={(e) => onChange && onChange(e as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)}
            disabled={disabled}
          >
            <option value="" disabled>{placeholder}</option>
            {dropdownOptions?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <input
          className={styles.input}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default InputField;
