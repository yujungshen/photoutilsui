import React, { Component } from 'react';
import './App.css';
import { render } from 'react-dom';
import { LazyLog, ScrollFollow } from 'react-lazylog';

const endpoint = 'http://localhost:8080/photo/organize?testOnly=false'

class App extends Component {
  constructor() {
    super();
    this.state = {
      srcDir: "",
      destDir: "",
      testMode: false,
      logs: "",
      data: "",
      apiUrl: ""
    };
  }

  validateInput() {
    if (this.state.srcDir.trim() !== "" && this.state.destDir.trim() !== "") {
      return true;
    }
    return false;
  }

  callSortApi() {
    if (this.validateInput()) {
      const url = endpoint + "&srcDir=" + this.state.srcDir + "&destDir=" + this.state.destDir;
      // alert("url: " + url);

      // use this for just a regular span and div
      // fetch(url).then((response) => response.text())
      //           .then((data) => 
      //             this.setState({data: data}, function() {this.renderLogs()}));

      // try lazy dog
      this.setState({apiUrl: url}, function() {
        this.renderLogs();
      });
    }
  }

  updateSrcDir(event) {
    this.setState({srcDir: event.target.value});
  }

  updateDestDir(event) {
    this.setState({destDir: event.target.value});
  }

  renderLogs() {
    render ((
        <ScrollFollow startFollowing={true}
                      render={({ follow, onScroll }) => (
                        <LazyLog url={this.state.apiUrl} stream follow={follow} onScroll={onScroll} /> 
                      )}
        />
    ), document.getElementById('logdiv'));
  }

  // regular span
  // renderLogs() {
  //   render ((
  //       <span>{this.state.data}</span>
  //   ), document.getElementById('logdiv'));
  // }

  // updateSrcField(event) {
  //   const dirPath = event.target.files[0].path;
  //   alert("path: " + dirPath);
  //   document.getElementById("sourceDir").value = dirPath;
  // }

  render() {
    return (
      <div className="App">
        <table>
          <tr>
            <td>Source Dir:</td>
            <td><input id="sourceDir" type="text" onChange={(event) => this.updateSrcDir(event)} />
            </td>
          </tr>
          <tr>
            <td>Dest Dir:</td>
            <td><input type="text" onChange={(event) => this.updateDestDir(event)} /></td>
          </tr>
          <tr>
            <td><button onClick={() => this.callSortApi()}>Sort Now</button></td>
            <td></td>
          </tr>
        </table>
        <hr/>
        <p>Logs</p>
        <div id="logdiv" style={{height:600}} align="left">...</div>
      </div>
    );
  }
}

export default App;
