import React, {Component} from 'react';
import cytoscape from 'cytoscape';

var elements = require('./elements.json');

let cyStyle = {
  height: '400px',
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
        name: 'grid',
        rows: 1
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
