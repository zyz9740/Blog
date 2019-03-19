import React,{ Component } from 'react';
import { Link } from 'react-router-dom'

import '../css/articles.css'
/*
function grid(props){
	return(
			<div class="col-md-3 col-sm-3 col-xs-6 w3gallery-grids">
				<a href={require(`../img/g${props.index+1}.jpg`)} class="imghvr-hinge-right figure">
					<img src={require(`../img/g${props.index+1}.jpg`)} alt=""/> 
					<div class="agile-figcaption">
						<h4>{props.title}</h4>
						<p>{props.intro}</p>
					</div>
				</a>
			</div>
		);
}
*/
class Articles extends Component{
	constructor(props){
		super(props);

		this.state = {
			blogTitles : Array(8).fill(null),
			blogIntroes : Array(8).fill(null),
		}
	}

	componentDidMount(){
		this.fetchData();
	}

	fetchData() {
		fetch('http://localhost:8000/server/blog/')
			.then(response => response.json())
			.then(parsedJSON => parsedJSON.map((blog,index) =>
				{
					var titles = this.state.blogTitles;
					titles[index] = blog.title;
					var introes = this.state.blogIntroes;
					introes[index] = blog.intro;
					this.setState({
						blogTitles: titles,
						blogIntroes: introes,
					})
				}
			))
			.catch(e => console.log('Failed to count words in blogs', e))
	}



		renderGrid(title,intro,index){
		return(
			<div class="col-md-3 col-sm-3 col-xs-6 w3gallery-grids">
				<a href={require(`../img/g${index+1}.jpg`)} class="imghvr-hinge-right figure">
					<img src={require(`../img/g${index+1}.jpg`)} alt=""/>
				</a>
				<a href={`blog/${index+1}`} className="imghvr-hinge-right figure">
					<div class="agile-figcaption">
						<h4>{title}</h4>
						<p>{intro}</p>
					</div>
				</a>
			</div>
			/*
			<grid 
				index={index}
				title={blog.title}
				intro={blog.intro}
			/>
			*/);
	}


	render(){
		const blogTitles = this.state.blogTitles;
		const blogIntroes = this.state.blogIntroes;
		var blogs = [];
		for(var i=0;i<blogIntroes.length;i++){
			blogs.push(this.renderGrid(blogTitles[i],blogIntroes[i],i));
		}
		return(
			<div class="articles" id='articles'>
				<div class="container">
					<h3 class="title-w3-agile">Portfolio</h3>
				</div>
				<div class="agileinfo-gallery-row">
					{blogs}
					<div class="clearfix"> </div>
				</div>
			</div>
			);
	}
}


export default Articles