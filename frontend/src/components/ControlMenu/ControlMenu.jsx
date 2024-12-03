import styles from './ControlMenu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faBars,
    faRotateLeft, 
    faRotateRight, 
    faShare,
    faArrowUpFromBracket,
    faXmark,
    faFileArchive,
    faSignOut,
    faDoorOpen,
    faUpload,
    faFileImport
 } from '@fortawesome/free-solid-svg-icons' 
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PopupModal from '../popupWindow/PopupModal'


const ControlMenu = ({ onExportPNG, onExportJSON, onExportXML, onImport, onUndo, onRedo ,roomId}) => {

    const [exapand, setExpand] = useState(false);
    const inputRef = useRef();

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(roomId)
          .then(() => {
            alert(`Room Id: ${roomId}\ncopied to clipboard!`);
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
          });
    };
    return(
        <div className={styles.ControlMenu}>
            <button className={styles.expandBtn} onClick={() => {
                setExpand(!exapand);
                closeModal();
            }}>
                {exapand?<FontAwesomeIcon icon={faXmark} />:<FontAwesomeIcon icon={faBars} />}
                
            </button>
            <div className={exapand?styles.expanded:styles.collapsed}>
                <button onClick={onUndo}><FontAwesomeIcon icon={faRotateLeft} /></button>
                <button onClick={onRedo}><FontAwesomeIcon icon={faRotateRight} /></button>
                <button><FontAwesomeIcon icon={faShare} onClick={handleCopy} /></button>
                <button onClick={() => inputRef.current.click()}><FontAwesomeIcon icon={faFileImport} /></button>
                <input
                    ref={inputRef}
                    type="file"
                    accept=".json,.xml"
                    style={{ display: "none" }} // Hide the input
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) onImport(file);
                    }}
                />
                <button 
                    onClick={openModal} 
                    className={styles.exportButton}
                >
                    <FontAwesomeIcon icon={faArrowUpFromBracket} />
                </button>
                {isOpen &&(<PopupModal className={styles.button} closeModal={closeModal}
                    onExportPNG={onExportPNG} onExportJSON={onExportJSON} onExportXML={onExportXML}
                />)}
                <button>
                    <Link className={styles.danger} to={"/Home"}><FontAwesomeIcon icon={faDoorOpen} /></Link>
                </button>
            </div>
        </div>
    )
}

export default ControlMenu;