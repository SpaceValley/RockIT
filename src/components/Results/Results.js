import React, { Component } from "react";
import s from "./Results.module.css";

import ResultsListCompanies from "./ResultsListCompanies";
import ResultsListCandidates from "./ResultsListCandidates";
import ResultsListVacancies from "./ResultsListVacancies";
import ResultsListContacts from "./ResultsListContacts";

class Results extends Component {
  state = {
    activePage: 15
  };
  handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`);
    this.setState({
      activePage: pageNumber
    });
  };
  render() {
    const globalDataObj = this.props.globalDataObj;

    const candidates = globalDataObj.candidates;
    const companies = globalDataObj.companies;
    const contacts = globalDataObj.contacts;
    const vacancies = globalDataObj.vacancies;
    let dataLength = Array.isArray(vacancies) !== true ? 0 : vacancies.length;
    return (
      <div className={s.ResultsWrapper}>
        <ResultsListCandidates candidates={candidates} />
        <ResultsListCompanies companies={companies} />
        <span className={s.Title}>Vacancies</span>
        <span className={s.Count}>{dataLength}</span>
        <ResultsListVacancies vacancies={vacancies} />
        <ResultsListContacts contacts={contacts} />
      </div>
    );
  }
}

export default Results;
