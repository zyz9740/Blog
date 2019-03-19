import React,{ Component } from 'react';
import '../css/carousel.css'

class Carousel extends Component{
	render(){
		return(
			    <div id="myCarousel" class="carousel slide">
			      <ol class="carousel-indicators">
			        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
			        <li data-target="#myCarousel" data-slide-to="1"></li>
			        <li data-target="#myCarousel" data-slide-to="2"></li>
			      </ol>   
			      <div class="carousel-inner">
			        <div class="item active">
			          <img src={require("../img/2.1.png")}  alt="First slide" id="my-img"></img>
			        </div>
			        <div class="item">
			          <img src={require("../img/2.2.png")}  alt="Second slide" id="my-img"></img>
			        </div>
			        <div class="item">
			          <img src={require("../img/2.3.png")}  alt="Third slide" id="my-img"></img>
			        </div>
			      </div>
			      <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
			        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
			        <span class="sr-only">Previous</span>
			      </a>
			      <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
			        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
			        <span class="sr-only">Next</span>
			      </a>
			  	</div>
			);
	}
}

export default Carousel