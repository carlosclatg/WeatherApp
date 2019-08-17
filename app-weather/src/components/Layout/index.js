import React, {Component, Fragment} from 'react'
import {withRouter  } from "react-router-dom";
import NewSideBar from '../newSideBar'
import DataDisplay from '../DataDisplay'
import Switch from '../Switch'

class Layout extends Component {

    state = {
        currentVisible: "time",
        simpleDescription: null,
        dataToDisplay: null
    };

    handleOptionChange = async (e) => {
      let currentVisible
      if(e.target.value) currentVisible = e.target.value
  
      await this.setState({currentVisible})
      this.representData()
    }


    toggleHourlyDaily = (checked) => {
        this.props.handleChange(checked);
    }
    representData = (event) => {
        if(event) event.preventDefault()
        this.setState({feedback: null})
        const {currentVisible} = this.state
        const {currentWeather, hourlyDisplay} = this.props
        let dataDisplay = [];
        let timeToDisplay = [];
        const AAxisLength = hourlyDisplay ? currentWeather.hourly.data.length : currentWeather.daily.data.length
        let units = hourlyDisplay ? 'h' : null
        var currentHour = new Date().getHours()
        for(let i = 0; i < AAxisLength; i++){
          //Case hourly
          if(hourlyDisplay){
            let stringXAxis
            if(currentHour + i > 23){
              if(currentHour + i > 47){
                stringXAxis = (currentHour + i -48).toString() + units 
              } else {
                stringXAxis = (currentHour + i -24).toString() + units 
              }
              
            } else {
              stringXAxis = currentHour + i + units 
            }
            timeToDisplay.push(stringXAxis)
          } else {//Case daily
            let stringXAxis = new Date(currentWeather.daily.data[i].time * 1000)
            timeToDisplay.push(stringXAxis.toLocaleDateString())
          }
        }
    
        if(hourlyDisplay){
          for(let i = 0; i < currentWeather.hourly.data.length ; i++){
            if(currentVisible.includes("time") || currentVisible.includes("Time")){
              dataDisplay.push(new Date(currentWeather.hourly.data[i][currentVisible]*1000).getHours())
            } else {
              dataDisplay.push(currentWeather.hourly.data[i][currentVisible])
            }
              
          }
        } else {
          for(let i = 0; i < currentWeather.daily.data.length ; i++){
            if(currentVisible.includes("time") || currentVisible.includes("Time")){
              dataDisplay.push(new Date(currentWeather.daily.data[i][currentVisible]*1000).getHours())
            } else {
              dataDisplay.push(currentWeather.daily.data[i][currentVisible])
            }
          }
        }
        var randomNumber = Math.random()
          //Random number for intensity of color.  
        const dataToDisplay = {
          labels: timeToDisplay,
          datasets: [
            {
              label: currentVisible,
              backgroundColor: `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},${randomNumber})`,
              borderColor: `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},1)`,
              borderWidth: 2,
              hoverBackgroundColor: `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.4)`,
              hoverBorderColor: `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},1)`,
              data: dataDisplay
            }
          ]
        }
        this.setState({simpleDescription: currentWeather.hourly.summary})
        this.setState({dataToDisplay}, ()=> {})
      }
    
    render() {

        const {latitude, longitude, currentWeather, dropDown } = this.props
        const {simpleDescription, currentVisible, dataToDisplay} = this.state
        return (
            <Fragment>
            <NewSideBar latitude={latitude} longitude={longitude}/>
            <div>
            { !currentWeather ?
                <button onClick={this.getHourlyWeather} className="myButton">Get weather!</button>
                :
                null
            }
            
            <p className="textForecast" ref={this.myRef}>The forecast for today is : {simpleDescription}</p>

            <form className="dropDown">
                { dropDown ?
                <Fragment>
                    <select className="dropDown-select" onChange={this.handleOptionChange}>
                    {dropDown.map((option) => <option  key={option} value={option}>{option}</option>)}
                    </select>
                    <button className="dropDown-button" onClick={(event) => this.representData(event)}>Represent Data</button>
                </Fragment>
                : 
                null
                }  
            </form>
            
            { dataToDisplay ?
                <DataDisplay dataToDisplay={dataToDisplay} />
                : 
                <div></div> 
            }
            </div>
            </Fragment>
        )
    }
}
export default withRouter(Layout);


/*
            <div>
                <Switch toggleHourlyDaily={this.toggleHourlyDaily}/>
            </div>*/