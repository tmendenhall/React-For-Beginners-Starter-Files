import React from 'react';
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'

class App extends React.Component {
    state = {
      fishes: {},
      order: {}
    };
    addFish = fish => {
        // 1. copy the existing state
        const fishes = {...this.state.fishes}; // object spread to copy an object
        // 2. add new fish to fishes
        fishes[`fish${Date.now()}`] = fish;
        this.setState({
            fishes  // fishes: fishes
        }); // object to update and new data

    }
    render() {
        return (
          <div className="catch-of-the-day">
              <div className="menu">
                  <Header tagline="Fresh Seafood Market"/>
              </div>
              <Order/>
              <Inventory addFish = {this.addFish}/>
          </div>
        );
    }
}

export default App;