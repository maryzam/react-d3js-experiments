import * as d3 from "d3";
import BaseChart from "./baseChart";

const maxCount = 10;
const animDuration = 500;

class WordsChart extends BaseChart {

	prepareScales() {
		const { height, width } = this.size;
		this.simulation =  d3.forceSimulation()
							  .force("collide", d3.forceCollide((d) => (d.radius)))
							  .force("center", d3.forceCenter(width / 2, height / 2))
							  .on("tick", () => this.ticked());

		const maxRadius = Math.min(height, width) / 3;
		this.scaleRadius = d3.scaleSqrt().range([0, maxRadius]);
		this.scaleColors = d3.scaleLinear().range(["tomato", "gold"]);
	}

	update(source) {
		const data = source.slice(0, maxCount);
		this.updateScales(data);
		this.processData(data);

		const words = this.container
							.selectAll("g")
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

		const enter = words.enter().append("g").attr("class", "node");
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

	processData(newData) {
		newData.forEach((d) => { 
			d.radius = this.scaleRadius(d.count); 
			d.color = this.scaleColors(Math.random());
		});
	}

	updateScales(data) {
		const total = d3.sum(data, function(d) { return d.count });
		this.scaleRadius.domain([0, total]);
	}

	ticked = () => {
		const { height, width } = this.size;
		this.container
			.selectAll(".node")
				.attr("transform", function (d) { 
			 		if (d.x > width - d.radius) { d.x = width - d.radius; }
					else if (d.x < d.radius) { d.x = d.radius; }
					if (d.y > height - d.radius) { d.y = height - d.radius; }
					else if (d.y < d.radius) { d.y = d.radius; }
					return `translate(${d.x}, ${d.y})`; 
				});
	};

};

export default WordsChart;