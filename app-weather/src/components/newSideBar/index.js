import React, {Fragment, useState} from 'react'
import { Link } from "react-router-dom";
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
                <Link className="sidenav__text" to="/hourly">Hourly <i className="fas fa-plus-square"></i></Link>
                <Link className="sidenav__text" to="/daily">Daily <i className="fas fa-swatchbook"></i></Link>
                <div className="heading-containergpsposition">
                    <span className="heading-gpsposition">({latitude}, {longitude})</span>
                </div>
            </header>
        </Fragment>
    );
}

