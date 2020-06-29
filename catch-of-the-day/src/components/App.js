import React from 'react';
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from "./Fish";
import base from "../base"

class App extends React.Component {
    state = {
      fishes: {},
      order: {}
    };
    componentDidMount() {
        // very first possible second app is on the page
        console.log("mounted");
        const { params } = this.props.match;
        this.ref = base.syncState(`${params.storeId}/fishes`,{
            context: this,
            state: 'fishes'
        })
    }

    componentWillUnmount() {
        console.log("unmounted")
        base.removeBinding(this.ref)
    }

    addFish = fish => {
        // 1. copy the existing state
        const fishes = {...this.state.fishes}; // object spread to copy an object
        // 2. add new fish to fishes
        fishes[`fish${Date.now()}`] = fish;
        this.setState({
            fishes  // fishes: fishes
        }); // object to update and new data

    }
    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes})
    };

    addToOrder = (key) => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1; // if order[key] does not exist then set to 1

        this.setState({order});
    }

    render() {
        return (
          <div className="catch-of-the-day">
              <div className="menu">
                  <Header tagline="Fresh Seafood Market"/>
                  <ul className="list-of-fish">
                      {Object.keys(this.state.fishes).map(key =>
                          <Fish
                              key={key}
                              index = {key} // pass the key value
                              details={this.state.fishes[key]}
                              addToOrder = {this.addToOrder}/>)}
                  </ul>
              </div>
              <Order fishes = {this.state.fishes} order={this.state.order}/>
              <Inventory addFish = {this.addFish} loadSampleFishes = {this.loadSampleFishes}/>
          </div>
        );
    }
}

export default App;