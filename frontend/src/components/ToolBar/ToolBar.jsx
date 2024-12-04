import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ToolBar.module.css'
import { 
    faAngleUp,
    faArrowPointer,
    faPencil,
    faImage
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import ColorPicker from '../tools/ColorPicker/ColorPicker';
import WeightSlider from '../tools/WeightSlider/WeightSlider';
import ShapeSelector from '../tools/ShapeSelector/ShapeSelector';
import ToolSelector from '../tools/ToolSelector/ToolSelector';
import TOOLS from '../../Tools/Tools';
import { isShape } from '../utils';


function ToolBar({
    fillColor, setFillColor,
    strokeColor, setStrokeColor,
    strokeWidth, setStrokeWidth,
    selectedTool, setSelectedTool
  }){
    const [expand, setExpand] = useState(false);
    
    return (
        <div className={`${styles.ToolBar} ${expand ? '' : styles.translateDown}`}>
            <button 
                className={`${styles.arrowbtn} ${expand ? styles.horizontalflip : ''}`} 
                onClick={() => setExpand(!expand)}
            >
                <FontAwesomeIcon icon={faAngleUp} />
            </button>
            <div className={styles.ToolBtns}>
                <button className={selectedTool==TOOLS.SELECT?styles.selected:''} onClick={()=>setSelectedTool(TOOLS.SELECT)}><FontAwesomeIcon icon={faArrowPointer} /></button>
                <ToolSelector selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
                <ShapeSelector selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
                <button className={selectedTool==TOOLS.IMAGE?styles.selected:''} onClick={()=>setSelectedTool(TOOLS.IMAGE)}><FontAwesomeIcon icon={faImage} /></button>
                <button className={selectedTool==TOOLS.TEXT?styles.selected:''} onClick={()=>setSelectedTool(TOOLS.TEXT)}>T</button>

                <WeightSlider initialWidth={strokeWidth} onWidthChange={setStrokeWidth}/>
                <ColorPicker initialColor={strokeColor} onColorChange={setStrokeColor}/>
                <ColorPicker initialColor={fillColor} onColorChange={setFillColor}/>
            </div>
        </div>
    )
}

export default ToolBar;