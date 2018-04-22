import React from "react";
import PropTypes from "prop-types"; 

import { withFauxDOM } from 'react-faux-dom'

import * as d3 from "d3";

class LettersChart extends React.Component {

	constructor(props) {
		super(props);

		const { width, height } = props;
		this.scaleFreq = d3.scaleLinear().range([0.1, 1]);
		this.scalePos = d3.scaleLinear().range([0, width]);
	}

	componentDidMount () {
	    this.renderD3();
	}

	componentDidUpdate (prevProps, prevState) { 
		if (this.props.data !== prevProps.data) {
			this.updateD3();
		}
	}

	render() {
		return ( 
			<div className="stats">
				{ this.props.chart }
			</div>
		);
	}

	renderD3() {
		const { width, height } = this.props;
		const faux = this.props.connectFauxDOM("div", "chart");
		const container = d3.select(faux)
								.append("svg")
					    			.attr("width", width)
					    			.attr("height", height)
				    			.append("g")
				    				.attr("class", "letters-stats")
									.attr("transform", `translate(0, ${ height / 2})`);

		this.drawChart(container);

	};

	updateD3() {
		const faux = this.props.connectFauxDOM("div", "chart");
		const container = d3.select(faux).select(".letters-stats");
		this.drawChart(container);
	};

	drawChart(container) {
		
		const data = this.processData();
		const letters = container.selectAll("g").data(data);

		const exit = letters.exit().remove();

		const enter = letters
						.enter()
						.append("g")
							.attr("transform", (d) => `translate(${this.scalePos(d.offset)}, 0)`);
		enter
			.append("rect")
				.attr("height", 10).attr("width", 0)
				.attr("rx", 3).attr("ry", 3);

		enter
			.append("circle")
				.attr("r", 8)
				.attr("cy", 5).attr("cx", 0)
				.style("fill", "gold");

		enter
			.append("text")
				.text((d) => d.letter)
				.attr("y", 7).attr("x", 0);

		const update = enter.merge(letters);

		update
			.transition()
			.attr("transform", (d) => `translate(${this.scalePos(d.offset)}, 0)`);

		update
			.select("rect")
			.transition()
			.style("fill", (d) => (d.frac === 0) ? "gold" : "orange")
			.attr("width", (d) => this.scalePos(d.width));

		update
			.select("circle")
			.transition()
			.style("fill", (d) => (d.frac === 0) ? "gold" : "orange")
			.attr("cx", (d) => this.scalePos(d.width) / 2);

		update
			.select("text")
			.transition()
			.attr("x", (d) => this.scalePos(d.width) / 2);

		this.props.animateFauxDOM(800);
	}

	processData() {
		let offset = 0;
		const data = this.props.data
			.map((d) => {
				const item = Object.assign({}, d);
				item.width = this.scaleFreq(d.frac);
				item.offset = offset;
				offset += item.width;
				return item;
			});
		this.scalePos.domain([0, offset]);
		return data;
	}

};

LettersChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired
};

const LettersStats = withFauxDOM(LettersChart);

export default LettersStats;
