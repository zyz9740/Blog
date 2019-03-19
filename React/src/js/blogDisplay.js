import React,{ Component } from 'react';
import showdown from 'showdown';
import '../css/blogDisplay.css'

class blogDisplay extends Component{
    constructor(props){
        super(props);

        this.state = {
            title: null,
            intro:null,
            content:null,
            issueTime:null,
        }
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData() {
        var index = this.props.match.params.number;

        fetch(`http://localhost:8000/server/blog/${index}`)
            .then(response => response.json())
            .then(parsedJSON => {
                console.log(parsedJSON);
                let converter = new showdown.Converter();
                var content = converter.makeHtml(parsedJSON[0].content);
                console.log(parsedJSON[0].content);
                this.setState({
                    title: parsedJSON[0].title,
                    intro: parsedJSON[0].intro,
                    issueTime: parsedJSON[0].date,
                    content: content,
                })
            })
            .catch(e => console.log('Failed to count words in blogs', e))
    }

    render(){
        return(
            <div class="blogContainer">
                <div class="myblog">
                    <h1 class="blogTitle">{this.state.title}</h1>
                    <h2 class="intro">{this.state.intro}</h2><span>时间：{this.state.issueTime}</span>
                    <p dangerouslySetInnerHTML={{ __html: this.state.content }}  />
                </div>
            </div>
        );
    }
}



export default blogDisplay