// Core
import React, {Component} from "react";
import PropTypes from "prop-types";
import moment from "moment";
// Components
import CandidatesCommentForm from "./CommentAllForm";
// Instruments
import { FormGroup, Input } from "reactstrap";

class CandidateExpandableTableRow extends Component {

  state = {
    date_follow_up: ""
  };


  render() {

    const {userRole, candId, candidateStatus} = this.props;
    const parsedStatus = JSON.parse(candidateStatus);
    const {date_follow_up, recruiter, compId, comments} = parsedStatus;

    return (

      <>
        {date_follow_up !== null || recruiter !== null ? (
          <>
            <td>
              <FormGroup className="w-50">
                <Input
                  id="date-follow-up"
                  type="date"
                  name="Follow-up"
                  defaultValue={date_follow_up ? moment(date_follow_up).format("YYYY-MM-DD") : ""}
                  onChange={e => this.setState({ date_follow_up: e.target.value })}
                />
              </FormGroup>
            </td>
            <td>
              {recruiter}
            </td>
            <td>
              {userRole !== 4 ? (
                <CandidatesCommentForm
                  value={comments}
                  candId={candId}
                  compId={compId}
                  dateFollowUp={this.state.date_follow_up === "" ? date_follow_up : this.state.date_follow_up}
                />
              ) : (
                  comments
              )}
            </td>
          </>
        ) : (
          <td colSpan="9" align="middle" valign="middle">
            There are no previous statuses on the candidate.{" "}
            <span role="img" aria-label="confused face">
            😕
          </span>
          </td>
        )}
      </>
    );
  };
}

CandidateExpandableTableRow.propTypes = {
  userRole: PropTypes.number.isRequired,
  candId: PropTypes.number.isRequired,
  candidateStatus: PropTypes.string.isRequired
};

export default CandidateExpandableTableRow;
