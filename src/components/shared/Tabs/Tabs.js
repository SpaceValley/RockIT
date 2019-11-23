// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Nav, NavItem, NavLink, Row, TabContent } from "reactstrap";

export default class Tabs extends Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    vacanciesCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    candidatesCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    commentsCount: PropTypes.number,
    children: PropTypes.node,
    activeTabId: PropTypes.string,
    activeTabToggle: PropTypes.func
  };

  static defaultProps = {
    vacanciesCount: null,
    candidatesCount: null,
    commentsCount: null,
    children: [],
    activeTabId: '1',
    activeTabToggle: null
  };

    state = {
      activeTabId: this.props.activeTabId
    };

    componentDidUpdate(prevProps) {
      if(prevProps.activeTabId !== this.props.activeTabId){
        this.setState({
          activeTabId: this.props.activeTabId
        })
      }
    }

  activeTabToggle = (tab) => {
      const { activeTabToggle } = this.props;
      if(activeTabToggle) return activeTabToggle(tab)
      this.setState({
        activeTabId: tab
      })
  };

  render() {
    const {
      vacanciesCount,
      candidatesCount,
      commentsCount,
      interviewsCount,
      reviewsCount,
      testsCount,
      offersCount,
      tabs
    } = this.props;

    const { activeTabId } = this.state;

    const renderTabName = tabName => {
      switch (tabName) {
        case "Vacancies":
          return `${tabName} ${vacanciesCount ? vacanciesCount : ""}`;
        case "Candidates":
          return `${tabName} ${candidatesCount ? candidatesCount : ""}`;
        case "Comments":
          return `${tabName} ${commentsCount ? commentsCount : ""}`;
        case "Interviews":
          return `${tabName} ${interviewsCount ? interviewsCount : ""}`;
        case "Reviews":
          return `${tabName} ${reviewsCount ? reviewsCount : ""}`;
        case "Tests":
          return `${tabName} ${testsCount ? testsCount : ""}`;
        case "Offers":
          return `${tabName} ${offersCount ? offersCount : ""}`;
        default:
          return tabName;
      }
    };

    const tabsJSX = tabs.map(tab => (
      <NavItem key={tab.id}>
        <NavLink
          active={activeTabId === tab.id}
          name={tab.name}
          onClick={() => this.activeTabToggle(tab.id)}
        >
          {renderTabName(tab.name)}
        </NavLink>
      </NavItem>
    ));


    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" className="mb-4">
            <Nav tabs>{tabsJSX}</Nav>
            <TabContent activeTab={activeTabId}>
              {this.props.children}
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
}
