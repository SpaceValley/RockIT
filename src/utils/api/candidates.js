const URL = "http://softdeal.beget.tech/api";
const getToken = () => localStorage.getItem("token");

/**
 * Fetches all candidates
 *
 * @param {Number} page current page
 * @returns {Promise} Promise object represents operation result
 */


export const getAllCandidates = page => {
  const token = getToken();
  return fetch(`${URL}/main/allCandidates/${page}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data => {
      const allCandidatesData = {
        allCandidates: data.candidates,
        allCandidatesCount: data.Count,
        allTotalPages: data.Page,
        allPerPage: data.perPage,
        currentAllPage: data.currentPage,
        allPlatforms: data.platforms,
        allStatuses: data.statuses,
        allRecruiters: data.recruiter,
        allSeniority: data.seniority
      };

      return allCandidatesData;
    })
    .catch(error => console.log("error in fetch: ", error));
};

/**
 * Fetches sent candidates
 *
 * @param {Number} page current page
 * @returns {Promise} Promise object represents operation result
 */
export const getSentCandidates = page => {
  const token = getToken();
  return fetch(`${URL}/main/returnAllCandidates/${page}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(`Error while fetching: ${response.statusText}`);
      })
      .then(data => {
        const sentCandidatesData = {
          sentCandidates: data.candidates,
          sentCandidatesCount: data.Count,
          sentTotalPages: data.Page,
          sentPerPage: data.perPage,
          currentSentPage: data.currentPage,
          sentPlatforms: data.platforms,
          sentCompanies: data.company,
          sentStatuses: data.statuses,
          sentRecruiters: data.recruiter
        };

        return sentCandidatesData;
      })
      .catch(error => console.log("error in fetch: ", error));
};

/**
 * Fetches candidates sent by freelancer
 *
 * @param {Number} page current page
 * @returns {Promise} Promise object represents operation result
 */
export const getCandidatesFromFreelancers = page => {
  const token = getToken();
  return fetch(`${URL}/main/viewCandidatesFreelancerOnVacancies/${page}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data => {
      const candidatesFromFreelancersData = {
        candidatesFF: data.candidates,
        candidatesCountFF: data.Count,
        totalPagesFF: data.Page,
        perPageFF: data.perPage,
        statusesFF: data.statuses,
        currentPageFF: data.currentPage
      };

      return candidatesFromFreelancersData;
    })
    .catch(error => console.log("error in fetch: ", error));
};


/**
 * Filters and sorts all candidates
 *
 * @param {Number} page current page
 * @param {Object} filterAndSort object with sorted fields
 * @returns {Promise} Promise object represents operation result
 */
export const filterAndSortAllCandidates = (page, filterAndSort) => {
  console.log("Filtered", filterAndSort);
  const token = getToken();
  return fetch(`${URL}/main/allCandidates/${page}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(filterAndSort)
  })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(`Error while fetching: ${response.statusText}`);
      })
      .then(data => {
        const allCandidatesData = {
          allCandidates: data.candidates,
          allCandidatesCount: data.Count,
          allTotalPages: data.Page,
          allPerPage: data.perPage,
          currentAllPage: data.currentPage,
          allPlatforms: data.platforms,
          allStatuses: data.statuses,
          allRecruiters: data.recruiter,
          allSeniority: data.seniority
        };

        return allCandidatesData;
      })
      .catch(error => console.log("error in fetch: ", error));
};


/**
 * Filters and sorts sent candidates
 *
 * @param {Number} page current page
 * @param {Object} filterAndSort object with sorted fields
 * @returns {Promise} Promise object represents operation result
 */
export const filterAndSortSentCandidates = (page, filterAndSort) => {
  console.log("Filtered", filterAndSort);
  const token = getToken();
  return fetch(`${URL}/main/returnAllCandidates/${page}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(filterAndSort)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data => {

      const sentCandidatesData = {
        sentCandidates: data.candidates,
        sentCandidatesCount: data.Count,
        sentTotalPages: data.Page,
        sentPerPage: data.perPage,
        currentSentPage: data.currentPage,
        sentPlatforms: data.platforms,
        sentCompanies: data.company,
        sentStatuses: data.statuses,
        sentRecruiters: data.recruiter
      };

      return sentCandidatesData;
    })
    .catch(error => console.log("error in fetch: ", error));
};
