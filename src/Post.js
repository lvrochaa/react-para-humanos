import React, {Component} from 'react';
import {Card, CardText} from 'material-ui/Card';
import FlaButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Post extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            n_likes: 0,
            ehFavorito: false,
            comments: []
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

    setLike() {
        let likes = this.state.n_likes;
        likes++;
        this.setState({n_likes: likes});
        this.saveInStorage();
    }

    setFavorito() {
        let favorito = this.state.ehFavorito;
        favorito = !favorito;
        this.setState({ehFavorito: favorito});
        this.saveInStorage();
    }

    newComment(input, e) {
        if (e.key === 'Enter') {
            let comments = this.state.comments;
            const newCommentText = e.target.value;
            e.target.value = null;
            comments.push(newCommentText);
            this.setState({comments: comments});
            this.saveInStorage();
        }
    }

    deleteComment(index) {
        let confirma = window.confirm("Excluir comentário?");
        if (!confirma) {
            return false;
        }
        let comments = this.state.comments;
        if (index > -1) {
            comments.splice(index, 1);
        }
        this.setState({comments: comments});
        this.saveInStorage();
    }

    render() {
        let iconColor = '#000000';
        if (this.state.ehFavorito) {
            iconColor = '#FFD700';
        }
        return (
            <Card style={{margin: 30, width: '45%', float: 'left', minheight: 200}}>
                <CardText>
                    <h4>{this.props.text}</h4>
                    <p>
                        {'likes: ' + this.state.n_likes} {this.state.ehFavorito}
                    </p>
                    <FlaButton label={'like'} onClick={this.setLike.bind(this)}/>
                    <IconButton onClick={this.setFavorito.bind(this)} iconStyle={{color: iconColor}}
                                tooltip="bottom-right" touch={true} tooltipPosition="bottom-right">
                        <ActionGrade/>
                    </IconButton>
                    {
                        this.state.comments.map((text, index) => {
                            return (
                                <div style={{textAlign:'left',width:'100%', marginBottom:10, minHeight: 30}} key={index}>
                                    <label>{text}</label>
                                    <FlaButton style={{width: '5%', float: 'right'}} label={'x'} onClick={this.deleteComment.bind(this, index)}/>
                                </div>);
                        })
                    }
                    <TextField
                        multiLine={true}
                        rows={1}
                        rowsMax={8}
                        hintText="Comente algo sobre isso"
                        style={{width: "100%"}}
                        onKeyPress={this.newComment.bind(this, this._handleKeyPress)}
                    />
                </CardText>
            </Card>
        );
    }
}

export default Post;
