import React from "react";
import PropTypes from "prop-types"; 

import * as d3 from "d3";

const cssClass = "sentences-stats";

class SentensesStats extends React.Component {

	scaleX = d3.scaleBand().padding(0.1);

	scaleY = d3.scaleLinear();

	componentDidUpdate() {
		const height = this.props.height;
		// let d3 update rendered bars' attributes
		const bars = d3.select(this.refs.container)
					   .selectAll("g")
					   .data(this.props.data);
		bars
			.transition()
			.attr("transform", (d) => `translate(${this.scaleX(d.order)}, ${this.scaleY(d.words.length) / 2})`);

		bars.select("rect")
			.transition()
				.attr("width", this.scaleX.bandwidth())
				.attr("height",(d) => ( height - this.scaleY(d.words.length)));
	}

	render() {
		const { width, height, data } = this.props; 

		this.scaleX.range([0, width]).domain(data.map((d) => d.order));
		this.scaleY.range([height, 0]).domain([0, d3.max(data, (d) => d.words.length)]);

		const barWidth = this.scaleX.bandwidth();
		const centerY = height / 2;
		const labelX = barWidth / 2 

		return ( 
			<div className="stats">
				<svg width={width} height={height}>
					<g className={cssClass} ref="container">
						{ data.map((d, i) => 
									(<g key={d.order} 
										transform={`translate(${width},${centerY})`}>
										<rect 
											width={ barWidth }
											rx="5" ry="5"
											fill="tomato"
										/>
										<text 
											transform={`translate(${labelX}, 15)`}
											textAnchor="middle"
											fill="white">
											{d.words.length}
										</text>
									 </g>)
						)}
					</g>
				</svg>
			</div>
		);
	}
};

SentensesStats.propTypes = {
 	width: PropTypes.number.isRequired,
  	height: PropTypes.number.isRequired,
 	data: PropTypes.array.isRequired
};

export default SentensesStats;