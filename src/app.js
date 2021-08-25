const form = document.querySelector('#exchange-form');
const dateInput = form.date;
const apiKey="?access_key=6c8ff1cfb926726231272a1cbe5a560c";
const api= "http://api.exchangeratesapi.io/v1/";

function startApp(){
    setDateLimit();
    form.onsubmit=showRates;
    dateInput.onchange=()=>{
        let date = form.date.value;
        validateForm(date);
    }
}

function setDateLimit(){
    let date= new Date();
    let dateDetails=[]
    dateDetails.push(date.getFullYear().toString());
    dateDetails.push((date.getMonth()+1).toString());
    dateDetails.push(date.getDate().toString());

    for(i=1;i<3;i++){
        if(dateDetails[i].length<2){
            dateDetails[i]="0"+dateDetails[i];
        }
    }

    let dateFormat=`${dateDetails[0]}-${dateDetails[1]}-${dateDetails[2]}`;

    let inputDate = document.querySelector("#date");
    inputDate.max=dateFormat;

}

function showRates(e){
    e.preventDefault();
    const info=getFormInfo();
}

function getFormInfo(){
    let date = form.date.value;
    if(validateForm(date)){
        let base;
        if(form.base.checked){
            base="USD";
        } else{
            base="EUR";
        } 

        let url=`${api}${date}${apiKey}`;
        
        fetch(url)
            .then(response => response.json())
            .then(response => displayRates(response.rates, base))
            .catch(error => console.log(error));
        

        showLoading();

    }
  

}

function displayRates(response, base){
    console.log(response);
    console.log(base);

    let currencies = Object.keys(response);
    let grid = document.createElement('DIV');
    grid.classList.add('currencies-grid');

    currencies.forEach( currency => {
        let card = document.createElement("DIV");
        card.classList.add("container"); //OJO con el Style

        let symbol = document.createElement('H3');
        symbol.appendChild(document.createTextNode(currency));

        let value = document.createElement('P');
        valueText = document.createTextNode("€" + response[currency]);
        value.appendChild(valueText);

        card.appendChild(symbol);
        card.appendChild(value);

        grid.appendChild(card);
    })
    removeLoadingAndReStyleMain();
    let gridContainer = document.querySelector("div.exchange-rates");
    gridContainer.classList.add('container'); //OJO con el Style
    gridContainer.appendChild(grid);

    
}

function validateForm(date){
    if(date.length==0){
        invalidDate();
        return false;
    } else if(dateInput.classList.contains('invalid')){
        correctedDate();
    }
    return true;
    
}

function invalidDate(){
    if(!dateInput.classList.contains('invalid')){
        dateInput.classList.add('invalid');
        let label = dateInput.parentElement;
        let warning = document.createElement('P');
        let warningText = document.createTextNode('Please select a valid date');
        warning.appendChild(warningText);
        label.appendChild(warning);
    }
}

function correctedDate(){
    let label = dateInput.parentElement;
    label.lastElementChild.remove();
    dateInput.classList.remove('invalid');
}

function showLoading(){
    removeFormContent();
    createLoading();
}

function removeFormContent(){
    form.firstElementChild.remove();
}

function createLoading(){
    let container = document.createElement('DIV');
    container.classList.add('container');

    let message = document.createElement('P');
    message.classList.add('message')
    let messageText = document.createTextNode('Loading Results...');

    let wheel = document.createElement('DIV');
    wheel.classList.add('loader');

    message.appendChild(messageText);
    container.appendChild(message);
    container.appendChild(wheel);

    form.appendChild(container);
}

function removeLoadingAndReStyleMain(){
    form.remove();
    document.querySelector('main').classList.add('wider-main');
    document.querySelector('body').classList.remove('vpheight');
};

startApp();


