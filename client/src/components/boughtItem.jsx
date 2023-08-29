import React from 'react';
import '../styles/itemList.css';
import '../styles/boughtItem.css';

export default class BoughtItem extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        const items = Array.from(this.props.items);
        const componants = items.map(
            item => <li>- {item.description} ({item.price} €)</li>
        );
        console.log(componants);
        const view =  (
        <div className="itemList bought-list">
            <span>Last bought</span>
            <ul>
                {componants}
            </ul>
        </div>)

        return view;
    }
}