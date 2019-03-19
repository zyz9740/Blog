import React,{ Component } from 'react';
import Overview from "./overview"
import Articles from "./articles"
import Register from './register'
import Carousel from './carousel'
import Video from './video.js'

class Main extends Component{
	render(){
		return(
			<div>
				<Carousel />
				<Overview />
				<Video />
				<Articles />
				<Register />
			</div>
			);
	}
}



export default Main