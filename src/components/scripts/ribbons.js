import React from 'react'
import * as d3 from 'd3';
import {select, selection} from 'd3-selection';
import 'd3-selection-multi';

class Ribbons extends React.Component {
  constructor(props){
    super(props)
    this.opts = {
      width: 960, // h & w set the aspect ratio of the svg
      height: 960,
    }
    // this.data = {
    //     "matrix":[[0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,1,0,1,0,0,0],[0,1,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,1,0,0,0,0,0],[0,0,0,1,0,0,0,0,1,0,0],[0,1,0,0,1,0,1,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0],[0,1,0,0,0,0,0,0,1,0,0],[0,0,0,0,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,1,0]],
    //     "keyByIndex":{"$0":"j","$1":"a","$2":"m","$3":"i","$4":"e","$5":" ","$6":"s","$7":"b","$8":"l","$9":"r","$10":"tab"},
    //     "indexByKey":{"$j":0,"$a":1,"$m":2,"$i":3,"$e":4,"$ ":5,"$s":6,"$b":7,"$l":8,"$r":9,"$tab":10}
    //     }
    this.matrix = this.props.matrix
    this.keyByIndex = this.props.keyByIndex
    this.indexByKey = this.props.indexByKey
    this.drawRibbonDiagram = this.drawRibbonDiagram.bind(this)

  }
  componentDidMount(){
    this.drawRibbonDiagram()
  }
  drawRibbonDiagram(){
    let svg = select(this.node)
    let outerRadius = Math.min(this.opts.width, this.opts.height) * 0.5 - 40,
        innerRadius = outerRadius - 30;

    // let formatValue = d3.formatPrefix(",.0", 1e3);
    var fill = d3.scaleLinear()
                .domain([0, this.matrix[0].length])
                .range(['red','blue'])

    let chord = d3.chord()
        .padAngle(0.05)
        .sortSubgroups(d3.descending)
        .sortChords(d3.descending)

    let arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    let ribbon = d3.ribbon()
        .radius(innerRadius);

    let color = d3.scaleLinear()
        .domain([0,12])
        .range(['blue', 'red']);

    let globalGroup = svg.append("g")
        .attr("transform", "translate(" + this.opts.width / 2 + "," + this.opts.height / 2 + ")")
        .datum(chord(this.matrix));

    var g = globalGroup.selectAll(".group")
        .data(chords => chords.groups)
        .enter().append("g")
        .attr("class", "group");

    g.append("path")
        .style("fill", function(d) { return fill(d.index); })
        .style("stroke", function(d) { return fill(d.index); })
        .attrs({
          d: arc,
          class: 'arc',
          stroke: 'white',
        });

    g.append("text")
        .each(d => d.angle = (d.startAngle + d.endAngle) / 2 )
        .attr("dy", ".35em")
        .attr("transform", d => {
          return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
              + "translate(" + (innerRadius + 35) + ")"
              + (d.angle > Math.PI ? "rotate(180)" : "");
        })
        .style("text-anchor", d => d.angle > Math.PI ? "end" : null)
        .text( d => this.keyByIndex.get(d.index));

    
    globalGroup.selectAll(".ribbon")
        .data(chords => {console.log(chord); return chords})
      .enter().append("path")
        .attr("class", "ribbon")
        .style("stroke", d => {console.log(d); d3.rgb(fill(d.source.index)).darker()})
        .style("fill", d =>  fill(d.source.index))
        .attr("d", ribbon);

  }
  render(){
    return (
      <div className="ribbons">
        <h1>Ribbons</h1>
        <svg ref={(node) => {this.node = node}} id="edge-chart" 
                                            viewBox={`0 0 ${this.opts.width} ${this.opts.height}`}
                                            preserveAspectRatio="xMidYMid"></svg>
      </div>
    )
  }
}

export default Ribbons
