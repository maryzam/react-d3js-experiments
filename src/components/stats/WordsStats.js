import React from "react";
import PropTypes from "prop-types"; 

import * as d3 from "d3";

const maxCount = 10;
const animDuration = 500;
const scaleColor = d3.scaleLinear().range(["tomato", "gold"]); 

class WordsStats extends React.Component {

	scaleRadius = d3.scaleSqrt();
	
	simulation = d3.forceSimulation();

	componentDidMount() {
		const { width, height } = this.props;

		this.d3container = d3.select(this.refs.container);

		this.simulation
			.force("collide", d3.forceCollide((d) => (d.radius)))
			.force("center", d3.forceCenter(width / 2, height / 2))
			.on("tick", () => this.onTick());

		this.updateScale(width, height);
		this.updateChart(this.props.data);
	}

	shouldComponentUpdate(nextProps) {

		const { width, height } = this.props;
		const shouldUpdate = (width !== nextProps.width) && (height !== nextProps.height);
		if (!shouldUpdate) {
			this.updateChart(nextProps.data);
		}  else {
			this.updateScale(width, height);
		}
		return shouldUpdate;
	}

	componentDidUpdate() {
		this.d3container = d3.select(this.refs.container);
		this.updateChart(this.props.data);
	}

	render() {
		const { data, width, height } = this.props;
		return ( 
			<div className="stats">
				<svg width={width} height={height} ref="container">
				</svg>
			</div>
		);
	}

	updateScale(width, height) {
		const maxRadius = Math.min(height, width) / 3;
	 	this.scaleRadius.range([0, maxRadius]);
	}

	updateChart(source) {
		const data = this.processData(source);

		const words = this.d3container
							.selectAll(".word")
							.data(data, function(d) { return d.word; });

		const exit = words.exit();
		exit
			.select("circle")
			.transition().duration(animDuration)
			.attr("r", 0);

		exit
			.select("text")
			.transition().duration(animDuration)
			.style("fill-opacity", 0);
		exit
			.transition().duration(animDuration)
			.remove();

		const enter = words.enter()
							.append("g")
							.attr("class", "word");
		enter
			.append("circle")
				.style("fill", function(d) { return d.color; })
				.style("fill-opacity", 0.7);

		enter
			.append("text")
			.text(function(d) { return d.word; })
				.style("text-anchor", "middle")
				.style("font", "monospace")
				.style("fill", "white");

		const update = enter.merge(words);
		update
			.select("circle")
			.transition().duration(animDuration)
			.attr("r", function(d) { return d.radius; });

		update
			.select("text")
			.transition().duration(animDuration)
			.style("font-size", function(d) { return `${ d.radius / 3 }px`;});

		this.simulation.nodes(data);
		this.simulation.alpha(0.3).restart();
	}

	processData(source) {
		const data = source.slice(0, maxCount);
		const total = d3.sum(data, function(d) { return d.count });
		this.scaleRadius.domain([0, total]);

		return data.map((d) => ({ 
			word: d.word,
			count: d.count,
			radius: this.scaleRadius(d.count), 
			color: scaleColor(Math.random()),
		}));
	}

	onTick() {
		const { height, width } = this.props;
		this.d3container
			.selectAll(".word")
				.attr("transform", function (d) { 
			 		if (d.x > width - d.radius) { d.x = width - d.radius; }
					else if (d.x < d.radius) { d.x = d.radius; }
					if (d.y > height - d.radius) { d.y = height - d.radius; }
					else if (d.y < d.radius) { d.y = d.radius; }
					return `translate(${d.x}, ${d.y})`; 
				});
	};
};

WordsStats.propTypes = {
 	width: PropTypes.number.isRequired,
  	height: PropTypes.number.isRequired,
 	data: PropTypes.array.isRequired
};

export default WordsStats;