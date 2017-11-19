import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './Post';
import CreatePostBox from './CreatePostBox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey200, blueGrey100} from 'material-ui/styles/colors';

class App extends Component {
    constructor() {
        super();
        this.state = {
            post: [
                'Este é um teste de post',
                'Mais um teste de post',
                'React é realmente uma ferramenta incrível',
                'Então ta bom, o último post'
            ]
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

    newPost(value) {
        let post = this.state.post;
        post.push(value);
        this.setState({post: post});
        this.saveInStorage();
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">React Para Humanos :)</h1>
                    </header>
                    <div style={{padding: 30, backgroundColor: blueGrey100}}>
                        <CreatePostBox newPost={this.newPost.bind(this)}/>
                    </div>
                    <div style={{float: 'left', padding: 30, backgroundColor: grey200}}>
                        {
                            this.state.post.map((post, index) => {
                                return (<Post key={index} storageKey={index} text={post}/>);
                            })
                        }
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
