import * as d3 from "d3";

class BaseChart {

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
				    		.append("g");
	}

	prepareScales() { }

	update(data) { }
};

export default BaseChart;