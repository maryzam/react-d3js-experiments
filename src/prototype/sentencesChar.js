import * as d3 from "d3";

class SentencesChart {

	counstructor( selector, data ) {

		const ph = d3.select(container);
	    const size = ph.node().getBoundingClientRect();

	    this.prepareContainer(ph, size);
	    this.setupScales(data, size);
	    this.render(data);

	}

	prepareContainer(ph, size) {
		this.container = ph.append("svg")
				    		.attr("width", size.width)
				    		.attr("height", size.height)
				    	.append("g")
				    		.attr("class", "star-colors");
	}

	setupScales(data, size) {

		this.y = d3.scaleLinear()
				   .domain(d3.extent(data, (d) => d.words.length))
				   .range([height, 0]);

		this.x = d3.scaleBand()
					.domain(data.map((d) => d.order))
					.range([0, size.width])
					.padding(0.1);
	}

	update(data) {
		this.y.domain(d3.extent(data, (d) => d.words.length));
		this.x.domain(data.map((d) => d.order));
		this.render(data);
	}

	render(data) {

		const bars = this.container
			.selectAll("g")
			.data(data);

		bars.enter()
			.append("g")
				.attr("transform", (d) => `translate(${this.x(d.order)}, ${this.y(d.words.length)})`)
			.append("rect")
				.attr("width", this.x.bandwidth())
				.attr("height",(d) => this.y(d.words.length));
	}
};


export default SentencesChart;