//! data fetch functionality
const loadData = async () => {
  const url = "https://restcountries.com/v3.1/all";
  try {
    const res = await fetch(url);
    const data = await res.json();

    displayData(data);
  } catch (err) {
    console.log(err);
  }
};

//! filter by region
const regionCategory = document.getElementById("region-category");
for (const children of regionCategory.children) {
  children.addEventListener("click", async (e) => {
    try {
      const regionName = e.target.innerText.toLowerCase();
      const url = `https://restcountries.com/v3.1/subregion/${regionName}`;
      const res = await fetch(url);
      const data = await res.json();
      displayData(data);
    } catch (err) {
      console.log(err);
    }
  });
}

document
  .getElementById("independent-list")
  .addEventListener("click", async () => {
    const url = "https://restcountries.com/v3.1/all";
    try {
      const res = await fetch(url);
      const data = await res.json();
      const independentCountriesList = data.filter(
        (country) => country.independent === true
      );
      displayData(independentCountriesList);
    } catch (err) {
      console.log(err);
    }
  });

document
  .getElementById("dependent-list")
  .addEventListener("click", async () => {
    const url = "https://restcountries.com/v3.1/all";
    try {
      const res = await fetch(url);
      const data = await res.json();
      const dependentCountriesList = data.filter(
        (country) => country.independent === false
      );
      displayData(dependentCountriesList);
    } catch (err) {
      console.log(err);
    }
  });

//! display fetch result functionality
const displayData = (countries) => {
  const countriesContainer = document.getElementById("country-container");
  countriesContainer.innerHTML = "";
  countries.forEach((country) => {
    const div = document.createElement("div");
    div.classList.add(
      "country-item",
      "p-3",
      "shadow-md",
      "m-4",
      "rounded-md",
      "bg-slate-100"
    );
    div.innerHTML = `
                <img
                  class="w-[300px] h-[180px] object-cover mx-auto rounded"
                  src=${country.flags.svg}
                  alt=${country.flags.alt}
                />
                <div class="mt-2 ml-4">
                  <p class="font-medium">Name: <span class="font-bold">${country.altSpellings[1]}</span></p>
                  <p class="font-medium">Population: <span class="font-bold">${country.population}</span></p>
                  <p class="font-medium">Region: <span class="font-bold">${country.region}</span></p>
                  <p class="font-medium">Timezones: <span class="font-bold">${country.timezones[0]}</span></p>
                </div>   
    `;
    countriesContainer.appendChild(div);
  });
};

loadData();
