import * as d3 from "d3";
import BaseChart from "./baseChart";

const maxCount = 10;
const byCount = function(a, b) {
	const delta = b.count - a.count; 
	if (delta !== 0) { return delta; }
	return a.word.toUpperCase() > b.word.toUpperCase();
}

class WordsChart extends BaseChart {

	prepareScales() {
		const { height, width } = this.size;
		this.simulation =  d3.forceSimulation()
							  .force("collide", d3.forceCollide((d) => (d._radius)))
							  .force("center", d3.forceCenter(width / 2, height / 2))
							  .on("tick", () => { 
									this.container
										.selectAll(".node")
										.attr("transform", function (d) { 
											if (d.x > width - d._radius) { d.x = width - d._radius; }
											else if (d.x < d._radius) { d.x = d._radius; }
											if (d.y > height - d._radius) { d.y = height - d._radius; }
											else if (d.y < d._radius) { d.y = d._radius; }
											return `translate(${d.x}, ${d.y})`; 
										});
							  });

		const maxRadius = Math.min(height, width) / 3;
		this.scaleRadius = d3.scaleSqrt().range([0, maxRadius]);
	}

	update(source) {
		const data = source.sort(byCount).slice(0, maxCount);
		this.updateScales(data);
		this.processData(data);

		const words = this.container
							.selectAll("g")
							.data(data, function(d) { return d.word; });

		words.exit().remove();

		const enter = words.enter().append("g").attr("class", "node");
		enter
			.append("circle")
				.style("fill", "SteelBlue")
				.style("fill-opacity", 0.7);

		enter
			.append("text")
			.text(function(d) { return d.word; })
				.style("text-anchor", "middle")
				.style("font", "monospace")
				.style("font-size", function(d) { return `${ d._radius / 3 }px`;})
				.style("fill", "white");

		const update = enter.merge(words);
		update
			.select("circle")
			.attr("r", function(d) { return d._radius; });

		this.simulation.nodes(data);
		this.simulation.alpha(0.8).restart();
	}

	processData(data) {
		data.forEach((d) => { d._radius = this.scaleRadius(d.count); });
	}

	updateScales(data) {
		const total = d3.sum(data, function(d) { return d.count });
		this.scaleRadius.domain([0, total]);
	}
};

export default WordsChart;