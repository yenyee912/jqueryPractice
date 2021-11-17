"use strict";

// main method
$(document).ready( () => {
	const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
  const numberOnlyPattern = /^\d+$/;

  $("#submit").click(() =>{
    let fieldSet = ["arrival_date", "name", "phone","email" ,"nights", ]
    let isFill= []
    let isEmailValid= false
    let isNightsValid= false
    $("#arrival_date").focus()

    document.getElementById('arrival_date').focus();

    for (let i = 0; i < fieldSet.length; i++) {
      if (document.querySelector(`#${fieldSet[i]}`).value == '' || document.querySelector(`#${fieldSet[i]}`).value == null) {
        $(`#msg_for_${fieldSet[i]}`).text('This field is required.');
        isFill[i] = false
      }

      else {
        $(`#msg_for_${fieldSet[i]}`).text('');
        isFill[i]= true
      }

      if (i == 3 && isFill[i]== true){
        isEmailValid= validateEmail(emailPattern, document.querySelector(`#${fieldSet[i]}`).value)
      }

      if (i == 4 && isFill[i] == true){
        isNightsValid= validateNights(numberOnlyPattern, document.querySelector(`#${fieldSet[i]}`).value)
      }

      //trim input
      document.querySelector(`#${fieldSet[i]}`).value = document.querySelector(`#${fieldSet[i]}`).value.toString().trim()
    }

    let isAnyEmpty= isFill.find(el => el== false)

    if (isEmailValid && isNightsValid && isAnyEmpty== undefined)
      return true    

    else
      return false
  
  })		
});   


function validateEmail(reg, input){
  let isValid = reg.test(input);
  if (isValid){
    $(`#msg_for_email`).text('');
    return true
  }
  
  else{
    $(`#msg_for_email`).text('Must be a valid email address.');
  }    
  
}


function validateNights(reg, input) {
  let isValid = reg.test(input);
  if (isValid){
    $('#msg_for_nights').text('');
    return true
  }

  else{
    $('#msg_for_nights').text('Must be numeric');
  }
}
