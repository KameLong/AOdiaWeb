import {useEffect} from "react";
import {WebOuDia} from "./App.tsx";

export function Top({webOuDia}:{webOuDia:WebOuDia}){
    useEffect(()=>{
        console.log(webOuDia);
        webOuDia.setMenuOpen(true);
    },[])
    return (
        <div>
        </div>
    )
}