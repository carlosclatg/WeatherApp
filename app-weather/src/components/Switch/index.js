import React, {Component, Fragment} from 'react'
import './index.sass'
class Switch extends Component {

    state= {checked: false}

    toggle  = () => {
        this.setState({checked: !this.state.checked}, () => {})
        this.props.toggleHourlyDaily(this.state.checked)
    }
    
    render() {
        return (
            <Fragment>
                {this.state.checked ? <p className="switchDaily">Daily</p> : <p className="switchDaily">Hourly</p>}
                    <label className="switch">
                        <input type="checkbox" onClick = {this.toggle}/>
                        <span className="slider round"/>
                    </label>
            </Fragment>
        )
    }
}
export default Switch