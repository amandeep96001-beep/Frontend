import React, { useEffect, useRef, useState } from 'react';
import styles from './DatePicker.module.css';
import inputStyles from './InputField.module.css';

interface DatePickerProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

const DatePicker: React.FC<DatePickerProps> = ({
    label = '',
    placeholder = 'Select date',
    value = '',
    onChange,
    className = '',
}) => {
    const today = new Date();
    const [open, setOpen] = useState(false);
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [selected, setSelected] = useState<string>(value);
    const [dropUp, setDropUp] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleToggle = () => {
        if (!open && inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            setDropUp(spaceBelow < 310);
        }
        setOpen(o => !o);
    };

    const displayValue = selected
        ? new Date(selected + 'T00:00:00').toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
        })
        : '';

    const handleDayClick = (day: number) => {
        const m = String(viewMonth + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        const dateStr = `${viewYear}-${m}-${d}`;
        setSelected(dateStr);
        onChange?.(dateStr);
        setOpen(false);
    };

    const prevMonth = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
        else setViewMonth(m => m - 1);
    };

    const nextMonth = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
        else setViewMonth(m => m + 1);
    };

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();

    const selectedParts = selected ? selected.split('-').map(Number) : null;
    const isSelected = (day: number) =>
        !!selectedParts &&
        selectedParts[0] === viewYear &&
        selectedParts[1] - 1 === viewMonth &&
        selectedParts[2] === day;

    const isToday = (day: number) =>
        today.getFullYear() === viewYear &&
        today.getMonth() === viewMonth &&
        today.getDate() === day;

    return (
        <div className={`${inputStyles.inputFieldContainer} ${className}`} ref={containerRef} style={{ position: 'relative' }}>
            {label && <label className={inputStyles.label}>{label}</label>}
            <div className={styles.inputRow}>
                <input
                    ref={inputRef}
                    className={inputStyles.input}
                    style={{ width: '100%', cursor: 'pointer', paddingRight: '2.5rem' }}
                    type="text"
                    readOnly
                    placeholder={placeholder}
                    value={displayValue}
                    onClick={handleToggle}
                />
                <span className={styles.calendarIcon} onClick={handleToggle}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                        <rect x="3" y="5" width="18" height="16" rx="2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M16 3v4M8 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                </span>
            </div>

            {open && (
                <div
                    className={styles.popup}
                    style={dropUp
                        ? { bottom: 'calc(100% + 4px)', top: 'auto' }
                        : { top: 'calc(100% + 4px)', bottom: 'auto' }
                    }
                >
                    <div className={styles.header}>
                        <button className={styles.navBtn} onClick={prevMonth}>&#8249;</button>
                        <span className={styles.monthYear}>{MONTHS[viewMonth]} {viewYear}</span>
                        <button className={styles.navBtn} onClick={nextMonth}>&#8250;</button>
                    </div>
                    <div className={styles.grid}>
                        {DAYS.map(d => <span key={d} className={styles.dayName}>{d}</span>)}
                        {Array.from({ length: firstDay }).map((_, i) => <span key={`e-${i}`} />)}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            return (
                                <button
                                    key={day}
                                    className={[
                                        styles.day,
                                        isSelected(day) ? styles.selected : '',
                                        isToday(day) && !isSelected(day) ? styles.today : '',
                                    ].join(' ')}
                                    onClick={() => handleDayClick(day)}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatePicker;
