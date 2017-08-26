import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import { Line } from 'react-chartjs-2'


require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

const testCases = []
for (var i = 10; i < 8000; i += 50) {
  testCases.push(new Array(i).fill(Math.floor(Math.random() * 100)))
}

let dataRef = { label: null, data: null, backgroundColor: [], borderColor: [], borderWidth: 1}

export default class App extends Component {
  state = {
    code: "function O1(arr) { return arr[0] }",
    timeData: [],
    text: '',
    lineData: []
  }

  updateCode = (newCode) => {
    this.setState({
      code: newCode,
    });
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  handleClick = () => {
    //method onClick button "Click Me"
    let match = this.state.code.match(/function/)
    const firstIndex = this.state.code.indexOf(match[0]) + match[0].length + 1
    const lastIndex = this.state.code.indexOf('(')
    let fnName = this.state.code.slice(firstIndex, lastIndex)
    //finds the indices to grab the function Name in codemirror ..function fnName
    let dateStart;
    let dateEnd;
    //plot size: runTime based on testCases
    testCases.forEach(testArray => {

      dateStart = performance.now();
      eval(this.state.code + ' ' + fnName + `([${testArray}])`)
      dateEnd = performance.now();

      // let newTime = this.state.timeData;
      // let newSize = this.state.sizeData;
      //
      // newTime.push(dateEnd - dateStart)
      // newSize.push(testArray.length)
      let timeDiff = dateEnd - dateStart
      let newObj = this.state.timeData;
      newObj[testArray.length] = timeDiff
      this.setState({
        timeData: newObj
      })
    })
    dataRef.label = this.state.text;
    dataRef.data = Object.values(this.state.timeData)
    dataRef.backgroundColor = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ]
    dataRef.borderColor = ['rgba(255, 159, 64, 1)']

    let newData = this.state.lineData;
    newData.push(dataRef)
    this.setState({
      lineData: newData
    })
  }

  render () {
    var options = {
      lineNumbers: true,
      mode: 'javascript'
    };

    const chartOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    const data = {
      labels: Object.keys(this.state.timeData),
      datasets: this.state.lineData,
    }

    return (
      <div>
        <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
        <input type='text' onChange={this.handleChange} value={this.state.text}/>
        <button type='submit' onClick={this.handleClick}>Graph Big-O</button>
        <Line data={data} options={chartOptions}  width={400} height={200}/>
      </div>
    );
  }
}
