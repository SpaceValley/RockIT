import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Button, Col, Row, TabPane} from "reactstrap";
import {AppSwitch} from "@coreui/react";
// Components
import CandidatesForm from "./Form";
import AllCandidatesTable from "./AllTable";
import SentCandidatesTable from "./SentTable";
import CandidatesFromFreelancersTable from "./FromFreelancers/Table";
import Tabs from "../shared/Tabs/Tabs";
import Select from "../shared/Select";
// Context Provider
import Localization from "../../providers/Localization";
// Instruments
import {
  getAllCandidates,
  getSentCandidates,
  getCandidatesFromFreelancers,
  filterAndSortAllCandidates,
  filterAndSortSentCandidates
} from "../../utils/api/candidates";
import {
  sendCandidateResume,
  cancelCandidateFromFreelancer
} from "../../utils/api/candidate";

const tabs = [
  {
    id: "1",
    name: "All candidates"
  },
  {
    id: "2",
    name: "Sent candidates"
  },
  {
    id: "3",
    name: "Candidates from freelancers"
  }
];

const localesAllCandidates = [
  "Date",
  "Platform",
  "Name",
  "Seniority",
  "Contacts",
  "Recruiter"
];

const localesSentCandidates = [
  "Date",
  "Platform",
  "Name",
  "Salary",
  "Contacts",
  "Companies",
  "Recruiter"
];

