import "./Modal.css";

const Modal = ({ children, onClose }) => {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}   // 👈 close when clicking overlay
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // 👈 prevent close when clicking inside
      >
        <button className="close-btn" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;