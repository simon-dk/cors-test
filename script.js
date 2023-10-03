const inputSelector = document.getElementById("inputSelector");
const datalist = document.getElementById("options");
const clearDataButton = document.getElementById("clearDataButton");

const datalistUrls = [
  "http://localhost:3001",
  "https://services.datafordeler.dk/DAR/DAR/1/REST/adresse?Id=048eae01-7f69-4f62-95d9-5282e985bd4a",
  "https://eozbi73tpz4wenb.m.pipedream.net",
];

function populateDatalist() {
  datalist.innerHTML = "";

  datalistUrls.forEach((url) => {
    const option = document.createElement("option");
    option.value = url;
    datalist.appendChild(option);
  });
}

function addHeaderInput(key, value) {
  const headerContainer = document.getElementById("headerContainer");
  const headerInput = document.createElement("div");

  headerInput.innerHTML = `
    <input class="input" type="text" placeholder="Header Key" value=${key ?? ""}>
    <input class="input" type="text" placeholder="Header Value" value=${value ?? ""}>
    <button class="removeHeaderButton">Remove</button>
  `;

  // Add a click event listener to the "Remove" button
  const removeButton = headerInput.querySelector(".removeHeaderButton");
  removeButton.addEventListener("click", () => {
    headerContainer.removeChild(headerInput);
  });

  // Append the header input field to the container
  headerContainer.appendChild(headerInput);
}

function getHeaders() {
  const headerInputs = document.querySelectorAll("#headerContainer input[type='text']");

  const headers = {};

  headerInputs.forEach((input, index) => {
    if (index % 2 === 0) {
      // Even index: Header key
      const key = input.value.trim();
      const valueInput = headerInputs[index + 1];
      const value = valueInput.value.trim();

      if (key && value) {
        headers[key] = value;
      }
    }
  });

  return headers;
}

function fetchData() {
  const url = inputSelector.value;

  if (!url) {
    alert("Please enter a URL");
    return;
  }

  const headers = getHeaders();
  // const body = JSON.stringify({ foo: "bar" });

  fetch(url, { headers, method: "GET" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("dataContainer").textContent = JSON.stringify(data, null, 2);
      clearDataButton.style.display = "inline-block";
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Initialize functions and event listeners
populateDatalist();
document.getElementById("fetchButton").addEventListener("click", fetchData);
document.getElementById("clearDataButton").addEventListener("click", () => {
  document.getElementById("dataContainer").textContent = "";
  clearDataButton.style.display = "none";
});

document.getElementById("resetButton").addEventListener("click", () => (inputSelector.value = ""));
document.getElementById("addHeaderButton").addEventListener("click", () => addHeaderInput());
document
  .getElementById("addUserAgentButton")
  .addEventListener("click", () => addHeaderInput("user-agent", "Bubble"));
