import * as d3 from "d3";

const margin = 40;

class SentencesChart {

	constructor( selector, data ) {
		const ph = d3.select(selector);
	    const size = ph.node().getBoundingClientRect();

	    this.prepareContainer(ph, size);
	    this.prepareScales(size);
	    if (data && data.length) {
	    	this.update(data);
	    }
	}

	prepareContainer(ph, size) {
		this.container = ph.append("svg")
				    		.attr("width", size.width)
				    		.attr("height", size.height)
				    	.append("g")
				    		.attr("class", "sentences-stats")
				    		.attr("transform", `translate(${margin}, ${margin})`);
	}

	prepareScales(size) {
		this.y = d3.scaleLinear()
				   .range([(size.height - 2*margin), 0]);

		this.x = d3.scaleBand()
					.range([0, (size.width - 2*margin)])
					.padding(0.1);
	}

	update(data) {
		const height = d3.max(this.y.range());

		this.y.domain([0, d3.max(data, (d) => d.words.length)]);
		this.x.domain(data.map((d) => d.order));
		
		const bars = this.container
			.selectAll("g")
			.data(data);

		const exit = bars.exit().remove();

		const enter = bars
						.enter()
						.append("g")
						.attr("transform", (d) => `translate(${this.x(d.order)}, ${this.y(d.words.length) / 2})`);
								
		enter
			.append("rect")
				.attr("rx", 5)
				.attr("ry", 5)
				.style("fill", "tomato");

		const update = enter.merge(bars);
		update
			.transition()
				.attr("transform", (d) => `translate(${this.x(d.order)}, ${this.y(d.words.length) / 2})`)

		update
			.select("rect")
				.transition()
					.attr("width", this.x.bandwidth())
					.attr("height",(d) => ( height - this.y(d.words.length)));
	}
};


export default SentencesChart;