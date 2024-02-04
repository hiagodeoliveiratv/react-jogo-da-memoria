import { Svg } from "../types/Svg";
import styles from './SvgItem.module.css';
import b7 from '../svgs/b7.svg';

type Props = {
    svg: Svg;
    handleSelect: ( svg: Svg, s_key: number ) => void;
    s_key: number;
    markeds: number[];
}

export const SvgItem = ( { svg, s_key, handleSelect,  markeds} : Props )=>{

    return (
        <div 
            className={`
                ${styles.svgItem} ${markeds.includes(s_key) ? styles.selected :'' }                
            `}
            onClick={!markeds.includes(s_key) ? ()=> handleSelect(svg, s_key) : undefined}
        >

            {!markeds.includes(s_key) &&             
                <img src={b7} alt="" />
            }
            {markeds.includes(s_key) && 
                <img src={require(`../svgs/${svg.icon}`)} alt="" />
            }

     
        </div>
      
    );
}