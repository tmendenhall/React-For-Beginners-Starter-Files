import React from 'react';

class EditFishForm extends React.Component {

    handleChange = (event) => {
          console.log(event.currentTarget.value);
          //update that fish
        // get a copy of the current fish
        // computed value based on the event
        const updatedFish = {...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        };
        console.log(updatedFish);
        // pass the key in again
        this.props.updateFish(this.props.index,updatedFish);
    }

    render() {
        return <div className="fish-edit">
            <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name}/>
             {/*name is important as that*/}
             {/*is the field being updated*/}
            <input type="text" name="price" onChange={this.handleChange} value={this.props.fish.price}/>
            <select type="text" name="status"onChange={this.handleChange} value={this.props.fish.status}>
                <option value={"unavailable"}>Fresh!</option>
                <option value={"unavailable"}>Sold Out!</option>
            </select>
            <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc}/>
            <input type="text" name="image" onChange={this.handleChange} value={this.props.fish.image}/>
            <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
        </div>
    }


}

export default EditFishForm;