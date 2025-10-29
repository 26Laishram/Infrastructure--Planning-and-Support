// Modal.jsx
import React from "react";

function Modal({ children, onClose }) {
  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        maxHeight: "90vh",
        overflowY: "auto",
        width: "565px",
        position: "relative"
      }}>
        <button 
          onClick={onClose} 
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
