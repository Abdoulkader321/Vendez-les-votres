import React from 'react';
import '../styles/item.css';

export default class Item extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.id);
    }

    buyItem()
    {
        this.props.action(this.props.id);
    }

    deleteItem()
    {
        this.props.action(this.props.id);
    }



    render() {
        return (
            <div className='item'>
                <p>{this.props.description}</p>
                <div>
                    <input 
                        type="number" 
                        value={this.props.price}
                        onChange={() => console.log("changing price")}
                    />€
                    <button
                        onClick={this.props.actionName === "buy" ? this.buyItem.bind(this):this.deleteItem.bind(this)}
                    >{this.props.actionName}</button>
                </div>
            </div>
        )
    }
}
