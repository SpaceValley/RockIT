const URL = "http://softdeal.beget.tech/api";

export const userSignIn = user => {
  return fetch(`${URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      console.log(response)
      if (response.ok) {
        return response.json();
      }
      return `${response.statusText}`;
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => console.log("[userSignIn error]: ", error));
};

export const userSignOut = token => {
  console.log(token);
  return fetch(`${URL}/signup/logout`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return `${response.statusText}`;
    })
    .then(data => {
      return data;
    })
    .catch(error => console.log(error));
};
