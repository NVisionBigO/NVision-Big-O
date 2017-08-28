import React, { Component } from 'react';


export default class Buttons extends Component {


    render() {
        const styleButton = {}
        return(
            <div style={{backgroundColor: 'white'}}>
                <button className='btn-info' type='submit' onClick={this.props.graph}>Compute</button>
                <button className='btn-danger' type='submit' onClick={this.props.clear}>Clear</button>
                <button className='btn-success' type='submit' onClick={this.props.fit}>Least Squares Fit</button>
            </div>
        )

    }



}