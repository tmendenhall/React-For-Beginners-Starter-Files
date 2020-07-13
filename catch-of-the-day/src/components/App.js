import React from 'react';
import PropTypes from "prop-types";
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from "./Fish";
import base from "../base"


class App extends React.Component {

    static propTypes = {
        match: PropTypes.object
    }

    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        // very first possible second app is on the page
        console.log("mounted");
        const {params} = this.props.match;
        // reinstate from local storage
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)});
        }
        //this.state.order = localStorageRef;
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("updated!");
        const storeId = this.getStoreId();
        localStorage.setItem(storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        console.log("unmounted")
        base.removeBinding(this.ref)
    }

    getStoreId = () => {
        return this.props.match.params.storeId;
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
    updateFish = (key, updatedFish) => {
        // copy current state
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({fishes})
    }

    deleteFish = (key) => {
        // copy current state
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({fishes});
    }

    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes})
    };

    addToOrder = (key) => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1; // if order[key] does not exist then set to 1

        this.setState({order});
    }

    removeFromOrder = (key) => {
        const order = {...this.state.order};
        // no error if it doesn't exist
        delete order[key];
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
                                index={key} // pass the key value
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder}/>)}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
                <Inventory addFish={this.addFish}
                           updateFish={this.updateFish}
                           deleteFish={this.deleteFish}
                           loadSampleFishes={this.loadSampleFishes}
                           fishes={this.state.fishes}
                />

            </div>
        );
    }
}

export default App;