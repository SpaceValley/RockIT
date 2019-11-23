import React from "react";
import ResultsItemsContacts from "./ResultsItemsContacts";
import s from "./Results.module.css";

const ResultsListContacts = ({ contacts }) => {
  let dataLength = Array.isArray(contacts) !== true ? 0 : contacts.length;
  return (
    <div className={s.List_contacts_wrapper}>
      <span className={s.Title}>Contacts</span>
      <span className={s.Count}>{dataLength}</span>
      <div className={s.List_contacts}>
        {contacts
          ? contacts.map((el, idx) => (
              <ResultsItemsContacts contacts={el} key={idx} />
            ))
          : []}
      </div>
    </div>
  );
};

export default ResultsListContacts;
