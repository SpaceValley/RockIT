import React from "react";
import ResultsItemsCompanies from "./ResultsItemsCompanies";

import s from "./Results.module.css";

const ResultsListCompanies = ({ companies }) => {
  let dataLength = Array.isArray(companies) !== true ? 0 : companies.length;
  return (
    <div>
      <span className={s.Title}>Companies</span>
      <span className={s.Count}>{dataLength}</span>
      <ul className={s.List_companies}>
        {companies
          ? companies.map(el => (
              <ResultsItemsCompanies companies={el} key={el.id} />
            ))
          : []}
      </ul>
    </div>
  );
};

export default ResultsListCompanies;
