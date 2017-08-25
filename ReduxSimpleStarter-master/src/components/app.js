import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

export default class App extends Component {

  state = {
    code: "//Code",
  }

  updateCode = (newCode) => {
    this.setState({
      code: newCode,
    });
  }


  render() {
    var options = {
      lineNumbers: true,
      mode: 'javascript',
    };
    return (
      <div>
      <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
      </div>
    );
  }
}
