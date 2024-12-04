import React, { useState, useEffect } from 'react';
import styles from './WeightSlider.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderTopLeft } from '@fortawesome/free-solid-svg-icons';

function WeightSlider({ initialWidth, onWidthChange }) {
  const [width, setWidth] = useState(initialWidth);

  const handleInputChange = (e) => {
    setWidth(Number(e.target.value));
  };

  // Trigger the parent's callback whenever the width changes
  useEffect(() => {
    onWidthChange(width);
  }, [width, onWidthChange]);

  return (
    <div className={styles.container}>
      <button className={styles.button}><FontAwesomeIcon icon={faBorderTopLeft}/></button>
      <div className={styles.sliderContainer}>
        <label htmlFor="weightSlider">Stroke:</label>
        <input
          id="weightSlider"
          type="range"
          min="0"
          max="100"
          value={width}
          onChange={handleInputChange}
          className={`${styles.slider}`}
        />
        <p>{width}</p>
      </div>
    </div>
  );
}

export default WeightSlider;