import React, {ReactNode} from 'react';
import {createPortal} from 'react-dom';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const ModalRoot: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};

const Header: React.FC<{children?: ReactNode}> = ({children}) => (
  <div className={styles.header}>{children}</div>
);

const Body: React.FC<{children?: ReactNode}> = ({children}) => (
  <div className={styles.body}>{children}</div>
);

const Footer: React.FC<{children?: ReactNode}> = ({children}) => (
  <div className={styles.footer}>{children}</div>
);

type ModalType = typeof ModalRoot & {
  Header: typeof Header;
  Body: typeof Body;
  Footer: typeof Footer;
};

const Modal = ModalRoot as ModalType;
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export {Modal};
