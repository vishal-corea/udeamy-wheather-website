
console.log("Stacitc js file ")




const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne  =  document.getElementById("message-1")
const messageTwo  =  document.querySelector("#message-2")


weatherForm.addEventListener('submit',(e)=>{
    messageOne.textContent = "Loding...";
    messageTwo.textContent = "";

    e.preventDefault(); 

    if(search.value){
        fetch("/weather?address="+search.value).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    messageOne.textContent = data.error;
                }else{
                    messageOne.textContent =  data.location;
                    messageTwo.textContent =  data.forecast;
                    console.log(data.forecast);
                    console.log(data.location);
                    console.log(data.address);
                }
                
            })
        })
    }else{
        messageOne.textContent = "Please enter the search value";
        console.log("Please enter the search value")
    }
})