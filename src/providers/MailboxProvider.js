import React, { Component, createContext } from "react";
import { getAllEmails } from "../utils/api";

export const MailboxContext = createContext({
  inbox: []
});

export default class MailboxProvider extends Component {
  static contextType = MailboxContext.Consumer;

  state = {
    inbox: []
  };

  componentDidMount() {
    getAllEmails().then(data => {
      const inbox = data.send;

      this.setState(
        {
          inbox
        },
        () => console.log("started", this.state)
      );
    });

    // this.setState({
    //   inbox: this.props.inbox
    //   // send: this.props.send
    // });
  }

  render() {
    return (
      <MailboxContext.Provider value={this.state}>
        {this.props.children}
      </MailboxContext.Provider>
    );
  }
}
