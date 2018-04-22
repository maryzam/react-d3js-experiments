# React.js + D3.js Experiments

Exploring the ways of creating data visualization using D3.js for React.js application.

This repo contains source code of a simple Text analyzer.

The Analyzer aggregates information about provided text and displays it as colorful dashboard.

The Dashboard includes 4 core parts:
- **Overview** 

(no D3, just a simple React.Component)
- **Text structure** (words per sentences) 

(React for structure & rendering elements (enter/exit), D3 for calculations & attribute manipulations (update)) 
- **Top words** 

(React for structure, D3 for calculation & rendering)
- **Letters Statistic** 

(D3 for calculation & rendering to a fake DOM (thanks ["react-faux-dom"](https://github.com/Olical/react-faux-dom)), React for real rendering)



[Live DEMO](https://maryzam.github.io/react-d3js-experiments/)
