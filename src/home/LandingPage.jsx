import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import "./scss/landing-page.scss";

class LandingPage extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {

		return (
			<div className="landing-page">
				<a name="Budgeteer" href="/budgeteer">Take me to Budgeteer</a>
			</div>
		);
	}
}

export default LandingPage;
