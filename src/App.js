import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './Post';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlaButton from 'material-ui/FlatButton';

class App extends Component {
    constructor() {
        super();
        this.state = {
            post: []
        }
    }

    componentDidMount() {
        let state = localStorage.getItem(this.props.storageKey);
        state = JSON.parse(state);
        this.setState(state);
    }

    saveInStorage() {
        let actualState = this.state;
        actualState = JSON.stringify(actualState);
        localStorage.setItem(this.props.storageKey, actualState);
    }

    newPost() {
        let post = this.state.post;
        const newPostTitle = prompt("O que você está pensando?");
        post.push(newPostTitle);
        this.setState({post: post});
        this.saveInStorage();
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <div style={{paddingTop: 30, backgroundColor: '#DDDDDD'}}>
                        {
                            this.state.post.map((post, index) => {
                                return (<Post storageKey={index} text={post}/>);
                            })
                        }
                    </div>
                    <FlaButton style={{backgroundColor: '#4169E1'}} label={'new post'} onClick={this.newPost.bind(this)}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
