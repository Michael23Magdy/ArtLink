import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTimes, 
    faFileImage, 
    faFileCode,
    faArrowUpFromBracket 
} from '@fortawesome/free-solid-svg-icons';
import styles from './PopupModal.module.css';

const PopupModal = ({ onExportPNG, onExportJSON, onExportXML, closeModal }) => {
  

  const handleExportPNG = () => {
    onExportPNG();
    closeModal();
  };

  const handleExportJSON = () => {
    onExportJSON();
    closeModal();
  };

  const handleExportXML = () => {
    onExportXML();
    closeModal();
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupModal}>
        <div className={styles.popupHeader}>
          <h2>Export Options</h2>
          <button onClick={closeModal} className={styles.closeBtn}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className={styles.popupContent}>
          <div className={styles.modalButtons}>
            <button 
              className={`${styles.modalBtn} ${styles.btnBlue}`}
              onClick={handleExportPNG}
            >
              <FontAwesomeIcon icon={faFileImage} />
              Export PNG
            </button>
            <button 
              className={`${styles.modalBtn} ${styles.btnGreen}`}
              onClick={handleExportJSON}
            >
              <FontAwesomeIcon icon={faFileCode} />
              Export JSON
            </button>
            <button 
              className={`${styles.modalBtn} ${styles.btnRed}`}
              onClick={handleExportXML}
            >
              <FontAwesomeIcon icon={faFileCode} />
              Export XML
            </button>
          </div>
        </div>

        <div className={styles.popupFooter}>
          <button 
            onClick={closeModal} 
            className={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;