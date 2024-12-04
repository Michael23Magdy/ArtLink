import { useEffect, useState } from 'react';
import styles from './HomePage.module.css'
import logo4 from '../assets/logo4.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { generateRoomId } from '../components/utils';


function NotCompatible(){
    useEffect(() => {
        document.title = "Art Link - Not Compatible";
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.brandingSection}>
                <img className={styles.logo} src={logo4} alt="Art Link" />
                <p>Draw, Create, Collaborate </p>
                <p>Unleash the Artist in Everyone!</p>
            </div>
            <div className={styles.notCompatSection}>
                <h1>Not Compatible with Touch Screens Yet</h1>
                <p>Our application requires a mouse or trackpad to work correctly. Please use a device with a mouse.</p>
            </div>
        </div>
    )
}

export default NotCompatible;