// Core
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {Link} from "react-router-dom";
import {Badge} from "reactstrap";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './Candidates.css'

const CandidateTableRow = ({
     id,
     date,
     name,
     seniority,
     platform,
     email,
     mobile,
     linkedin,
     skype,
     recruiter,
     isOpen,
     open,
     close
   }) => {

  const contactCopied = e => {
    e.target.style.color = "var(--green)"
  };

  let mobileValue = mobile;
  let emailValue = email;
  let linkedinValue = linkedin;
  let skypeValue = skype;

  if(mobile === "" || null){
    mobileValue = null
  }

  if(email === "" || null){
    emailValue = null
  }

  if(linkedin === "" || null){
    linkedinValue = null
  }

  if(skype === "" || null){
    skypeValue = null
  }


  return (
    <>
      <td>
        {isOpen ? (
          <i
            className="icon-close icons font-xl"
            style={{color: "var(--red)", cursor: "pointer"}}
            onClick={close}
          />
        ) : (
          <i
            className="icon-plus icons font-xl"
            style={{color: "var(--green)", cursor: "pointer"}}
            onClick={open}
          />
        )}
      </td>
      <td>{moment(date).format("DD.MM.YY")}</td>
      <td>{platform}</td>
      <td>
        <Link to={`/candidates/${id}`} target="_blank">{name}</Link>
      </td>
      <td>{seniority}</td>
      <td>
        <div className="contacts-col-icons-wrap">
          {
            mobileValue !== null ?
              <CopyToClipboard text={mobileValue}>
                <i className="icon-phone icons font-xl contact-icon"
                   style={{color: "var(--black)", cursor: "pointer"}}
                   onClick={contactCopied}
                />
              </CopyToClipboard>
              : null
          }
          {
            emailValue !== null ?
              <CopyToClipboard text={emailValue}>
                <i className="icon-envelope icons font-xl contact-icon"
                   style={{color: "var(--black)", cursor: "pointer"}}
                   onClick={contactCopied}
                />
              </CopyToClipboard>
              : null
          }
          {
            linkedinValue !== null ?
              <a href={linkedinValue} target="_blank">
                <i className="icon-social-linkedin icons font-xl contact-icon"
                   style={{color: "var(--blue)", cursor: "pointer"}}
                   onClick={contactCopied}
                />
              </a>
              : null
          }
          {
            skypeValue !== null ?
              <CopyToClipboard text={skypeValue}>
                <i className="icon-social-skype icons font-xl contact-icon"
                   style={{color: "var(--blue)", cursor: "pointer"}}
                   onClick={contactCopied}
                />
              </CopyToClipboard>
              : null
          }
        </div>
      </td>
      <td>{recruiter}</td>
    </>
  );
};

CandidateTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string,
  name: PropTypes.string,
  seniority: PropTypes.string,
  platform: PropTypes.string,
  mobile: PropTypes.string,
  email: PropTypes.string,
  linkedin: PropTypes.string,
  skype: PropTypes.string,
  recruiter: PropTypes.string,
  open: PropTypes.func,
  close: PropTypes.func,
  isOpen: PropTypes.bool.isRequired
};

CandidateTableRow.defaultProps = {
  date: "",
  name: "",
  seniority: "",
  platform: "",
  recruiter: "",
  mobile: "",
  email: "",
  linkedin: "",
  skype: "",
  open: () => null,
  close: () => null
};

export default CandidateTableRow;
