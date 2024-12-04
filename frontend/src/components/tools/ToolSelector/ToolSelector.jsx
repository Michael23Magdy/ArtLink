import React, { useState, useEffect } from 'react';
import styles from './ToolSelector.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  
    faDrawPolygon,
    faEraser,
    faPencil,
    faShapes,
    faTools,
} from '@fortawesome/free-solid-svg-icons';
import TOOLS from '../../../Tools/Tools';
import { isShape, isDrawingTool } from '../../utils';


function ToolSelector({ selectedTool, setSelectedTool }) {
  return (
    <div className={styles.container}>
      <button className={`${styles.button} ${isDrawingTool(selectedTool)?styles.selected:''}`}>
        {
          selectedTool==TOOLS.PENCIL?<FontAwesomeIcon icon={faPencil}/>:
          selectedTool==TOOLS.ERASER?<FontAwesomeIcon icon={faEraser}/>:
          <FontAwesomeIcon icon={faTools}/>
        }
      </button>
      <div className={styles.shapesMenu}>
        <button onClick={()=>setSelectedTool(TOOLS.PENCIL)}><FontAwesomeIcon icon={faPencil}/></button>
        <button onClick={()=>setSelectedTool(TOOLS.ERASER)}><FontAwesomeIcon icon={faEraser}/></button>

      </div>
    </div>
  );
}

export default ToolSelector;