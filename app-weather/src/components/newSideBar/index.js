import React, {Fragment, useState} from 'react'
import './index.sass'

export default function NewSideBar (props) {
    const [check, setcheck] = useState(false);
    const {latitude, longitude} =  props;
    const toogle = () => setcheck(!check);

    return (
        <Fragment>
            <header className="header">
                <div className="logo-box">
                    <img src="./resource/logo.png" alt="logo" className="logo"/>
                </div>
                <span className="heading-title">MeteoApp</span>
                <span className="heading-gpsposition">({latitude}, {longitude})</span>
            </header>
        </Fragment>
    );
}

