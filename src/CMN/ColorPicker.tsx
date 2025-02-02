import React, {createRef, useEffect, useState} from "react";

interface ColorPickerProps{
    color: string;
    onChange: (color: string) => void;
    style?: any;
}
export function ColorPickerKL({color,onChange,style}:ColorPickerProps){
    const [_color,setColor] = useState<string>('#000000');
    const inputRef = createRef<HTMLInputElement>();
    useEffect(()=>{
        setColor(color);
    },[color]);
    const [time,setTime] = useState<any|undefined>(undefined);
    return(
        <div style={{...style,display:'inline-block',backgroundColor:_color}}
             onClick={()=>{
            inputRef.current?.click();
        }}>
            <input ref={inputRef} type={'color'} value={_color} onChange={(e)=> {
                setColor(e.target.value);
                if (time !== undefined) {

                    clearTimeout(time);
                }
                setTime(setTimeout(() => {
                    onChange(_color);
                }, 1000));
            }

            } style={{display:'none'}}
            />
        </div>
    )
}