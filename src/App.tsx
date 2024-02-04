import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { listSvg } from './data/listSvg';
import { Svg } from './types/Svg';
import { SvgItem } from './components/SvgItem';
import { formatTime } from './helpers/formatTime';
import { shuffleArray } from './helpers/shuffleArray';

const App = ()=>{

    const [ listSvgs, setListSvgs ] = useState( shuffleArray([...listSvg, ...listSvg]) );
    const [ seconds, setSeconds] = useState<number>(0);
    const [ playing, setPlaying ] = useState<boolean>(true);
    const [ moviments, setMoviments ] = useState<number>(0);
    const [ selecteds, setSelecteds ] = useState<Svg[]>([]);
    const [ markeds, setMarkeds ] = useState<number[]>([]);
    const [ clickCount, setClickCount ] = useState(0);
    
    // armazena a lista dos já selecionados
    const handleSelect = (svg: Svg, key: number)=>{

        setSelecteds([...selecteds, svg]);
        setMarkeds([...markeds, key]);
        setMoviments( (prevMoviments) => prevMoviments+=1 );
        setClickCount( (prevClickCount) => prevClickCount + 1);
        
    }

    const checkSvgs = ()=>{
        // Verifico se o último svg é igual ao penúltimo

        const lastSvg = selecteds[selecteds.length - 1];
        const penultimateSvg = selecteds[selecteds.length - 2];

        // É diferente
        if(lastSvg !== penultimateSvg){

            // Removo os 2 últimos svgs
            const cloneSelecteds = [...selecteds];
            cloneSelecteds.splice(-2);

            setSelecteds(cloneSelecteds);
            

            const cloneMarkeds = [...markeds];
            cloneMarkeds.splice(-2);

            setMarkeds(cloneMarkeds);

        } 
        
        setClickCount(0);

        if(markeds.length === 12){
            setPlaying(false);
        }

    }

    useEffect(()=>{
        if(clickCount === 2){
            setTimeout(checkSvgs, 500);
        }
    }, [clickCount]);

    useEffect(()=>{
        const timer = setInterval(()=>{
            if(playing) setSeconds(seconds + 1);
              
            
        },1000);
        return ()=> clearInterval(timer);
    }, [playing, seconds]);

    const handleReload = ()=>{
        setPlaying(true);
        setSeconds(0);
        setMarkeds([]);
        setSelecteds([]);
        setMoviments(0);

        // Embaralho novamente o array
        setListSvgs(shuffleArray([...listSvg, ...listSvg]));
    }
        
    return (

        <div className={styles.container}>

            <div className={styles.leftSide}>

                <div className={styles.logo}>
                    <img src={require('./assets/devmemory_logo.png')} alt="" />
                </div>

                <div className={styles.infoArea}>

                    <div>
                        <p>Tempo</p>
                        <h1>{formatTime(seconds)}</h1>
                    </div>
                    
                    <div>
                        <p>Movimentos</p>
                        <h1>{moviments}</h1>
                    </div>

                    <button onClick={handleReload}>Reiniciar</button>
                </div>

            </div>

            <div className={styles.rightSide}>

                <div className={styles.gridArea}>
                    {listSvgs.map((svg, key)=>
                        <SvgItem key={key} s_key={key} svg={svg}   handleSelect={handleSelect}  markeds={markeds}/>
                    )}
                </div>

            </div>

        </div>
    );

}

export default App;