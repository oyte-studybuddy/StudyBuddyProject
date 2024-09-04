import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, onClose }) => {
  // Create a div to serve as the modal root
  const modalRoot = document.getElementById('modal-root') || document.createElement('div');
  if (!modalRoot.id) {
    modalRoot.id = 'modal-root';
    document.body.appendChild(modalRoot);
  }

  useEffect(() => {
    return () => {
      if (modalRoot && modalRoot.parentNode) {
        modalRoot.parentNode.removeChild(modalRoot);
      }
    };
  }, [modalRoot]);

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
