const BaseUrl=
    "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_M3fpvkQuQAYDnzmUy87Avxc7V8iQNkRsQCI47aUF&";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");



for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        select.append(newOption);
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
    }
    select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
});    
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    updateExRate();
});  


const updateExRate=async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal==="" || amtVal<0){
        amtVal=1;
        amount.value="1";
    }

    const url=`${BaseUrl}currencies=${toCurr.value}&base_currency=${fromCurr.value}`;
    //currencies=INR&base_currency=USD;

    let response = await fetch(url);
    let data=await response.json();
    let exRate=data.data[toCurr.value];

    let finalAmount=amtVal*exRate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

window.addEventListener("load",()=>{
    updateExRate();
});