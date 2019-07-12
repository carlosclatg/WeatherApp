import React, {Component, Fragment} from 'react';
import logic from './logic';
import Switch from './components/Switch';
import DataDisplay from './components/DataDisplay';
import options from './config/options'
import error from './config/error'
import Feedback from './components/Feedback';


// TODO if attribute contains time --> 
//The icons are here https://www.dr-lex.be/software/darksky-icons.html
class App extends Component {

  state = {currentWeather: null, 
    currentVisible: null, 
    dataToDisplay: null, 
    hourlyDisplay: false,
    latitude: 41.3851,
    longitude: 2.1734,
    feedback: null,
    dropDownItems: []};

    
  componentDidMount = () =>{
    if(navigator.geolocation){
      navigator.geolocation.watchPosition((pos) => {
        this.setState({latitude: pos.coords.latitude})
        this.setState({longitude: pos.coords.longitude})
        this.getHourlyWeather()
        let currentVisible = "time"
        this.setState({currentVisible}, ()=> {})
        this.toggleHourlyDaily(true)
      }, error, options);
    }
  }

  getHourlyWeather = async () => {
    if(!this.state.currentWeather){
      let currentWeather = await logic.getHourlyWeather(this.state.latitude, this.state.longitude)
      if (currentWeather == null ) this.setState({feedback : "API failure" }) 
      this.setState({currentWeather}, ()=> {})
      this.forceUpdate()
    } 
  }

  toggleHourlyDaily = (checked) => {
    
    if(!this.state.currentWeather) {
      alert("You have not obtained data! Please obtain data with the button")
      return 
    }
    const {currentWeather, hourlyDisplay} = this.state
    this.setState({hourlyDisplay : checked}, ()=> {})
    
    
    let dropDownList = []
    if(!hourlyDisplay){
      for(let elem in currentWeather.hourly.data[0]){
        if(typeof currentWeather.hourly.data[0][elem] == "number"){ //only number representing data
          dropDownList.push(elem);
        }
        
      }
    } else {
      for(let elem in currentWeather.daily.data[0]){
        if(typeof currentWeather.daily.data[0][elem] == "number"){ //only number representing data
          dropDownList.push(elem);
        }
      }
    }
    
    this.setState({dropDownItems: dropDownList}, () => this.representData())
    this.setState({currentVisible: "time"}, ()=> {})
  }


  handleChange = async (e) => {
    let currentVisible
    if(e.target.value) currentVisible = e.target.value

    await this.setState({currentVisible})
    this.representData()
  }


  representData = () => {
    if(!this.state.currentWeather) return
    if(!this.state.currentVisible) return
    this.setState({feedback: null})
    const {currentWeather, hourlyDisplay, currentVisible} = this.state
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


  render = () => {
    const {simpleDescription, dataToDisplay, dropDownItems, feedback, currentWeather, latitude, longitude} = this.state;
    return (
      <Fragment>
        <div>
          <h2>Meteo Weather app</h2>
          <p>Your position is {latitude} , {longitude} </p>
        </div>
        { !currentWeather ?
          <button onClick={this.getHourlyWeather} className="myButton">Get weather!</button>
          :
          null
        }
        
        {feedback && <Feedback message={feedback} />}
        <p ref={this.myRef}>The forecast for today is : {simpleDescription}</p>
        <div>
          <Switch toggleHourlyDaily={this.toggleHourlyDaily}/>
        </div>
        <form>
          { dropDownItems ?
            <select onChange={this.handleChange}>
              {dropDownItems.map((option) => <option  key={option} value={option}>{option}</option>)}
            </select> : 
            null
          }  
        </form>
        { dataToDisplay ?
            <DataDisplay dataToDisplay={dataToDisplay} />
            : 
            <div></div> 
        }
      </Fragment>
    );
  }
}

export default App;