import React, {Component} from 'react';
import {Card, CardText} from 'material-ui/Card';
import FlaButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';

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

    newComment() {
        let comments = this.state.comments;
        const newCommentText = prompt("Digite");
        comments.push(newCommentText);
        this.setState({comments: comments});
        this.saveInStorage();
    }

    deleteComment(index) {
        let confirma = window.confirm("Excluir comentário?");
        if(!confirma){
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
            <Card style={{ marginBottom:30, width:'100%', minheight: 200}}>
                <CardText>
                    <h4>{this.props.text}</h4>
                    <p>
                        {'likes: ' + this.state.n_likes} {this.state.ehFavorito}
                    </p>
                    {
                        this.state.comments.map((text, index) => {
                            return (
                                <h4 key={index}>
                                    {text}
                                    <FlaButton label={'x'} onClick={this.deleteComment.bind(this, index)} />
                                </h4>);
                        })
                    }
                    <FlaButton label={'like'} onClick={this.setLike.bind(this)}/>
                    <IconButton onClick={this.setFavorito.bind(this)} iconStyle={{color: iconColor}} tooltip="bottom-right" touch={true} tooltipPosition="bottom-right">
                        <ActionGrade />
                    </IconButton>
                    <FlaButton label={'comentar'} onClick={this.newComment.bind(this)}/>
                </CardText>
            </Card>
        );
    }
}

export default Post;
