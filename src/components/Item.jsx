import React, {useContext} from "react";
import ItemContext from '../context/items/itemsContext';
import {
	withRouter
  } from 'react-router-dom'

const Item = ({item, history}) => {

	
	
	const itemContex = useContext(ItemContext);
	const {setCurrent} = itemContex;
	const navigateToItem = () => {
		setCurrent(item);
		history.push('/item')
	}
	return (
		<div className="card medium">
			<div className="card-image">
				<img style={{minHeight: "280px", height: "auto"}} src={item.imageUrl} alt="" />
				<span className="card-title bold capitalize" style={{color: 'black'}}>{item.name}</span>
			</div>
			<div className="card-content">
				<p style={{textTransform: "capitalize"}}>{item.description}</p>
			</div>
			<div className="card-action">
				<div className="row">
					<div className="col m7">
					<p style={{fontWeight:"bold", fontSize: "1.5rem"}}>$ {item.price}</p>
					</div>
					<div className="col m5">
						{item.available ? (
							<p style={{color: 'green'}}>Available  <i className="material-icons">check</i></p>
						) : (<p style={{color: 'green'}}>Not Available  <i className="material-icons">close</i></p>)}
					</div>
					<br/>
					<button onClick={navigateToItem} className="btn orange">Edit <i className="material-icons right">edit</i></button>

				</div>
				
			</div>
		</div>
	);
};

// @ts-ignore
export default withRouter(Item);
