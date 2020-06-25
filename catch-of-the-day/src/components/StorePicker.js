import React, {Fragment} from "react";
import {getFunName} from "../helpers";

class StorePicker extends React.Component {

    myInput = React.createRef();

    goToStore = (event) => { // creates a function in the context of the StorePicker component to access 'this'
        event.preventDefault(); // stop form from submitting
        // get text input
        const storeName = this.myInput.current.value;
        // change the route
        this.props.history.push(`/store/${storeName}`)
    }

    render() {
        return (
            <Fragment>
                <form className="store-selector" onSubmit={this.goToStore}>
                    <h2>Please enter a Store</h2>
                    <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={this.myInput}/>
                    <button type="submit">Visit Store -></button>
                </form>
            </Fragment>)

    }
}

export default StorePicker;