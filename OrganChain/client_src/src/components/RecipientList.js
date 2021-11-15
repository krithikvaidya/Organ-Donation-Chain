import React, {Component} from 'react';

class RecipientList extends Component{
    constructor(props){
        super(props);
        this.state = {
            item:props.item
        }
    }
    
    render () {
        return(
            <li className="collection-item"> Recipient ID: {this.state.item.recipientId} <br />
            Organ: {this.state.item.organName} 
            <br />Got Organ: {this.state.item.got_organ === true ? "true" : "false"}</li>
        )
    }
}

export default RecipientList;