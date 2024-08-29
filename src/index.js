function displayCity(event) {
  event.preventDefault();
  searchInput = document.querySelector("#search-form-input");
  cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
}
searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", displayCity);
