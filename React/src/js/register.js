import React,{ Component } from 'react';
import '../css/register.css'

class Register extends Component{
	render(){
		return(
			<div class="contact" id="register">
				<div class="container">
					<h3 class="title-w3-agile">Contact Us</h3>
					<div class="col-xs-7 contact-agileits-w3layouts">
						<h4 class="sub">Send us a message</h4>
						<form action="#" method="post">
							<input type="text" class="name" name="Your Name" placeholder="Name" required="" />
							<input type="email" class="email" name="Your Email" placeholder="Email" required="" />
							<input type="text" Name="Phone Number" placeholder="Number" required="" />
							<textarea name="Message" placeholder="Message" required></textarea>
							<input type="submit" value="Submit" />
						</form>
					</div>
					<div class="col-xs-5 map-agileits-w3layouts">
						<iframe src=""> </iframe>
					</div>
				</div>
			</div>
			);
	}
}

export default Register