export default class Candidates extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      role: PropTypes.number.isRequired,
      companyId: PropTypes.number
    })
  };

  state = {
    allCandidatesData: {
      allCandidates: [],
      allCandidatesCount: null,
      allTotalPages: null,
      allPerPage: null,
      currentAllPage: 1,
      allPlatforms: [],
      allStatuses: [],
      allRecruiters: [],
      allSeniority: []
    },
    sentCandidatesData: {
      sentCandidates: [],
      sentCandidatesCount: null,
      sentTotalPages: null,
      sentPerPage: null,
      currentSentPage: 1,
      sentPlatforms: [],
      sentCompanies: [],
      sentStatuses: [],
      sentRecruiters: []
    },

    candidatesFromFreelancersData: {
      candidatesFF: [],
      candidatesCountFF: null,
      totalPagesFF: null,
      perPageFF: null,
      statusesFF: [],
      currentPageFF: 1
    },
    filterAndSortCandidates: {
      search: "",
      dateFrom: "",
      dateTo: "",
      selectCompanies: [],
      selectPlatforms: [],
      selectStatuses: [],
      selectRecruiter: "",
      mySent: false
    },
    filterAndSortCandidatesFF: {
      search: "",
      dateFrom: "",
      dateTo: "",
      selectCompanies: [],
      selectPlatforms: [],
      selectRecruiter: ""
    },
    dataForSendResumeForm: {},
    isActive: true,
    activeTabId: "1"
  };

  componentDidMount() {
    const {
      user: {role}
    } = this.props;

    const {
      allCandidatesData: {currentAllPage},
      sentCandidatesData: {currentSentPage},
      candidatesFromFreelancersData: {currentPageFF},
    } = this.state;

    role !== 4 && role !== 5
      ? this.requestForCandidatesForStaff(currentAllPage, currentSentPage, currentPageFF)
      : this.requestForCandidates(currentAllPage, currentSentPage);
  }

  requestForCandidatesForStaff = (currentAllPage, currentSentPage, currentPageFF) => {

    getAllCandidates(currentAllPage).then(allCandidatesData => {
      console.log("all candidates", allCandidatesData);
      this.setState({
        allCandidatesData: {...this.state.allCandidatesData, ...allCandidatesData}
      });
    });

    getSentCandidates(currentSentPage).then(sentCandidatesData => {
      console.log("sent candidates", sentCandidatesData);
      this.setState({
        sentCandidatesData: {...this.state.sentCandidatesData, ...sentCandidatesData}
      });
    });

    getCandidatesFromFreelancers(currentPageFF).then(
      candidatesFromFreelancersData => {
        console.log("freelancers", candidatesFromFreelancersData);
        this.setState({
          candidatesFromFreelancersData: {
            ...this.state.candidatesFromFreelancersData,
            ...candidatesFromFreelancersData
          }
        });
      }
    );
  };

  requestForCandidates = (currentAllPage, currentSentPage) => {

    getAllCandidates(currentAllPage).then(allCandidatesData => {
      this.setState({
        allCandidatesData: {...this.state.allCandidatesData, ...allCandidatesData}
      });
    });

    getSentCandidates(currentSentPage).then(sentCandidatesData => {
      this.setState({
        sentCandidatesData: {...this.state.sentCandidatesData, ...sentCandidatesData}
      });
    });

  };

  handleRecruiterChange = value => {
    const {filterAndSortCandidates} = this.state;

    this.setState(
      {
        filterAndSortCandidates: {
          ...filterAndSortCandidates,
          selectRecruiter: value
        }
      },
      () => {
        const {filterAndSortCandidates} = this.state;
        this.filterAndSortCandidates(filterAndSortCandidates);
      }
    );
  };

  filterAndSortCandidates = filterAndSort => {
    const {filterAndSortCandidates} = this.state;

    this.setState(
      {
        filterAndSortCandidates: {
          ...filterAndSortCandidates,
          ...filterAndSort
        }
      },
      () => {
        const {
          allCandidatesData: {currentAllPage},
          sentCandidatesData: {currentSentPage},
          filterAndSortCandidates
        } = this.state;

        filterAndSortAllCandidates(currentAllPage, filterAndSortCandidates).then(
          allCandidatesData =>
            this.setState({
              allCandidatesData: {
                ...this.state.allCandidatesData,
                ...allCandidatesData
              }
            })
        );

        filterAndSortSentCandidates(currentSentPage, filterAndSortCandidates).then(
          sentCandidatesData =>
          this.setState({
                sentCandidatesData: {
                  ...this.state.sentCandidatesData,
                  ...sentCandidatesData
                }
              })
          );
      }
    );
  };

  onChangePage = (currentAllPage, currentSentPage) => {

    const {filterAndSortCandidates} = this.state;

    filterAndSortAllCandidates(currentAllPage, filterAndSortCandidates).then(
      allCandidatesData =>
        this.setState({
          allCandidatesData: {
            ...this.state.allCandidatesData,
            ...allCandidatesData
          }
        })
    );

    filterAndSortSentCandidates(currentSentPage, filterAndSortCandidates).then(
      sentCandidatesData =>
        this.setState({
          sentCandidatesData: {
            ...this.state.sentCandidatesData,
            ...sentCandidatesData
          }
        })
    );
  };

  toggleMySent = () => {
    this.setState(
      state => ({
        filterAndSortCandidates: {
          ...state.filterAndSortCandidates,
          mySent: !state.filterAndSortCandidates.mySent
        }
      }),
      () => {
        const {
          allCandidatesData: {currentAllPage},
          sentCandidatesData: {currentSentPage},
          filterAndSortCandidates
        } = this.state;

        filterAndSortAllCandidates(currentAllPage, filterAndSortCandidates).then(
          allCandidatesData => {
            this.setState({
              allCandidatesData: {
                ...this.state.allCandidatesData,
                ...allCandidatesData
              }
            });
          }
        );

        filterAndSortSentCandidates(currentSentPage, filterAndSortCandidates).then(
          sentCandidatesData => {
            this.setState({
              sentCandidatesData: {
                ...this.state.sentCandidatesData,
                ...sentCandidatesData
              }
            });
          }
        );
      }
    );
  };

  toggleIsActive = () => {
    this.setState(
      state => ({
        isActive: !state.isActive
      }),
      () => console.log(this.state.isActive)
    );
    console.log(this.state.isActive);
  };

  activeTabToggle = (tab) => {
    this.setState({activeTabId: tab});
  };


  sendResume = (id, content) => {
    sendCandidateResume(id, content);

    this.setState(prevState => ({
      candidatesFromFreelancersData: {
        candidatesFF: prevState.candidatesFromFreelancersData.candidatesFF.filter(
          candidate => candidate.id !== id
        )
      }
    }));
  };

  rejectCandidate = (id, content) => {
    // console.log(content);
    cancelCandidateFromFreelancer(id, content).then(data => {
      // console.log(data);
      data
        ? this.setState(prevState => ({
          candidatesFromFreelancersData: {
            candidatesFF: prevState.candidatesFromFreelancersData.candidatesFF.filter(
              candidate => candidate.id !== id
            )
          }
        }))
        : console.log(data);
    });
  };

  render() {
    const {
      allCandidatesData: {
        allCandidates,
        allCandidatesCount,
        allTotalPages,
        allPerPage,
        currentAllPage,
        allPlatforms,
        allSeniority
      },
      sentCandidatesData: {
        sentCandidates,
        sentCandidatesCount,
        sentTotalPages,
        sentPerPage,
        currentSentPage,
        sentStatuses,
        sentPlatforms,
        sentCompanies,
        sentRecruiters
      },
      candidatesFromFreelancersData: {
        candidatesFF,
        candidatesCountFF,
        totalPagesFF,
        perPageFF,
        currentPageFF,
        statusesFF
      },
      filterAndSortCandidates: {selectRecruiter, mySent},
      activeTabId
    } = this.state;

    const {
      user: {role}
    } = this.props;

    // console.log(this.state);

    return (
      <>
        <Row>
          <Col
            style={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: 200,
              marginBottom: "0.5rem"
            }}
          >
            <h1 style={{marginBottom: 0, fontSize: 24}}>Candidates</h1>
            <span
              style={{
                alignSelf: "flex-end",
                color: "var(--gray)"
              }}
            >
              {activeTabId === "1" ? allCandidatesCount : null}
              {activeTabId === "2" ? sentCandidatesCount : null}
              {activeTabId === "3" ? candidatesCountFF : null}
            </span>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
                <CandidatesForm
                  userRole={role}
                  platforms={sentPlatforms}
                  companies={sentCompanies}
                  statuses={sentStatuses}
                  seniority={allSeniority}
                  activeTabId={activeTabId}
                  onFilter={this.filterAndSortCandidates}
                />
          </Col>
        </Row>
        <Row style={{marginBottom: "1rem"}}>
          {role !== 4 ? (
            <Col lg={ activeTabId !== "1" ? 6 : 9} md={6} sm={4} xs={6}>
              <Link
                to="/new-candidate"
                className="btn btn-success pull-left"
                style={{marginRight: "0.4rem"}}
              >
                <i className="fa fa-plus-circle"/> Create
              </Link>
              <Button color="light" onClick={() => null}>
                Export
              </Button>
            </Col>
              ) : (
            <Col>
              <Link to="/new-candidate" className="btn btn-success pull-left">
                <i className="fa fa-plus-circle"/> Create
              </Link>
            </Col>
          )}
          {role !== 4 ? (
            <>
              {
                activeTabId !== "1" ?
                  <Col lg={3} md={3} sm={4} xs={6}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        margin: "0 0.5rem",
                        padding: "0.5rem",
                        color: "var(--gray)"
                      }}
                      className="my-events"
                    >
                      <AppSwitch
                        className="mx-1"
                        color="primary"
                        checked={mySent}
                        onChange={this.toggleMySent}
                      />
                      My Sent
                    </div>
                  </Col>
                  : null}
              <Col lg={3} md={3} sm={4} xs={12}>
                <Select
                  value={selectRecruiter}
                  options={sentRecruiters}
                  placeholder="Choose recruiter"
                  onChange={this.handleRecruiterChange}
                />
              </Col>
            </>
          ) : null}
        </Row>
        <Row>
          <Col style={activeTabId === "1" ? { marginTop: 4 }: null}>
            {role !== 4 ? (
              <Tabs tabs={tabs}
                    onClick={this.toggleIsActive}
                    activeTabToggle={this.activeTabToggle}
                    activeTabId={activeTabId}>
                <TabPane tabId="1">
                  <Localization
                    locales={localesAllCandidates}
                    onSort={this.filterAndSortCandidates}
                  >
                    {allCandidates.length > 0 && (
                      <AllCandidatesTable
                        userRole={role}
                        candidates={allCandidates}
                        headerColumns={localesAllCandidates}
                        totalItems={allCandidatesCount}
                        pageSize={allPerPage}
                        totalPages={allTotalPages}
                        currentPage={currentAllPage}
                        onChangePage={this.onChangePage}
                      />
                    )}
                  </Localization>
                </TabPane>
                <TabPane tabId="2">
                  <Localization
                    locales={localesSentCandidates}
                    onSort={this.filterAndSortCandidates}
                  >
                    {sentCandidates.length > 0 && (
                      <SentCandidatesTable
                        userRole={role}
                        candidates={sentCandidates}
                        statuses={sentStatuses}
                        headerColumns={localesSentCandidates}
                        totalItems={sentCandidatesCount}
                        pageSize={sentPerPage}
                        totalPages={sentTotalPages}
                        currentPage={currentSentPage}
                        onChangePage={this.onChangePage}
                      />
                    )}
                  </Localization>
                </TabPane>
                <TabPane tabId="3">
                  <Localization
                    locales={localesSentCandidates}
                    onSort={this.filterAndSortCandidates}
                  >
                    <CandidatesFromFreelancersTable
                      userRole={role}
                      candidates={candidatesFF}
                      statuses={statusesFF}
                      totalItems={candidatesCountFF}
                      pageSize={perPageFF}
                      totalPages={totalPagesFF}
                      currentPage={currentPageFF}
                      onChangePage={this.onChangePage}
                      onSendResume={this.sendResume}
                      onRejectCandidate={this.rejectCandidate}
                    />
                  </Localization>
                </TabPane>

              </Tabs>
            ) : (
              <Localization
                locales={localesSentCandidates}
                onSort={this.filterAndSortCandidates}
              >
                {sentCandidates.length > 0 && (
                  <SentCandidatesTable
                    userRole={role}
                    candidates={sentCandidates}
                    statuses={sentStatuses}
                    headerColumns={localesSentCandidates}
                    totalItems={sentCandidatesCount}
                    pageSize={sentPerPage}
                    totalPages={sentTotalPages}
                    currentPage={currentSentPage}
                    onChangePage={this.onChangePage}
                  />
                )}
              </Localization>
            )}
          </Col>
        </Row>
      </>
    );
  }
}
