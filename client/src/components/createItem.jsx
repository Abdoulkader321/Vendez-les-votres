import React from 'react';
import '../styles/createItem.css'; // change

export default class CreateItem extends React.Component {

    constructor(props){
        super(props);
        this.refDescription = React.createRef();
        this.refPrice = React.createRef();
    }

    create()
    {
        const desc = this.getDescription();
        const price = this.getPrice();
        this.props.create(desc, price);
        console.log(`description ${desc} - price ${price}`);
    }

    getDescription()
    {
        return this.refDescription.current.value;
    }

    getPrice()
    {
        return this.refPrice.current.value;
    }

    render() {
        const view = (
            <div className="createItem-parent">
                <span> create items</span>
                <div className="createItem">
                    <input type="text" ref={this.refDescription}/>
                    <input type="number" ref={this.refPrice}/>€
                    <button onClick={this.create.bind(this)}>sell</button>
                </div>
            </div>
        )

        return view;
    }

}