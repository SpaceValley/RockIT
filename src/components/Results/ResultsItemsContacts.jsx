import React from "react";
import { NavLink } from "react-router-dom";
import s from "./ResultsItemsContacts.module.css";

const ResultsItemsContacts = ({ contacts }) => {
  return (
    <div className={s.Items_wrapper}>
      <p className={s.Name}>{contacts.name}</p>
      <p className={s.Text && s.Company}>
        <NavLink
          to={`/companies/${contacts.id}`}
          style={{
            textDecoration: "none"
          }}
        >
          {contacts.compName}
        </NavLink>
      </p>
      <p className={s.Text && s.Mail}>{contacts.email}</p>
      <p className={s.Text && contacts.phone === "" ? s.PhoneNone : s.Phone}>
        {contacts.phone}
      </p>
      <p className={s.Text && contacts.skype === "" ? s.SkypeNone : s.Skype}>
        {contacts.skype}
      </p>
    </div>
  );
};

export default ResultsItemsContacts;
