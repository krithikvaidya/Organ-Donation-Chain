import React, {Component} from 'react';

class DonorList extends Component{
    constructor(props){
        super(props);
        this.state = {
            item:props.item
        }
    }

    render () {
        return(
            <li className="collection-item" onClick={this.function = () => {
                console.log("clicked : " + this.state.item.donorId);
            }}> Donor ID: {this.state.item.donorId} <br />Organ: {this.state.item.name}
            <br/>Recipient Assigned: {this.state.item.recipient_assigned === true ? "true" : "false"}</li>
            // {this.state.item.firstName + " " + this.state.item.lastName}</li>
        )
    }
}

export default DonorList;