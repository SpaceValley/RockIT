import React from "react";
import noLogoCompany from "../../assets/img/no_logo.jpeg";
import { NavLink } from "react-router-dom";
import s from "./ResultsItemsCompanies.module.css";

const ResultsItemsCompanies = ({ companies }) => {
  const logoCompany = companies.logo ? companies.logo : noLogoCompany;
  return (
    <li className={s.Item_companies}>
      <NavLink
        to={`/companies/${companies.id}`}
        style={{
          textDecoration: "none"
        }}
      >
        <div className={s.LogoCompanyWrapper}>
          <img
            className={s.LogoCompanyImg}
            src={logoCompany}
            alt="logo_company"
          />
        </div>
        <div className={s.DescriptionCompany}>
          <p className={s.VacanciesCount}>{companies.vacancy_count}</p>

          <p className={s.CandidatesCount}>
            {companies.candidates_to_company_count}
          </p>
        </div>
      </NavLink>
    </li>
  );
};

export default ResultsItemsCompanies;
