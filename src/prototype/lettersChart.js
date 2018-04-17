import * as d3 from "d3";

const minWidth = 20;

class LettersChart {

	constructor(container, data) {

		const ph = d3.select(container);

	    this.size = ph.node().getBoundingClientRect();

	    this.prepareContainer(ph);
	    this.prepareScales();

	    if (data && data.lenght) {
	    	this.update(data);
	    }
	}

	prepareContainer(ph) {
	  	this.container = ph.append("svg")
				    		.attr("width", this.size.width)
				    		.attr("height", this.size.height)
				    	.append("g")
				    		.attr("class", "letters-stats")
				    		.attr("transform", `translate(0, ${this.size.height / 2})`);
	}

	prepareScales() {
		this.scaleFreq = d3.scaleLinear().range([0.1, 1]);
		this.scalePos = d3.scaleLinear().range([0, this.size.width]);
	}

	update(data) {

		this.processData(data);

		const letters = this.container.selectAll("g").data(data);

		const exit = letters.exit().remove();

		const enter = letters
						.enter()
						.append("g")
							.attr("transform", (d) => `translate(${this.scalePos(d._offset)}, 0)`);
		enter
			.append("rect")
				.attr("height", 10)
				.attr("rx", 3)
				.attr("ry", 3)
				.style("stroke", "white");

		enter
			.append("circle")
				.attr("r", 8)
				.attr("cy", 5);

		enter
			.append("text")
				.style("text-anchor", "middle")
				.style("font", "10px monospace")
				.text((d) => d.letter)
				.attr("y", 7);

		const update = enter.merge(letters);

		update
			.attr("transform", (d) => `translate(${this.scalePos(d._offset)}, 0)`);

		update
			.select("rect")
			.style("fill", (d) => (d.frac === 0) ? "gold" : "orange")
			.attr("width", (d) => this.scalePos(d._width));

		update
			.select("circle")
			.style("fill", (d) => (d.frac === 0) ? "gold" : "orange")
			.attr("cx", (d) => this.scalePos(d._width) / 2);

		update
			.select("text")
			.attr("x", (d) => this.scalePos(d._width) / 2);
	}

	processData(data) {
		let offset = 0;
		data.forEach((d) => {
			d._width = this.scaleFreq(d.frac) ;
			d._offset = offset;
			offset += d._width;
		});

		this.scalePos.domain([0, offset]);
		return data;
	}

}

export default LettersChart;