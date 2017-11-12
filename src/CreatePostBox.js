import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.props.newPost(this.state.value);
        event.preventDefault();
    }

    render() {
        const style = {
            margin: 12,
        };
        return (
            <div>
                <TextField
                    hintText="No que está pensando?"
                    multiLine={true}
                    rows={2}
                    rowsMax={8}
                    style={{width:400}}
                    onChange={this.handleChange.bind(this)}
                />
                <RaisedButton label="Publicar" primary={true} style={style} onClick={this.handleSubmit.bind(this)} />
            </div>
        );
    }
}

export default Post;
