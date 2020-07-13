import React from 'react';
import {formatPrice} from "../helpers";

class Order extends React.Component {
    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        // make sure the fish is loaded from firebase storage before rendering...
        // not sure if this is a good long term choice.

        if (!fish) return null;
        const isAvailable = fish.status === 'available'

         if (!isAvailable){
             return <li key={key}>
               Sorry {fish ? fish.name : 'fish'} is no longer available
             </li>
         } else {
             return <li key={key}>
                 {count} lbs {fish.name}
                 {formatPrice(fish.price)}
                 <button onClick={() => {this.props.removeFromOrder(key)}}>&times;</button>
             </li>
         }

    };

    render() {
        //1 tally total
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal,key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status ==='available';

            if (isAvailable){
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
        },0);
        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <ul className="order">
                    {orderIds.map(this.renderOrder)}
                </ul>

                <div className="total">
                    <strong>{formatPrice(total)}</strong>
                </div>

            </div>
        )
    }
}

export default Order;