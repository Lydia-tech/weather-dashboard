var button = document.querySelector('.button')
var inputValue = document.querySelector('inputValue')
var name = document.querySelector('name')
var desc = document.querySelector('desc')
var temp = document.querySelector('temp')

button.addEventListener('click',function(){ 


  fetch('http://api.openweathermap.org/data/2.5/weather?q=&appid='+inputValue.value+'7883975cfc87b328bb0451874bc2085a')
    .then(response => response.json())
    .then(data => {
       var nameValue = data['name'];
       var tempValue = ['main']['temp'];
       var descValue = data['weather'][0]['description'];

       name.innerHTML = nameValue;
       temp.innerHTML = tempValue;
       desc.innerHTML = descValue;
    })

.catch( err => alert("Wrong city name!"))
})
  

  