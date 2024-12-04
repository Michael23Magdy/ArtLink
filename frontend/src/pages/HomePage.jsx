import { useEffect, useState } from 'react';
import styles from './HomePage.module.css'
import logo4 from '../assets/logo4.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { generateRoomId } from '../components/utils';


function HomePage(){
    const [roomId, setRoomId] = useState('');

    const handleInputChange = (event) => {
        setRoomId(event.target.value);
    };

    useEffect(() => {
        document.title = "Art Link - Join A Room";
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.brandingSection}>
                <img className={styles.logo} src={logo4} alt="Art Link" />
                <p>Draw, Create, Collaborate </p>
                <p>Unleash the Artist in Everyone!</p>
            </div>
            <div className={styles.joinSection}>
                <Link className={styles.button} to={`/Room/${generateRoomId()}`}><FontAwesomeIcon icon={faPlus}/> Create New Room</Link>
                <p>or</p>
                <input
                    type="text"
                    placeholder='Enter A Code'
                    value={roomId}
                    onChange={handleInputChange}
                />
                <Link className={`${styles.button} ${roomId?'':styles.disabled}`}
                        to={roomId?`/Room/${roomId}`:'/Home'}>Join</Link>
            </div>
        </div>
    )
}

export default HomePage;