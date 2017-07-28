import React from 'react';
import * as d3 from 'd3';
import {select, selection} from 'd3-selection';
import 'd3-selection-multi';
import TestData from '../../testData.js';
import '../styles/edge.css'


class Edge extends React.Component {
  constructor(props){
    super(props)
    this.opts = {
      diameter: 960, // h & w set the aspect ratio of the svg
      radius: 480,
      innerRadius: 480 - 120
    }
    this.drawEdges = this.drawEdges.bind(this)
    this.packageHierarchy = this.packageHierarchy.bind(this)
    this.packageImports = this.packageImports.bind(this)
  }

  componentDidMount(){
    this.drawEdges()
  }

  drawEdges(){
    let svg = select(this.node)
    let cluster = d3.cluster()
      .size([360, this.opts.innerRadius])
    let line = d3.radialLine()
      .curve(d3.curveBundle.beta(0.75))
      .radius(function(d) { return d.y; })
      .angle(function(d) { return d.x / 180 * Math.PI; });
    
    //add group
    let g = svg.append('g').attr('transform',`translate(${this.opts.radius}, ${this.opts.radius})`)
    let link = g.append('g').selectAll('.link')
    let node = g.append('g').selectAll('.node')
    
    let root = this.packageHierarchy(TestData)
        .sum(d => d.size)
    cluster(root)

    let d = this.packageImports(root.leaves())
    link = link
        .data(d)
        .enter().append('path')
        .each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
        .attrs({
          class: 'link',
          d: line,
        })

    node = node
    .data(root.leaves())
    .enter().append("text")
      .attr("class", "node")
      .attr("dy", "0.31em")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .text(function(d) { return d.data.key; })

  }

  /*
  FROM TEMPLATE
  ~~~~~~~~~~~~~ */
  // Lazily construct the package hierarchy from class names.
  packageHierarchy(classes) {
    var map = {};

    function find(name, data) {
      var node = map[name], i;
      if (!node) {
        node = map[name] = data || {name: name, children: []};
        if (name.length) {
          node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
          node.parent.children.push(node);
          node.key = name.substring(i + 1);
        }
      }
      return node;
    }

    classes.forEach(function(d) {
      find(d.name, d);
    });

    return d3.hierarchy(map[""]);
  }

  packageImports(nodes) {
    var map = {},
        imports = [];

    // Compute a map from name to node.
    nodes.forEach(function(d) {
      map[d.data.name] = d;
    });

    // For each import, construct a link from the source to target node.
    nodes.forEach(function(d) {
      if (d.data.imports) d.data.imports.forEach(function(i) {
        imports.push(map[d.data.name].path(map[i]));
      });
    });

    return imports;
  }

  render(){
    return(
      <div className="edge">
        <h1>EDGE</h1>
        <svg ref={(node) => {this.node = node}} id="edge-chart" 
                                            viewBox={`0 0 ${this.opts.diameter} ${this.opts.diameter}`}
                                            preserveAspectRatio="xMidYMid"></svg>
      </div>
    )
  }
}

export default Edge
