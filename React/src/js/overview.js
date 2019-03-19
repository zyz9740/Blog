import React,{ Component } from 'react';
import '../css/overview.css'

class Overview extends Component{
	constructor(props){
		super(props);
		this.state = {
			//isLoading: 	true,
			blogcount:  0,
			wordcount: 	0,
			messagecount: 0,
			visitorscount: 0,
		}
	}

	componentDidMount(){
		this.fetchData();
	}

	fetchData(){
		fetch('http://localhost:8000/server/blog/')
		.then(response => response.json())
		.then(parsedJSON => parsedJSON.map(blog => (
			{
				words: blog.content.length
			}
			)))
		.then(wordcounts => {
			var wordsum = 0;
			for(var i in wordcounts){
				wordsum += wordcounts[i].words;
			}
			this.setState(
			{
				//isLoading:  false,
				blogcount: 	wordcounts.length,
				wordcount:  wordsum,
			})
		})
		.catch(e => console.log('Failed to count words in blogs', e))

		fetch('http://localhost:8000/server/message/')
		.then(response => response.json())
		.then(parsedJSON => {
			this.setState({
				messagecount: parsedJSON.length
			})
		})
		.catch(e => console.log('Failed to count message ', e))


		fetch('http://localhost:8000/server/access/',{
			headers: {
				"Content-Type": "application/json" 
        	},
        	method: 'POST',
        	body:  ""
		})
		.then(response => response.json())
		.then(parsedJSON => {
			this.setState({
				visitorscount:parsedJSON.visitorsCount
			})
		})
		.catch(e => console.log('Failed to get visitorsCount', e))

	}


	render(){
		return(
			<div class="overview" id="overview">
				<div class="container">
					<div class="stats-agileinfo">
						<div class="col-sm-3 col-xs-3 stats-grid">
							<div class='numscroller'>{this.state.visitorscount}</div>
							<h6>VISITORS</h6>
						</div>
						<div class="col-sm-3 col-xs-3 stats-grid">
							<div class='numscroller'>{this.state.messagecount}</div>
							<h6>MESSAGES</h6>
						</div>
						<div class="col-sm-3 col-xs-3 stats-grid">
							<div class='numscroller'>{this.state.blogcount}</div>
							<h6>ARTICLES</h6>
						</div>
						<div class="col-sm-3 col-xs-3 stats-grid">
							<div class='numscroller'>{this.state.wordcount}</div>
							<h6>TOTAL WORDS</h6>
						</div>
					</div>
				</div>
			</div>


			);
	}
}

export default Overview