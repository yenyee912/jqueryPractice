"use strict";

var wasteList = []
var inputNames = []
document.addEventListener('DOMContentLoaded', () => {

  // @onchange props
  var inputList = document.querySelectorAll("input")

  for (let i = 0; i < inputList.length; i++) {
    // same as v-model in vuejs
    inputList[i].onchange = checkInputChange;

    inputNames.push(inputList[i].name)
    // 0-3: weekly; 4-6: monthly; 7-10: annaul
  }

  document.querySelector("#in_household").onchange = checkInputChange;


  // generateWasteList()
  console.log(wasteList)

  function generateResult() {
    console.log('sdsds')
    let household = document.querySelector('#in_household').value
    let result = calculateTotalPlasticWaste(wasteList, household)
    console.log(result)
    document.querySelector('#total_per_year').innerHTML = result;
    document.querySelector('#biggest-category').innerHTML = biggestCategory(wasteList);
  }

  // @onchange event listener
  function checkInputChange(event) {
    // calculateTotalPlasticWaste()

    wasteList = []
    generateWasteList()

    // let updatedItem = { name: event.target.name, waste: event.target.value }

    // let updatedItemIndex = wasteList.findIndex(el => el.name == updatedItem.name)

    // // find index first
    // wasteList.splice(updatedItemIndex, 1, updatedItem)

    // generateWasteList()
    generateResult()
  }

  document.getElementById("reset").addEventListener("click", ()=>{
    // for 
    // document.querySelectorAll("input").value= ""
    for (let j = 0; j < inputNames.length; j++){
      document.querySelector(`#in_${inputNames[j]}`).value=0
    }

    document.querySelector(`#in_household`).value = 1
    document.querySelector(`#total_per_year`).innerHTML = 0
    document.querySelector('#biggest-category').innerHTML = "unknown sources"
    console.log('hey its me cyy')
  });
});




const generateWasteList = () => {
  // week, month, year
  for (let a = 0; a < 4; a++) {
    let wastePerItem = convertWeeklyWasteToAnnualWaste(
      document.querySelector(`#in_${inputNames[a]}`).value,
      document.querySelector(`#in_${inputNames[a]}`).getAttribute("data-weight"))

    wasteList.push({ name: inputNames[a], waste: wastePerItem })
  }

  for (let b = 4; b < 7; b++) {
    let wastePerItem = convertMonthlyWasteToAnnualWaste(
      document.querySelector(`#in_${inputNames[b]}`).value,
      document.querySelector(`#in_${inputNames[b]}`).getAttribute("data-weight"))

    wasteList.push({ name: inputNames[b], waste: wastePerItem })

  }

  for (let c = 7; c < inputNames.length; c++) {
    let wastePerItem = document.querySelector(`#in_${inputNames[c]}`).value * document.querySelector(`#in_${inputNames[c]}`).getAttribute("data-weight")

    wasteList.push({ name: inputNames[c], waste: wastePerItem })
  }
}

// only for inputs which take in weekly data
const convertWeeklyWasteToAnnualWaste = (weeklyWaste, weight) => {
  // 52 weeks/ yr
  let annualWaste = weeklyWaste * 52 * weight
  return annualWaste
}

const convertMonthlyWasteToAnnualWaste = (monthlyWaste, weight) => {
  let annualWaste = monthlyWaste * 12 * weight
  return annualWaste
}

const calculateTotalPlasticWaste = (wasteArr, household) => {
  let totalWaste = 0

  console.log(wasteArr)

  wasteArr.forEach(el => {
    totalWaste += el.waste
  });

  return totalWaste / household

}

const biggestCategory = (wasteArr) => {
  // wasteArr= [{name: bottles, waste: 10}]
  let biggestCat = ""
  let maxWaste = wasteArr.reduce((acc, cur) => {
    return Math.max(acc, cur.waste)
  }, 0)

  if (maxWaste > 0) {
    // only return first value
    biggestCat = wasteArr.filter(el => {
      return el.waste == maxWaste
    })[0].name
  }

  return biggestCat
}















// # frozen_string_literal: true
// #--
// # Copyright(c) 2004 - 2021 fuyazi
// #
// # Permission is hereby granted, free of charge, to any person obtaining
// # ….[stipped for brevity]