import React from "react";

class Overview extends React.Component {

	render() {

		return ( 
			<div className="stats">
				<h6>Overview</h6>
				<p>Number of sentences <span>10</span></p>
				<p>Number of words <span>128</span></p>
				<p>Number of characters <span>1284</span></p>
				<p>Number of characters (without spaces) <span>1284</span></p>
			</div>
		);
	}
};

export default Overview;