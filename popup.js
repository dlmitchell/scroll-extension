async function getLocalStorage(key, callback) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], (result) => {
      resolve(result);
    });
  });
}

function setLocalStorage(obj) {
  chrome.storage.local.set(obj);
}

async function sendMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
        resolve(response);
      });
    });
  });
}

let setPosition = document.getElementById('setPosition');
let changePosition = document.getElementById('goToPosition');

setPosition.onclick = async function(element) {
  var response = await sendMessage({setPosition: true});

  if (response) {
    setLocalStorage({ position: response.position[1] });
  }
};

changePosition.onclick = async function(element) {
  const value = await getLocalStorage("position");
  await sendMessage({ goToPosition: true, value: value.position });
};
