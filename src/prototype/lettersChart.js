import * as d3 from "d3";

class LettersChart {

	constructor(container, data) {

		const ph = d3.select(container);
	    const size = ph.node().getBoundingClientRect();

	    this.prepareContainer(ph, size);
	    this.setupScales(data, size);
	    this.update(data);
	}

	prepareContainer(ph) {
	  	this.container = ph.append("svg")
				    		.attr("width", this.size.width)
				    		.attr("height", this.size.height)
				    	.append("g")
				    		.attr("class", "star-colors");
	}

	setupScales(data, size) {

	}

	update(data) {

	}
}

export default LettersChart;