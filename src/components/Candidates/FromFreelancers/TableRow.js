// Core
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";
import { Badge, Button } from "reactstrap";
// Components
import SendResumeForm from "../../Candidate/SendResumeForm";
import ModalToDeleteWithComment from "../../shared/ModalToDeleteWithComment";
// HOC
import withModalForLetter from "../../hoc/ModalForLetter/withModalForLetter";
// Context
import { ModalConsumer } from "../../../providers/ModalProvider";
// Instruments
import { getDataForSendResumeForm } from "../../../utils/api/freelancer";
import {CopyToClipboard} from "react-copy-to-clipboard";

const WithModalSendResumeForm = withModalForLetter(SendResumeForm);

const CandidateFromFreelancerTableRow = ({
  id,
  date,
  name,
  email,
  mobile,
  linkedin,
  skype,
  platform,
  salary,
  companies,
  recruiter,
  compId,
  freeLancerId,
  onSendResume,
  onRejectCandidate,
  isOpen,
  open,
  close
}) => {
  const getBadge = status => {
    return status === "OFFER" || status === "Hired"
      ? "success"
      : status === "Hold"
      ? "secondary"
      : status === "Interview"
      ? "warning"
      : status === "Rejected" || status === "Refused"
      ? "danger"
      : status === "Review"
      ? "primary"
      : null;
  };

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

  const platformToObj = platform && JSON.parse(platform);
  const vacancyId = platformToObj.id;
  const vacancyName = platformToObj.platform;

  const vacId = {
    vacancyId
  };

  const company =
    companies &&
    companies.split(";").map(company => {
      const parsedCompany = JSON.parse(company);
      return (
        <Link
          to={`/companies/${parsedCompany.id}`}
          key={`${id}-${parsedCompany.id}`}
        >
          <Badge color={getBadge(parsedCompany.vacStat)}>
            {parsedCompany.name}
          </Badge>{" "}
        </Link>
      );
    });

  return (
    <>
      <td>
        {isOpen ? (
          <i
            className="icon-close icons font-xl"
            style={{ color: "var(--red)", cursor: "pointer" }}
            onClick={close}
          />
        ) : (
          <i
            className="icon-plus icons font-xl"
            style={{ color: "var(--green)", cursor: "pointer" }}
            onClick={open}
          />
        )}
      </td>
      <td>{moment(date).format("DD.MM.YY")}</td>
      <td>
        <Link to={`/vacancies/${vacancyId}`}>{vacancyName}</Link>
      </td>
      <td>
        <Link to={`/candidates/${id}`} target="_blank">{name}</Link>
      </td>
      <td>{salary}</td>
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
      <td>{company}</td>
      <td>{recruiter}</td>
      <td>
        <ModalConsumer>
          {({ showModal }) => (
            <Button
              title="send resume"
              style={{
                margin: 0,
                marginRight: "0.2rem",
                padding: "0.2rem",
                backgroundColor: "transparent",
                borderColor: "transparent"
              }}
              onClick={() => {
                getDataForSendResumeForm(id, vacId).then(
                  dataForSendResumeForm => {
                    showModal(WithModalSendResumeForm, {
                      isOpenModal: true,
                      title: "Send resume",
                      freeLancerId: freeLancerId,
                      dataForSendResumeForm: dataForSendResumeForm,
                      sendResume: onSendResume
                    });
                  }
                );
              }}
            >
              <i className="cui-envelope-letter icons font-lg" />
            </Button>
          )}
        </ModalConsumer>
        <ModalConsumer>
          {({ showModal, hideModal }) => (
            <Button
              title="delete"
              style={{
                margin: 0,
                padding: "0.2rem",
                backgroundColor: "transparent",
                borderColor: "transparent"
              }}
              onClick={() =>
                showModal(ModalToDeleteWithComment, {
                  isOpenModal: true,
                  title: "Reject candidate",
                  name: name,
                  onDelete: comment => {
                    const content = {
                      companyId: compId,
                      vacancyId,
                      freelancerId: freeLancerId,
                      comment
                    };
                    onRejectCandidate(id, content);
                    hideModal();
                  }
                })
              }
            >
              <i className="cui-trash icons font-lg" />
            </Button>
          )}
        </ModalConsumer>
      </td>
    </>
  );
};

CandidateFromFreelancerTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string,
  name: PropTypes.string,
  platform: PropTypes.string,
  salary: PropTypes.string,
  mobile: PropTypes.string,
  email: PropTypes.string,
  linkedin: PropTypes.string,
  skype: PropTypes.string,
  companies: PropTypes.string,
  recruiter: PropTypes.string,
  compId: PropTypes.number.isRequired,
  freeLancerId: PropTypes.number.isRequired,
  onSendResume: PropTypes.func.isRequired,
  onRejectCandidate: PropTypes.func.isRequired
};

CandidateFromFreelancerTableRow.defaultProps = {
  date: "",
  name: "",
  platform: "",
  salary: "",
  mobile: "",
  email: "",
  linkedin: "",
  skype: "",
  companies: "",
  recruiter: ""
};

export default CandidateFromFreelancerTableRow;
