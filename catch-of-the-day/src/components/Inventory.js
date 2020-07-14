import React from 'react';
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import PropTypes from "prop-types";
import Login from "./Login";
import base, {firebaseApp} from "../base";

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        addFish: PropTypes.func,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    }

    state = {
        uid: null,
        owner: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user){
                this.authHandler({user}).then(() => {
                        console.log("auth handler return");
                }
                );
            }

        })
    }

    authHandler = async (authData) => {
        console.log(authData);
        // 1. look up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, {context: this});
        console.log(JSON.stringify(store));
        //debugger
        // 2. Claim if no owner (?)
        if (!store.owner) {
            await base.push(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }
        // 3. State the inventory component state to reflect the current user

        this.setState({ // state local to component
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
    }

    authenticate = (provider) => {
        // dynamic lookup of the name by convention to get the object
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    }

    logout = async () => {
        console.log("logout");
        await firebase.auth().signOut();
        this.setState({
            uid: null
        })
    }

    render() {

        const logout = <button onClick={this.logout}>Log Out</button>;
        // check for login.. (done at the router level?)
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate}/>
        }

        // check for owner (authorized)
        //debugger
        if (this.state.uid !== this.state.owner[Object.keys(this.state.owner)[0]]) {
            return <div>
                <p>Sorry you are not the owner</p>
                {logout}
            </div>
        }

        //login + owner so render
        return (
            <div className="inventory">
                <h2>inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => <EditFishForm key={key} index={key}
                                                                         fish={this.props.fishes[key]}
                                                                         updateFish={this.props.updateFish}
                                                                         deleteFish={this.props.deleteFish}
                />)}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        )

    }
}

export default Inventory;