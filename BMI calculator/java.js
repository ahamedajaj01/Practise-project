const form= document.querySelector("form")

form.addEventListener("submit",function(event){
    event.preventDefault()
const height= parseInt(document.querySelector("#height").value);
const weight= parseInt(document.querySelector("#weight").value);
const result = document.querySelector("#result");

if(height=== "" || height<0 || isNaN(height)){
result.innerHTML= `Give a valid height ${height}`
}
else if(weight=== "" || weight<0 || isNaN(weight)){
result.innerHTML= `Give a valid weight ${weight}`
}
else{
   const BMI= (weight/ ((height*height)/10000)).toFixed(2);
   
   result.innerHTML=BMI;

   let  category = "";
   if(BMI <= 18.6){
    category = "Underweight"
   }
   else  if (BMI >=18.6 && BMI <= 24.9){
    category = " Normal Range"
   }
   else if (BMI >=24.9){
   category = " Overweight"
   }
result.innerHTML = `Your BMI is: ${BMI} (${category})`;

}

});

