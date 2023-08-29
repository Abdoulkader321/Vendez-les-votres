import React from 'react';
import '../styles/itemList.css';
import Item from './item.jsx';

export default class ItemList extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const items = Array.from(this.props.items);
        let i = 0;
        const subComponents = items.map(
            item => <Item 
                        key={i++}
                        action={this.props.action}
                        actionName={this.props.actionName}
                        description={item.description}
                        price={item.price}
                        id={item._id}
                    />
        )
        return (
            <div className="itemList">
                {subComponents}
            </div>
        )
    }
}
