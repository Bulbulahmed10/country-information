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

const displayData = (countries) => {
  const countriesContainer = document.getElementById("country-container");

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
                  <p class="font-medium">Capital: <span class="font-bold">${country.capital[0]}</span></p>
                  <p class="font-medium">Region: <span class="font-bold">${country.region}</span></p>
                  <p class="font-medium">Timezones: <span class="font-bold">${country.timezones[0]}</span></p>
                </div>   
    `;
    countriesContainer.appendChild(div);
  });
};

loadData();
