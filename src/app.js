const form = document.querySelector('#exchange-form');

function startApp(){
    setDateLimit();
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

function showRates(){
    
}

startApp();

form.onsubmit=showRates;
