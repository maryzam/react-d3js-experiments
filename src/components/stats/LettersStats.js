import React from "react";

class LettersStats extends React.Component {

	render() {
		const { width, data } = this.props;
		const height = 50; //todo
		return ( 
			<svg width={width} heigh={height}>
				 <g transform={`translate(0,${height / 2})`}>

				 </g>
			</svg>
		);
	}

};

export default LettersStats;
