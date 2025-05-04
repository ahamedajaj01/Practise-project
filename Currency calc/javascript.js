const baseURL = "https://api.unirateapi.com/api/rates?api_key=UfbjNkdstUOeU3w36WCQPJC0EAishYXkVaTaMa8jSVc9hUITyCquWX2kIfXAVUUu";




const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (let currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if (select.name === "from" && currcode === "USD") {
            newoption.selected = "selected";
        } else if (select.name === "to" && currcode === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", function (evt) {
        updateflag(evt.target);
    });
}

const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};
btn.addEventListener("click", async (evt) => {
    evt.preventDefault(); // Prevent form submission
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }
    const URL = `${baseURL}&base=${fromcurr.value}&symbols=${tocurr.value}`;
    console.log("Fetching URL:", URL);

    try {
        let response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        console.log("API Response:", data);

        if (!data.rates || !data.rates[tocurr.value]) {
            throw new Error(`Exchange rate for ${tocurr.value} not found.`);
        }

        let rate = data.rates[tocurr.value];
        let finalamount = (amtval * rate).toFixed(2);

        msg.innerText = `${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
    } catch (error) {
        
    }
});


