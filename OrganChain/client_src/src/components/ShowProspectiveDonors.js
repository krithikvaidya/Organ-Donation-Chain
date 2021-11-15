import React, {Component} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

class ShowProspectiveDonors extends Component{

    state = { recipients: [] }

    componentWillMount() {
      this.getRecipients();
    }

    getRecipients() {
      let accessToken = localStorage.ptspotter_accessToken;
      axios.get('http://localhost:3000/api/Recipient?access_token='+accessToken).then((response) => {
        let recipientsList = [];
        
        recipientsList = response.data.filter((recipient) => {
          return (recipient.organ === localStorage.organ) && (recipient.got_organ === false);
        })

        this.setState({recipients: recipientsList}, () => {

        })

      })
      .catch(err => console.log(err));
    }
      
    render() {
        return (
            <Card>
            {this.state.recipients.map((recipient) => {
              return (
                <p>
                  {recipient.firstName}
                </p>
              )
            })}
            </Card>
        )
    }
}

export default ShowProspectiveDonors;