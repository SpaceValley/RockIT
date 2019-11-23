// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row
} from "reactstrap";
// Components
import InnerHTMLMarkUp from "../InnerHTMLMarkUp";
import ControlledEditorForEmail from "../shared/ControlledEditorForEmail";
// Instruments

import styles from "./SendResumeForm.module.css";

const INITIAL_STATE = {
  companies: [],
  activeCompany: {
    compId: null,
    name: "",
    vacancy: [],
    contacts: [],
    sendDetails: ""
  },
  emailSubject: "",
  emailTemplate: "",
  customContent: null,
  checkedVacancies: new Map(),
  checkedEmails: new Map()
};

export default class CandidateSendResumeForm extends Component {
  static propTypes = {
    companies: PropTypes.array,
    emailSubject: PropTypes.string,
    emailTemplate: PropTypes.string,
    sendResume: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    companies: [],
    emailSubject: "",
    emailTemplate: ""
  };

  static getDerivedStateFromProps(nextProps) {
    if (typeof nextProps.dataForSendResumeForm !== 'undefined') {
      return {
        companies: nextProps.dataForSendResumeForm.companies,
        emailTemplate: nextProps.dataForSendResumeForm.emailTemplate
      };
    }

    return null;
  }

  state = {
    ...INITIAL_STATE
  };

  componentDidMount() {
    const { dataForSendResumeForm } = this.props;
      if (typeof dataForSendResumeForm !== 'undefined') {
          this.setState({
              activeCompany: dataForSendResumeForm.companies[0],
              emailSubject: dataForSendResumeForm.emailSubject
          });
      }
  }

  setActiveCompany = id => {
    const { companies } = this.state;
    const activeCompany = companies.find(company => company.compId === id);

    this.setState({
      activeCompany,
      checkedVacancies: new Map(),
      checkedEmails: new Map()
    });
  };

  handleInputChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleCheckboxVacancyChange = ({ target: { id, checked } }) => {
    const item = id;
    const isChecked = checked;

    this.setState(prevState => ({
      checkedVacancies: prevState.checkedVacancies.set(item, isChecked)
    }));
  };

  handleCheckboxEmailChange = ({ target: { name, checked } }) => {
    const item = name;
    const isChecked = checked;

    this.setState(prevState => ({
      checkedEmails: prevState.checkedEmails.set(item, isChecked)
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      activeCompany: { compId },
      checkedVacancies,
      checkedEmails,
      emailSubject,
      customContent,
      emailTemplate
    } = this.state;

    const {
      candidateId,
      freeLancerId,
      sendResume,
      onRequestClose
    } = this.props;

    const checkedVacanciesEntries = Array.from(checkedVacancies);

    const checkedEmailsEntries = [...checkedEmails];

    const freelancerId = freeLancerId ? freeLancerId : null;
    const content = {
      compId,
      freelancerId,
      checkedVacanciesEntries,
      checkedEmailsEntries,
      emailSubject,
      emailTemplate: customContent ? customContent.content : emailTemplate
    };
    console.log(candidateId, content);

    if(compId){
        sendResume(candidateId, content);
    }


    this.resetForm();

    onRequestClose();
  };

  resetForm = () => this.setState({ ...INITIAL_STATE });

  render() {
    const {
      companies,
      activeCompany: { compId, vacancy, contacts, sendDetails },
      emailSubject,
      emailTemplate,
      checkedVacancies,
      checkedEmails,
    } = this.state;

    const companiesListJSX =
      companies.length > 0 &&
      companies.map(company => (
        <ListGroupItem
          key={`${company.compId}-${company.name}`}
          active={company.compId === compId ? true : false}
          style={{ minHeight: 30 }}
          onClick={() => this.setActiveCompany(company.compId)}
        >
          {company.name}
        </ListGroupItem>
      ));

    const companyVacanciesJSX =
      this.state.activeCompany.vacancy !== undefined &&
      vacancy.map(vacancy => (
        <ListGroupItem
          style={{ width: "100%" }}
          key={`${vacancy.compId}-${vacancy.vacId}`}
        >
          <CustomInput
            type="checkbox"
            id={vacancy.vacId}
            checked={checkedVacancies.get(vacancy.vacId)}
            label={`${vacancy.platform !== null ? vacancy.platform : ""} ${
              vacancy.seniority !== null ? vacancy.seniority : ""
            } ${vacancy.salary !== null ? vacancy.salary : ""} ${
              vacancy.details !== null ? vacancy.details : ""
            } ${vacancy.location !== null ? vacancy.location : ""}`}
            onChange={this.handleCheckboxVacancyChange}
          />
        </ListGroupItem>
      ));

    const companyContactsJSX =
      this.state.activeCompany.contacts !== undefined &&
      contacts.map(contact => (
        <ListGroupItem
          style={{ width: "100%" }}
          key={`${contact.compId}-${contact.conId}`}
        >
          <CustomInput
            type="checkbox"
            id={contact.email}
            name={contact.email}
            checked={checkedEmails.get(contact.email)}
            label={`${contact.email} ${contact.name}`}
            onChange={this.handleCheckboxEmailChange}
          />
        </ListGroupItem>
      ));

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row style={{ marginBottom: "1.5rem" }}>
          <Col md={4}>
            <Label for="exampleCheckbox" className={styles.label}>
              Companies
            </Label>
            <ListGroup flush style={{ maxHeight: 300, overflow: "scroll" }}>
              {companiesListJSX}
            </ListGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="exampleCheckbox">Vacancies</Label>
              {companyVacanciesJSX}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="exampleCheckbox" className={styles.label}>
                Contacts
              </Label>
              {companyContactsJSX}
            </FormGroup>
          </Col>
        </Row>
        <Row style={{ marginBottom: "1.5rem" }}>
          <Col>
            <InnerHTMLMarkUp content={sendDetails} />
          </Col>
          <Col>
            <Input
              type="text"
              style={{ marginBottom: "1.5rem" }}
              name="emailSubject"
              value={emailSubject}
              onChange={this.handleInputChange}
            />
            <ControlledEditorForEmail
              content={emailTemplate}
              close={() => {}}
              onUpdate={content => {
                this.setState({ customContent: content });
              }}
              //==================================
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button disabled={!companyVacanciesJSX.length} type="submit" color="primary" className="pull-right">
              <i className="icon-paper-plane icons font-lg" /> Send
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
