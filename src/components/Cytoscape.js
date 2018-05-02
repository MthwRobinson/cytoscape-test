import React, {Component} from 'react';
import cytoscape from 'cytoscape';

var elements = require('./elements.json');

let cyStyle = {
  height: '600px',
  width: '1200px',
  display: 'block'
};

class Cytoscape extends Component{
  cy = null;

  componentDidMount(){

    let cy = cytoscape({
      container: this.refs.cyelement, // container to render in
      elements: elements,
          style: [ // the stylesheet for the graph
        {
        selector: 'node',
        style: {
          'background-color': '#666',
          'label': 'data(id)'
        }
        },

        {
        selector: 'edge',
        style: {
          'width': 3,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle'
        }
        }
      ],
      layout: {
        name: 'cose',
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 100,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
      }
    });

    this.cy = cy;
    cy.json({elements: this.props.elements});
  }

  shouldComponentUpdate(){
    return false;
  }

  componentWillReceiveProps(nextProps){
    this.cy.json(nextProps);
  }

  componentWillUnmount(){
    this.cy.destroy();
  }

  getCy(){
    return this.cy;
  }

  render(){
    return <div style={cyStyle} ref="cyelement" />
  }
}

export default Cytoscape;
