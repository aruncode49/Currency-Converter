let currOptions = document.querySelectorAll("form select");

// fetching currency codes
function fetchAllCurrencyCodes(element) {
  for (let currCode in countryList) {
    let selectOption = document.createElement("option");
    selectOption.value = currCode;
    selectOption.innerHTML = currCode;
    element.append(selectOption);
  }
}

// update flag
async function updateFlag(imgElement, countryCode) {
  let updatedSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  imgElement.src = updatedSrc;
}

currOptions.forEach((select) => {
  fetchAllCurrencyCodes(select); // fetch and append options
  select.addEventListener("change", (e) => {
    let selectedOption = e.target;
    let selectedOptionImageEl = selectedOption.previousElementSibling;
    updateFlag(selectedOptionImageEl, countryList[selectedOption.value]);
  });
});
