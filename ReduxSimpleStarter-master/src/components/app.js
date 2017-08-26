import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import { Line } from 'react-chartjs-2'

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

// const testCases = []

// for (var i = 10; i < 1000; i += 50) {
//   testCases.push(new Array(i).fill(Math.floor(Math.random() * 100)))
// }

export default class App extends Component {

  state = {
    code: "",
    testCases: [],
    timeData: {},
    time: [],
    size: [],
  }

  updateCode = (newCode) => {
    this.setState({
      code: newCode,
    });
  }
  
  updateTests = (newCode) => {
    this.setState({
      code: newCode,
    });
  }

  handleClick = () => {

    let match = this.state.code.match(/function/)
    const firstIndex = this.state.code.indexOf(match[0]) + match[0].length + 1
    const lastIndex = this.state.code.indexOf('(')
    let fnName = this.state.code.slice(firstIndex, lastIndex)

    let dateStart;
    let dateEnd;

    testCases.forEach(testArray => {

      dateStart = performance.now();
      eval(this.state.code + ' ' + fnName + `([${testArray}])`)
      dateEnd = performance.now();

      let newObj = this.state.timeData;
      let timeDiff = dateEnd - dateStart;
      newObj[testArray.length] = timeDiff;

      this.setState({
        timeData: newObj,
        size: [...this.state.size, testArray.length],
        time: [...this.state.time, timeDiff]
      })

    })


  }

  render() {
    var options = {
      lineNumbers: true,
      mode: 'javascript',
    };

    const styleChart = {
      width: 600,
      height: 250
    }

    const chartOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    const data = {
      labels: Object.keys(this.state.timeData),
      datasets: [{
        label: 'NVision Big O',
        data: Object.values(this.state.timeData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }

    return (
      <div>
        <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
        <CodeMirror value={this.state.testCases} onChange={this.updateTests} options={options} />
        <button type='submit' onClick={this.handleClick}>Click Me</button>
        <h1>{JSON.stringify(this.state.timeData)}</h1>
        <Line data={data} options={chartOptions} style={styleChart} />
      </div>
    );
  }
}
