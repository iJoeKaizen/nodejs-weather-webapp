console.log("Client side javascript");

const mainContent = document.querySelector(".main-content");
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const displayInfo = document.querySelector(".display");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  displayInfo.innerHTML = `<p>Loading...</p>`;

  fetch(`http://localhost:3000/weather?search=${location}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        displayInfo.innerHTML = ``;
        const markup = `<p>${data.error}</p>`;
        displayInfo.insertAdjacentHTML("beforeend", markup);
        search.value = "";
      } else {
        displayInfo.innerHTML = ``;
        const markup = `
        <p>${data.city}</p>
        <p>${data.location}</p>
      `;
        displayInfo.insertAdjacentHTML("beforeend", markup);
        search.value = "";
      }
    });
});
