let currOptions = document.querySelectorAll("form select");
let convertBtn = document.querySelector("form button");
let amount = document.querySelector("form input");
let fromCurr = document.querySelector("form .from-currency");
let toCurr = document.querySelector("form .to-currency");
let resultText = document.querySelector("form .result");
let exchangeIcon = document.querySelector("#exchange-icon");
const apiURL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

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

// convert currency
async function convertCurrency() {
  if (amount.value === "" || amount.value < 1) amount.value = 1;
  const res = await fetch(
    `${apiURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
  );
  const data = await res.json();
  const exchangeCurr = toCurr.value.toLowerCase();
  const exchangeRate = data[exchangeCurr];
  const conversion = (amount.value * exchangeRate).toFixed(2);
  resultText.innerHTML = `${amount.value} ${fromCurr.value} = ${conversion} ${toCurr.value}`;
}

currOptions.forEach((select) => {
  fetchAllCurrencyCodes(select); // fetch and append options
  select.addEventListener("change", (e) => {
    let selectedOption = e.target;
    let selectedOptionImageEl = selectedOption.previousElementSibling;
    updateFlag(selectedOptionImageEl, countryList[selectedOption.value]);
  });
});

exchangeIcon.addEventListener("click", (e) => {
  const temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;
  const fromCountry = countryList[fromCurr.value];
  const toCountry = countryList[toCurr.value];
  fromCurr.previousElementSibling.src = `https://flagsapi.com/${fromCountry}/flat/64.png`;
  toCurr.previousElementSibling.src = `https://flagsapi.com/${toCountry}/flat/64.png`;
});

convertBtn.addEventListener("click", (e) => {
  e.preventDefault();
  convertCurrency();
});

window.addEventListener("load", convertCurrency);
