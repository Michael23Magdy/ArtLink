import React, { useState, useEffect } from 'react';
import styles from './ShapeSelector.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  
    faDrawPolygon,
    faShapes,
} from '@fortawesome/free-solid-svg-icons';
import TOOLS from '../../../Tools/Tools';
import { isShape } from '../../utils';


function ShapeSelector({ selectedTool, setSelectedTool }) {
  return (
    <div className={styles.container}>
      <button className={`${styles.button} ${isShape(selectedTool)?styles.selected:''}`}>
        {
          selectedTool==TOOLS.LINE?<span className={styles.line}></span>:
          selectedTool==TOOLS.RECTANGLE?<span className={styles.rectangle}></span>:
          selectedTool==TOOLS.CIRCLE?<span className={styles.circle}></span>:
          selectedTool==TOOLS.ELLIPSE?<span className={styles.elipse}></span>:
          selectedTool==TOOLS.POLYGON?<FontAwesomeIcon icon={faDrawPolygon}/>:
          selectedTool==TOOLS.TRIANGLE?<span className={styles.triangle}>&#9651;</span>:
          <FontAwesomeIcon icon={faShapes}/>
        }
      </button>
      <div className={styles.shapesMenu}>
        <button onClick={()=>setSelectedTool(TOOLS.LINE)}><span className={styles.line}></span></button>
        <button onClick={()=>setSelectedTool(TOOLS.RECTANGLE)}><span className={styles.rectangle}></span></button>
        <button onClick={()=>setSelectedTool(TOOLS.CIRCLE)}><span className={styles.circle}></span></button>
        <button onClick={()=>setSelectedTool(TOOLS.ELLIPSE)}><span className={styles.elipse}></span></button>
        <button onClick={()=>setSelectedTool(TOOLS.POLYGON)}><FontAwesomeIcon className={styles.polygon} icon={faDrawPolygon}/></button>
        <button onClick={()=>setSelectedTool(TOOLS.TRIANGLE)}><span className={styles.triangle}>&#9651;</span></button>
      </div>
    </div>
  );
}

export default ShapeSelector;