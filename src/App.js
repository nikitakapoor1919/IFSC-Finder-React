import React, { Component } from 'react';
import './App.css';
import IfscFinder from './IfscFinder';

export class App extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        ifscData:[]
        }
    }

    async getData(){
        const response = await fetch('./ifsc.json');
        const json = await response.json();
        this.setState({ifscData: json,isLoading:true});   
    }
    componentDidMount(){
        this.getData();
    }

    render() {
        if(this.state.isLoading) {
            return(<IfscFinder ifscData={this.state.ifscData}/>);
        } else {
            return(<div className="loading">LOADING...</div>);
        }
    }

}

export default App;
