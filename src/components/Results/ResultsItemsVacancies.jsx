import React from "react";
import { NavLink } from "react-router-dom";
import s from "./ResultsItemsVacancies.module.css";

const ResultsItemsVacancies = ({ vacancies, number }) => {
  let status = vacancies.statusId;
  return (
    <tbody>
      <tr className={s.Row}>
        <td className={s.FirstColumn}>{number + 1}</td>
        <td className={s.Platform}>
          <NavLink
            style={{
              textDecoration: "none"
            }}
            to={`/companies/${vacancies.companyId}`}
          >
            {vacancies.platform}
          </NavLink>
        </td>
        <td>{vacancies.seniority}</td>
        <td>{vacancies.details}</td>
        <td className={s.Company}>
          <NavLink
            style={{
              textDecoration: "none"
            }}
            to={`/companies/${vacancies.companyId}`}
          >
            {vacancies.company}
          </NavLink>
        </td>
        <td>{vacancies.date}</td>
        <td
          title={(() => {
            switch (status) {
              case 1:
                return "Open";
              case 2:
                return "In progress";
              default:
                return "Closed";
            }
          })()}
          className={(() => {
            switch (status) {
              case 1:
                return s.StatusOpen;
              case 2:
                return s.StatusPending;
              default:
                return s.StatusClosed;
            }
          })()}
        />
      </tr>
    </tbody>
  );
};

export default ResultsItemsVacancies;
