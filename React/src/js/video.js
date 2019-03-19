import React,{ Component } from 'react';
import '../css/video.css'


class Video extends Component{
	render(){
		return(
			<div id="video">
				<div class="container">
						<div class="col-md-12">
							<div class="mu-video-review-area">
								<div class="mu-heading-area">
									<h1 class="mu-heading-title">Check Out Our Video Review</h1>
									<span class="mu-header-dot"></span>
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
									<p> Lorem Ipsum has been the industry's standard dummy text ever</p>
								</div>

								<div class="mu-video-review-content">
									<iframe class="mu-video-iframe" width="100%" height="480" src={require("../video/1.mp4")} frameborder="0" allowfullscreen  play="false"> </iframe>
								</div>
							</div>
						</div>
				</div>
			</div>
			);
	}
}

export default Video