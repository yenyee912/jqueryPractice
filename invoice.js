"use strict";

const calculateDiscount = (customer, subtotal) => {
  if (customer == "reg") {
    if (subtotal >= 100 && subtotal < 250) {
      return .1;
    } else if (subtotal >= 250 && subtotal < 500) {
      return .25;
    } else if (subtotal >= 500) {
      return .3;
    } else {
      return 0;
    }
  }
  else if (customer == "loyal") {
    return .3;
  }
  else if (customer == "honored") {
    if (subtotal < 500) {
      return .4;
    }
    else {
      return .5;
    }
  }
};

$(document).ready(() => {
  $("#calculate").click(() => {
    const customerType = $("#type").val();
    let subtotal = $("#subtotal").val();
    subtotal = parseFloat(subtotal);
    if (isNaN(subtotal) || subtotal <= 0) {
      alert("Subtotal must be a number greater than zero.");
      $("#clear").click();
      $("#subtotal").focus();
      return;
    }

    const discountPercent = calculateDiscount(customerType, subtotal);

    // solution
    let dueDate = $("#invoice_date").val()

    if (dueDate == '') {
      let temp = Date.now()
      dueDate = new Date(temp)
      $("#invoice_date").val(dateObjectToString(dueDate))
      dueDate = calculateDueDate(dueDate)
    }

    else if (dueDate.length == 10) {
      let formattedDueDate = stringToDateObject(dueDate)
      dueDate = calculateDueDate(formattedDueDate)

    }

    else {
      // display error msg
      alert("Please enter a correct invoice date format.");

      // clear the controls
      $("#invoice_date").val("");

      // move the focus 
      $("#invoice_date").focus();

      // return
      return;
    }

    const discountAmount = subtotal * discountPercent;
    const invoiceTotal = subtotal - discountAmount;

    $("#subtotal").val(subtotal.toFixed(2));
    $("#percent").val((discountPercent * 100).toFixed(2));
    $("#discount").val(discountAmount.toFixed(2));
    $("#total").val(invoiceTotal.toFixed(2));

    // solution
    $("#due_date").val(dueDate)

    // set focus on type drop-down when done  
    $("#type").focus();

  });


  // reset done
  $("#clear").click(() => {

    $("#type").val("reg");
    $("#subtotal").val("");
    $("#invoice_date").val("");
    $("#percent").val("");
    $("#discount").val("");
    $("#total").val("");
    $("#due_date").val("");

    // set focus on type drop-down when done
    $("#type").focus();
  })

  // set focus on type drop-down on initial load
  $("#type").focus();
});

// solution
const stringToDateObject = (str) => {
  /* months 0..11? */
  // str format=> 12/31/2021
  const day = parseInt(str.slice(3, 5))
  const month = parseInt(str.slice(0, 2))
  const year = parseInt(str.slice(6, 10))

  let dateObj = new Date(year, month - 1, day)
  return dateObj;
}


const dateObjectToString = (obj) => {
  let dateObj = new Date(obj)

  let day = dateObj.getDate()
  let month = dateObj.getMonth() + 1
  let year = dateObj.getFullYear()

  if (day < 9 && day > 0) {
    day = "0" + day
  }

  if (month < 9 && month > 0) {
    month = "0" + month
  }
  let str = `${month}/${day}/${year}`
  return str;

}

const calculateDueDate = (dateObj) => {
  let invoiceDateObj = new Date(dateObj)
  invoiceDateObj.setDate(invoiceDateObj.getDate() + 30);

  return dateObjectToString(invoiceDateObj);
}




