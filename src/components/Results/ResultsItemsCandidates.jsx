import React from "react";
import noAvatar from "../../assets/img/no_avatar.png";
import { NavLink } from "react-router-dom";

import s from "./ResultsItemsCandidates.module.css";

const ResultsItemsCandidates = ({ candidates }) => {
  const avatar = candidates.avatar;

  return (
    <li className={s.Item_candidates}>
      <img
        className={s.Img}
        src={avatar === null ? noAvatar : avatar}
        alt={candidates.name}
      />
      <NavLink
        style={{
          textDecoration: "none"
        }}
        to={`/candidates/${candidates.id}`}
      >
        <p className={s.Name}>{candidates.name}</p>
      </NavLink>
      <p className={s.Platform}>{candidates.platform}</p>
      <p className={s.Text}>{candidates.phone}</p>
      <p className={s.Text}>{candidates.email}</p>
      <p className={s.Text}>{candidates.skype}</p>
    </li>
  );
};

export default ResultsItemsCandidates;
