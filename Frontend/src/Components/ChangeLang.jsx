import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { changeLang } from '../store/actions/action'
export default function ChangeLang() {
    const lang = useSelector((state) => state.lang);
    const dispatch = useDispatch()
    const handleLang = () => {
        // Dispatch An Action
        if (lang === "en") {
            dispatch(changeLang("ar"))
        } else {
            dispatch(changeLang("en"))
        }
    }
    return (
        <>
            <h1>Current Lang : {lang}</h1>
            <button className="btn btn-success" onClick={() => handleLang()}>Change Language</button>
        </>
    )
}