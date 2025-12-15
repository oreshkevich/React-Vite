import React, {MouseEventHandler, PropsWithChildren} from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  variant = 'primary',
  onClick,
  disabled,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
