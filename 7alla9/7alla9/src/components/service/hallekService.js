import { API_URL } from "./config"


function addClient() {
  let url = API_URL + "add";
 return fetch(url)
  .catch((err) => {
    console.log(err.msg);
  });

}

function deleteClient() {
    let url = API_URL + "remove";
   return fetch(url)
    .catch((err) => {
      console.log(err.msg);
    });
}

function open() {
    let url = API_URL + "online";
   return fetch(url)
    .catch((err) => {
      console.log(err.msg);
    });
}
function closed() {
    let url = API_URL + "offline";
   return fetch(url)
    .catch((err) => {
      console.log(err.msg);
    });
}

function getStatus() {
  let url = API_URL + "status";
 return fetch(url)
  .catch((err) => {
    console.log(err.msg);
  });
}

function getNbrClient() {
  let url = API_URL + "nbrClient";
 return fetch(url)
  .catch((err) => {
    console.log(err.msg);
  });
}
export const hallekService = {
    addClient,
    deleteClient,
    open,
    closed,
    getStatus,
    getNbrClient
 
};