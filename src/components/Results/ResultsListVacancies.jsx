import React from "react";
import ResultsItemsVacancies from "./ResultsItemsVacancies";
import s from "./Results.module.css";

const ResultsListVacancies = ({ vacancies }) => {
  return (
    <div className={s.Table_vacancies}>
      <table className={s.List_vacancies}>
        <thead>
          <tr className={s.List_vacancies_title}>
            <td className={s.FirstColumn}>#</td>
            <td>Platform</td>
            <td>Seniority</td>
            <td>Details</td>
            <td>Company</td>
            <td>Date</td>
            <td>Status</td>
          </tr>
        </thead>
        {vacancies
          ? vacancies.map((el, idx) => (
              <ResultsItemsVacancies vacancies={el} key={el.id} number={idx} />
            ))
          : []}
      </table>
    </div>
  );
};

export default ResultsListVacancies;
