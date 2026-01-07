const Base_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/'; 

const bothselect = document.querySelectorAll(".currency-row select");
const fromcurr = document.querySelector("#from-currency");
const tocurr = document.querySelector("#to-currency");
const convertButton = document.querySelector("#convert");
const result1 = document.querySelector("#result1");
const result2 = document.querySelector("#result2");


for ( let select of bothselect ) {
    for( currCode in countryList ) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name==="from-currency" && currCode==="USD") {
            newOption.selected = "selected";
        }else if (select.name==="to-currency" && currCode==="INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
 
    select.addEventListener("change", (evt) => {
        updateflags(evt.target);

    });

}

const updateflags = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newimg= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let flagimg = element.parentElement.querySelector('.flag-icon');
    flagimg.src = newimg;
}



convertButton.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("#amount");
    let amtval = amount.value;
    console.log(amtval);


    if(amtval===""|| amtval==="0") {
        amtval=1;
        amount.value = "1";
    }


    const URL = `${Base_URL}${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    
    let data = await response.json();
    console.log (data);
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    let finalamount= amtval * rate;
    console.log(finalamount);
    
    
    result1.innerText =`${rate} ${tocurr.value}`;
    result2.innerText =`${amtval} ${fromcurr.value} = ${finalamount.toFixed(2)} ${tocurr.value}`;
});





