import React, {Component, Fragment, useState} from 'react'
import './index.sass'

export default function SideBar (props) {
    const [check, setcheck] = useState(false);
    const {latitude, longitude} =  props;
    const toogle = () => setcheck(!check);

    return (
        <Fragment>
            <div className="sidenav">
                <label htmlFor="toggle">&#9776;</label>   
                <input type="checkbox" id="toggle" onChange={toogle} checked={check}/>
                <div className="sidenav__menu">
                    <a className="sidenav__text" href="https://github.com/carlosclatg/WeatherApp">Weather app <img width = "30px" height="30px" src="https://cdn1.iconfinder.com/data/icons/weather-429/64/weather_icons_color-14-512.png"></img></a>
                    <div>
                        <p>Your position is {latitude} and {longitude}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

/*
class SideBar extends Component {

    state= {checked: false}

    toggle  = () => this.setState({checked: !this.state.checked})

    render() {
        return (
            <Fragment>
                        <div className="sidenav">
                            <label htmlFor="toggle">&#9776;</label>
                            <input type="checkbox" id="toggle" onChange={this.toggle} checked={this.state.checked}/>
                            <div className="sidenav__menu">
                                <img width = "30px" height="30px" src="https://www.misskatecuttables.com/uploads/shopping_cart/9363/large_books-on-shelf.png"></img>
                                <a className="sidenav__text">New Book <i className="fas fa-plus-square"></i></a>
                            </div>
                        </div>
            </Fragment>
        )
    }
}
export default SideBar;
*/
