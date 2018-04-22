import React from "react";
import PropTypes from "prop-types"; 

import * as d3 from "d3";

const cssClass = "sentences-stats";

class SentensesStats extends React.Component {

	scaleX = d3.scaleBand().padding(0.1);

	scaleY = d3.scaleLinear();

	componentDidMount() {
		this.updateBars();
	}

	componentDidUpdate() {
		this.updateBars();
	}

	updateBars() {
		const height = this.props.height;
		// let d3 update rendered bars' attributes
		const bars = d3.select(this.refs.container)
					   .selectAll(".bar")
					   .data(this.props.data);
		bars
			.transition()
			.attr("transform", (d) => `translate(${this.scaleX(d.order)}, ${this.scaleY(d.total) / 2})`);

		bars.select("rect")
			.transition()
				.attr("width", this.scaleX.bandwidth())
				.attr("height",(d) => ( height - this.scaleY(d.total)));
	}

	render() {
		const { width, height, data } = this.props; 

		this.scaleX.range([0, width]).domain(data.map((d) => d.order));
		this.scaleY.range([height, 0]).domain([0, d3.max(data, (d) => d.total)]);

		const barWidth = this.scaleX.bandwidth();
		const centerY = height / 2;
		const labelX = barWidth / 2 

		return ( 
			<div className="stats">
				<h4>Text structure (words per sentence)</h4>
				<svg width={width} height={height}>
					<g className={cssClass} ref="container">
						{ data.map((d, i) => 
									(<g key={d.order} 
										className="bar"
										transform={`translate(${width},${centerY})`}>
										<rect 
											width={ barWidth }
											rx="5" ry="5"
										/>
										<text 
											transform={`translate(${labelX}, 15)`}>
											{d.total}
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