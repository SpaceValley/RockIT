/* eslint-disable jsx-a11y/anchor-is-valid */
// Core
import React, { Component } from "react";
import {
    Nav,
    NavItem,
    NavLink,
    Badge,
    Button,
    FormGroup,
    Input
} from "reactstrap";
import { getOneEmail, sendEmail } from "../../../utils/api";
import moment from "moment";
// Context
import {
    MailboxContext
    // MailboxProvider
} from "../../../providers/MailboxProvider";

class Message extends Component {
    // static contextType = MailboxContext;

    state = {
        message: {},
        messageText: "",
        dropdownOpen: false,
      saveResponse: {}
    };

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    componentDidMount() {
        const { id, type } = this.props.match.params;
        console.log(id, type);

        getOneEmail(id, type).then(message => {
            const data = message.email;

            if(type === 'send'){
                this.setState({
                    message: { ...data, title: data.subject, author: data.from }
                });
            } else {
                this.setState({
                    message: { ...data, title: data.subject, author: data.from }
                });
            }
        });
    }

  handleSubmit = event => {
    event.preventDefault();

    const { messageText } = this.state;
    const { subject, to} = this.state.message;

    const content = {
      body: messageText,
      email: to,
      subject: subject
    };

    this.saveMessage(content);
  };

  saveMessage = (data) => {
    sendEmail(data).then( response => {
      const message = response.message;
      this.setState({saveResponse: message}, () => {
        this.setState({ dataSaved: true}, () => {
          console.log("saved data", this.state)
        });
      });
    });
  };

    render() {
        const { to, title, author, email, date, from } = this.state.message;
        const { dataSaved } = this.state;

        return (
            <div className="animated fadeIn">
              <div className="email-app mb-4">
                <nav>
                  <a href="#/email/compose" className="btn btn-danger btn-block">
                    New Email
                  </a>
                  <Nav>
                    <NavItem>
                      <NavLink href="#/email/inbox">
                        <i className="fa fa-inbox" /> Messages
                          {/* <Badge color="danger">4</Badge> */}
                      </NavLink>
                    </NavItem>
                      {/* <NavItem>
                       <NavLink href="#">
                       <i className="fa fa-rocket" /> Sentttt
                       </NavLink>
                       </NavItem> */}
                  </Nav>
                </nav>
                <main className="message">
                  <div className="details">
                    <div className="title">{title}</div>
                    <div className="header">
                      <img
                          className="avatar"
                          src="assets/img/avatars/7.jpg"
                          alt="avatar"
                      />
                      <div className="from">
                        <span>{author}</span>
                          {from}
                          {to}
                      </div>
                      <div className="date">
                          {/* Today, <b>3:47 PM</b> */}
                          {moment(date).calendar()}
                      </div>
                    </div>
                    <div className="content">
                        {/* <MailboxConsumer>
                         {({ inbox }) => <p>{inbox}</p>}
                         </MailboxConsumer> */}
                      <p dangerouslySetInnerHTML={{ __html: email }} />
                    </div>
                      {/*<div className="attachments">
                       <div className="attachment">
                       <Badge color="danger">zip</Badge> <b>bootstrap.zip</b>{" "}
                       <i>(2,5MB)</i>
                       <span className="menu">
                       <a href="#" className="fa fa-search">
                       {null}
                       </a>
                       <a href="#" className="fa fa-share">
                       {null}
                       </a>
                       <a href="#" className="fa fa-cloud-download">
                       {null}
                       </a>
                       </span>
                       </div>
                       <div className="attachment">
                       <Badge color="info">txt</Badge> <b>readme.txt</b> <i>(7KB)</i>
                       <span className="menu">
                       <a href="#" className="fa fa-search">
                       {null}
                       </a>
                       <a href="#" className="fa fa-share">
                       {null}
                       </a>
                       <a href="#" className="fa fa-cloud-download">
                       {null}
                       </a>
                       </span>
                       </div>
                       <div className="attachment">
                       <Badge color="success">xls</Badge> <b>spreadsheet.xls</b>{" "}
                       <i>(984KB)</i>
                       <span className="menu">
                       <a href="#" className="fa fa-search">
                       {null}
                       </a>
                       <a href="#" className="fa fa-share">
                       {null}
                       </a>
                       <a href="#" className="fa fa-cloud-download">
                       {null}
                       </a>
                       </span>
                       </div>
                       </div>*/}
                    <form onSubmit={this.handleSubmit}>
                      <FormGroup>
                        <Input
                            type="textarea"
                            id="message"
                            name="body"
                            rows="12"
                            placeholder="Click here to reply"
                            onChange={e => this.setState({ messageText: e.target.value })}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" color={dataSaved ? "success" : "primary"}>
                          Send message
                        </Button>
                      </FormGroup>
                    </form>
                  </div>
                </main>
              </div>
            </div>
        );
    }
}

export default Message;
