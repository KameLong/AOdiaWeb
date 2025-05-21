import style from './TextInput.module.css';
export function TextInput(){
    return (
            <input style={{border: 'none'}} className={style.noBorder}>
            </input>
    )
}