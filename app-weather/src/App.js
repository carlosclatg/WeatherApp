import React, {Component, Fragment,} from 'react';
import { Route, Redirect, withRouter, Switch  } from "react-router-dom";
import logic from './logic';
import options from './config/options'
import error from './config/error'
import Layout from './components/Layout'


// TODO if attribute contains time --> 
//The icons are here https://www.dr-lex.be/software/darksky-icons.html
class App extends Component {

  state = {currentWeather: null, 
    currentVisible: "time", 
    dataToDisplay: null, 
    hourlyDisplay: null,
    latitude: 41.3851,
    longitude: 2.1734,
    feedback: null,
    dropDownListHourly: [],
    dropDownListDaily:[]
  };

    


  getHourlyWeather = async (event) => {
    event.preventDefault()
    const {currentWeather, hourlyDisplay, latitude, longitude} = this.state
    if(navigator.geolocation){
      navigator.geolocation.watchPosition((pos) => {
        this.setState({latitude: pos.coords.latitude})
        this.setState({longitude: pos.coords.longitude})
      }, error, options);
    }
    if(currentWeather == null){
      let currentWeather = await logic.getHourlyWeather(latitude, longitude)
      console.log(currentWeather)
      if (currentWeather == null ) this.setState({feedback : "API failure" }) 
      this.setState({currentWeather}, ()=> {})
      if(!currentWeather) {
        alert("You have not obtained data! Please obtain data with the button")
        return 
      }
      console.log(currentWeather)
      let dropDownListHourly = []
      let dropDownListDaily = []
      if(dropDownListHourly.length===0 && dropDownListDaily.length===0){
        
          for(let elem in currentWeather.hourly.data[0]){
            if(typeof currentWeather.hourly.data[0][elem] == "number"){ //only number representing data
              dropDownListDaily.push(elem);
            }
            
          }
          this.setState({dropDownListDaily})
          console.log(dropDownListDaily)

          for(let elem in currentWeather.daily.data[0]){
            if(typeof currentWeather.daily.data[0][elem] == "number"){ //only number representing data
              dropDownListHourly.push(elem);
            }
          }
          this.setState({dropDownListHourly})
          console.log(dropDownListHourly)

      }
    } 
  }



  handleChange = (hourlyDisplay) => {
    this.setState({hourlyDisplay}, () => {})
  }

  render = () => {
    const {hourlyDisplay,  dropDownListHourly, dropDownListDaily, currentWeather, latitude, longitude} = this.state;
    
    return (
      currentWeather ?
      <Switch>
      <Fragment>
        <Route path="/" render={() => hourlyDisplay ? <Redirect to="/hourly" /> : <Redirect to="/daily" />}/>
        <Route exact path="/hourly" render = {() => <Layout  hourlyDisplay={false} dropDown={dropDownListHourly} currentWeather={currentWeather} latitude = {latitude} longitude={longitude} handleChange={this.handleChange}/> }/>
        <Route exact path="/daily" render = {() => <Layout hourlyDisplay={true} dropDown={dropDownListDaily} currentWeather={currentWeather } latitude = {latitude} longitude={longitude} handleChange={this.handleChange}/>}/>
      </Fragment>
      </Switch>
      :
      <button onClick={(event)=> this.getHourlyWeather(event) }>Click to get Data</button>
    );
  }
}

export default withRouter(App);


/*

<video>
          <source src="https://www.pexels.com/video/low-clouds-over-mountains-2314125/" type="video/mp4" />
        </video>

      */