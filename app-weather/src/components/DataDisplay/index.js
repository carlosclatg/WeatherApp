import React, {Component} from 'react'
import './index.sass'
import { Line } from 'react-chartjs-2';
class DataDisplay extends Component {    
    render() {
        const {dataToDisplay} = this.props;
        return (
            <div className="ChartContainer">
                <Line
                    data={dataToDisplay}
                    width={window.innerWidth * 0.8}
                    height={window.innerHeight * 0.4}
                    options={{
                        maintainAspectRatio: true
                    }}
                    
                />
            </div>
        )
    }
}
export default DataDisplay