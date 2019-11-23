import React, { Component } from "react";
import ResultsItemsCandidates from "./ResultsItemsCandidates";
// import PaginationBackend from "../shared/PaginationBackend";
import s from "./Results.module.css";

class ResultsListCandidates extends Component {
  render() {
    const { candidates } = this.props;

    let dataLength = Array.isArray(candidates) !== true ? 0 : candidates.length;
    return (
      <div>
        <span className={s.Title}>Candidates</span>
        <span className={s.Count}>{dataLength}</span>
        <ul className={s.List_candidates}>
          {candidates
            ? candidates.map(el => (
                <ResultsItemsCandidates candidates={el} key={el.id} />
              ))
            : []}
          {/* <PaginationBackend
            items={candidates}
            totalItems={dataLength}
            pageSize={8}
            totalPages={dataLength}
            initialPage={1}
            onChangePage={() => console.log("change page")}
          /> */}
        </ul>
      </div>
    );
  }
}

export default ResultsListCandidates;
