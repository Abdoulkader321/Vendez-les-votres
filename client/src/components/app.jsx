import React from 'react';
import '../styles/app.css';
import UserInfo from './userInfo.jsx';
import ItemList from './itemList.jsx';
import CreateItem from './createItem.jsx';
import BoughtItem from './boughtItem.jsx';
import FakeFetch from '../scripts/fakeFetch';
require("babel-core/register");
require("babel-polyfill");

export default class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			money: null,
			myItems: [],
			otherItems: [],
			lastBought: []
		};
		this.id = null;
		this.name = null;
		this.urlBase = "http://localhost:4800/";
	}



	/**
	 * recupère les informations de l'utilisateur connecté.
	 */
	async getUserInfo()
	{
		const requestOptions = {
			method :'GET',
		};
		const url = "user/me";

		const response = await fetch(url, requestOptions);
		if (response.ok)
		{
			const user =  await response.json();
			this.initUser(user);
		} else {
			const error = await response.json();
			// todo handle error
		}
	}

	/**
	 * initialise user infos (id, money, name)
	 * @param data
	 */
	initUser(data)
	{
		this.id = data.id;
		this.name = data.name;
		this.setState({money: data.money});
	}

	/** fonction de deconnexion de l'utilisateur
	 */
	async logout()
	{
		console.log("deconnexion !!");
		const requestOptions = {
			method :'GET',
		};
		const url = "access/logout";

		const response = await fetch(url, requestOptions);
		if (response.ok)
		{
			// todo
			window.location.href = "/access/login";
		} else {
			const error = await response.json();
			// todo handle error
			this.writeOnWebSite("deconnexion echouee", true);
		}
	}

	/**achat d'un article
	*/
	async buyItem(itemId)
	{
		const requestOptions = {
			method :'PUT',
		};
		const url = `buy/${itemId}`;

		const response = await fetch(url, requestOptions);
		if (response.ok)
		{	
			// update
			this.updateBoughtItems();  // update car un article a eté acheté
			this.getUserInfo(); // update car la balance de l'utilisateur a changé
			this.otherItems();
			this.writeOnWebSite("Item acheté avec succés", false);
		} else {
			const error = await response.json();
			// todo handle error
			this.writeOnWebSite(error.message, true);
		}
	}

	/** vente d'un article
	 */
	async sellItem(itemDesc, itemPrice)
	{
		const itemData = {
			description: itemDesc,
			price: itemPrice
		};
		console.log("Sell item: description (client): " + itemData.description);

		const body = JSON.stringify(itemData);
		const requestOptions = {
			method :'POST',
			headers : { "Content-Type": "application/json" },
			body: body
		};
		const url = "item";
		const response = await fetch(url, requestOptions);
		if (response.ok){

			this.updateMyItems();
			this.writeOnWebSite("Item crée pour la vente avec succés", false);

		} else {
			const error = await response.json();
			this.writeOnWebSite(error.message, true);
			// todo handle error
		}
	}

	/** remove item from the database
	 */
	async removeItem(id)
	{
		console.log("deletion: " + id);

		const requestOptions = {
			method :'GET'
		};
		const url = "item/delete?id=" + id;
		const response = await fetch(url, requestOptions);

		if (response.ok)
		{
			const myItemsUpdated = this.state.myItems.filter(item => item._id != id);
			this.setState({myItems: myItemsUpdated});
			this.writeOnWebSite("item deleted with success", false);
		} else {
			const error = await response.json();
			this.writeOnWebSite('error during deletion', true);
			// todo handle error
		}
	}

	/**
	 * Write the message ${message} on the app.
	 * If it's an error message, the color of the text is red
	 * else, green.
	 */
	writeOnWebSite(message, is_an_error_message){
		let element = document.getElementById("message");
		element.innerHTML = message;
		if(is_an_error_message){
			element.style.color = "red";
		}else{
			element.style.color = "green";
		}
		
	}


	async updateMyItems()
	{
		const requestOptions = {
			method :'GET',
		};
		const url = "item/me";

		const response = await fetch(url, requestOptions);
		if (response.ok)
		{
			const items =  await response.json();
			this.setState({myItems: items});
		} else {
			const error = await response.json();
			// todo handle error
		}
	}

	async updateOthersItems()
	{
		const requestOptions = {
			method :'GET',
		};
		const url = "item/others";

		const response = await fetch(url, requestOptions);
		if (response.ok)
		{
			const items = await response.json();
			this.setState({otherItems: items});
		} else {
			const error = await response.json();
			// todo handle error
		}
	}

	
	async updateBoughtItems(){

		const requestOptions = {
			method :'GET',
		};
		const url = "buy";

		const response = await fetch(url, requestOptions);
		if (response.ok)
		{
			const items = await response.json(); // bought items
			this.setState({lastBought: items});
		} else {
			const error = await response.json();
			// todo handle error
		}
	}
	
	componentDidMount()
	{
		this.getUserInfo();
		this.updateOthersItems();
		this.updateMyItems();
		this.updateBoughtItems();
	}


	render() {
		return (
			<div className="App">
				<UserInfo
					name={this.name}
					money={this.state.money}
					id={this.id}
					logout={this.logout.bind(this)}
				/>
				<p id="message"> Welcome {this.name} </p>
				<span>My items</span>
				<ItemList 
					action={this.removeItem.bind(this)}
					actionName="remove"
					items={this.state.myItems}
				/>
				<CreateItem create={this.sellItem.bind(this)}/>
				<span>Others items</span>
				<ItemList 
					action={this.buyItem.bind(this)} 
					actionName="buy"
					items={this.state.otherItems}
				/>
				<BoughtItem items={this.state.lastBought}/>
			</div>)
	}
}
