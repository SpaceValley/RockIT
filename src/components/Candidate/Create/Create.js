// Core
import React, { Component } from "react";
// Components
import CandidateCreateForm from "./Form";
// Instruments
import { getOptionsForSelects } from "../../../utils/api";
import {
  uploadCandidateAvatar,
  createNewCandidate
} from "../../../utils/api/candidate";

export default class CandidateCreate extends Component {
  state = {
    platforms: [],
    seniorities: []
  };

  componentDidMount() {
    getOptionsForSelects().then(optionsForSelects => {
      const platforms = optionsForSelects.platforms;
      const seniorities = optionsForSelects.seniorities;

      this.setState({
        platforms,
        seniorities
      });
    });
    console.log("platforms ",this.state.platforms);
    console.log("seniorities ",this.state.seniorities);

  }

  uploadAvatar = (id, file) => {
    uploadCandidateAvatar(id, file).then(data => console.log(data));
  };

  createCandidate = candidate => {
    createNewCandidate(candidate).then(
      this.props.history.push('/candidates/')
    );
  };

  render() {
    const { platforms, seniorities } = this.state;

    return (
      <>
        <h3>New Candidate</h3>
        <CandidateCreateForm
          platforms={platforms}
          seniorities={seniorities}
          onUploadAvatar={this.uploadAvatar}
          onCreateCandidate={this.createCandidate}
        />
      </>
    );
  }
}
