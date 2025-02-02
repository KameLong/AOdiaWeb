import {createRef, useEffect} from "react";
import styles from "./timetable.module.scss";

export function MatchTextLabel({children,style}:{children:React.ReactNode,style?:React.CSSProperties}){
    const ref=createRef<HTMLSpanElement>();
    useEffect(() => {
        const element = ref.current;
        if (element && element.parentElement, element.offsetWidth) {
            const scale = Math.min(1, (element.parentElement.offsetWidth-2) / element.offsetWidth);
            element.style.transform = `scaleX(${scale})`;
        }
    }, [children]);

    return <span style={{...style,display:"inline-block",overflow:'hidden'}} className={styles.matchTextLabel} ref={ref}>
        {children}
    </span>

}