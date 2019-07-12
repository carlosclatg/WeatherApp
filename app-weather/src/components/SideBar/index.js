import React, {Component, Fragment} from 'react'
import './index.sass'
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