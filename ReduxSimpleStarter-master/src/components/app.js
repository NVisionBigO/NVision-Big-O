import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import { Line } from 'react-chartjs-2'
import Buttons from './buttons'
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
let dateStart = 0
let dateEnd = 0
let count = 0;

let leastSquare = (x, y) => {

  let xMean = x.reduce((accum, num) => { return accum + num }) / x.length
  let yMean = y.reduce((accum, num) => { return accum + num }) / y.length

  let a = [];
  let b = [];

  for (let i = 0; i < x.length; i++) {
    let tempA = x[i] - xMean;
    let tempB = y[i] - yMean;
    a.push(tempA * tempB)
    b.push(tempA * tempA)
  }
  let top = a.reduce((accum, num) => { return accum + num })
  let bottom = b.reduce((accum, num) => { return accum + num })
  let slope = top / bottom
  let yintercept = yMean - slope * xMean;

  return [slope, yintercept]
}

let generateColor = () => {
  let colors = ['#143642', '#0F8B8D', '#EC9A29', '#A8201A', '#353535', '#3C6E71', '#4C934C', '#F1C8DB', '#230007', '#6CCFF6', '#98CE00'];
  return colors[Math.floor(Math.random() * (colors.length))]
}

let randomize = (arr) => {
  let newarr = [];
  for(let i = 0; i < arr.length; i++){
   newarr.push(Math.floor(Math.random()*100))
 }
 return newarr
}

export default class App extends Component {
  state = {
    code: '//Insert Code here...',
    sizeArr: [],
    timeArr: [],
    lineData: [],
    tests: [],
    bestFit: {},
    colors: 'black'
  }
  componentDidMount() {
    const testCases = []
    for (var i = 2; i < 20; i += 1) {
      testCases.push(randomize(new Array(i)))
    }
    this.setState({
      tests: testCases
    })
  }
  handleClick = () => {
    this.setState({
      colors: generateColor()
    }, () => {
      console.log(this.state.colors)
      let match = this.state.code.match(/function/)
      let firstIndex = this.state.code.indexOf(match[0]) + match[0].length + 1
      let lastIndex = this.state.code.indexOf('(')
      let fnName = this.state.code.slice(firstIndex, lastIndex)
      let time = [];
      let size = [];
      this.state.tests.forEach(test => {
        dateStart = performance.now()
        eval(this.state.code + ' ' + fnName + `([${test}], 50)`)
        dateEnd = performance.now();
        let timeDiff = dateEnd - dateStart;
        size.push(test.length)
        time.push(timeDiff)
      })
      let dataRef = {};
      dataRef.label = 'Line ' + count++;
      dataRef.data = time;
      dataRef.backgroundColor = 'transparent'
      dataRef.borderColor = this.state.colors
      dataRef.borderWidth = 3
      dataRef.pointBackgroundColor = this.state.colors
      dataRef.pointBorderColor = this.state.colors
      dataRef.pointRadius = 2

      let newData = this.state.lineData;
      newData.push(dataRef)
      this.setState({
        lineData: newData,
        timeArr: time,
        sizeArr: size
      })
    })
  }
  handleClear = () => {
    this.setState({
      sizeArr: [],
      timeArr: [],
      lineData: [],
    })
  }

  handleFit = () => {
    console.log(this.state.colors)
    let Formula = leastSquare(this.state.sizeArr, this.state.timeArr)
    let xBestFit = [];
    let yBestFit = [];
    for (let i = 0; i < this.state.sizeArr.length; i++) {
      xBestFit.push(this.state.sizeArr[i])
      yBestFit.push(Formula[0] * this.state.sizeArr[i] + Formula[1])
    }
    let dataRef = {};
    dataRef.label = `LSF ${count - 1}`;
    dataRef.data = yBestFit;
    dataRef.backgroundColor = 'transparent'
    dataRef.borderColor = this.state.colors
    dataRef.borderWidth = 3
    dataRef.pointBackgroundColor = this.state.colors
    dataRef.pointBorderColor = this.state.colors
    dataRef.pointRadius = 0
    

    let newData = this.state.lineData;
    newData.push(dataRef)
    this.setState({
      lineData: newData,
      timeArr: yBestFit,
      sizeArr: xBestFit,
    })
  }

  updateCode = (newCode) => {
    this.setState({
      code: newCode,
    });
  }
  render() {
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
    let datag = {
      labels: this.state.sizeArr,
      datasets: this.state.lineData,
      fill: true
    }
    return (
      <div style={{backgroundColor: "#DCECE9"}}>
        <h1 style={{textAlign: 'center'}}>NVision Big O</h1>
        <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
        <Buttons graph={this.handleClick} clear={this.handleClear} fit={this.handleFit} />
        <Line data={datag} options={chartOptions} width={400} height={200} />
      </div>
    )
  }
}
