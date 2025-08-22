const unitConverter = (weight:number,from:string,unitP:number):number => {
  let totalPrice=0
switch (from){
  case "kg":
    totalPrice = weight * unitP
    break
  case "ton":
    totalPrice = (weight*1000) * unitP
    break
  case "pound":
    totalPrice = (weight*0.453592) * unitP
    break
  case "gram":
    totalPrice = (weight*0.001) * unitP
}
return totalPrice
}


console.log(unitConverter(1,"ton",100))
console.log(unitConverter(1,"pound",100))
console.log(unitConverter(250,"gram",100))


export default unitConverter