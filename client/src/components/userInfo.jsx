import React from 'react';
import '../styles/user.css';

export default class UserInfo extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="user">
				<p>
					User
					<span className="name"> {this.props.name}</span> with
					<span className="balance"> {this.props.money}</span> and
					<span> {this.props.id}</span>
					<button onClick={this.props.logout}>
					logout
					</button>
				</p>
			</div>
		)
	}
}
