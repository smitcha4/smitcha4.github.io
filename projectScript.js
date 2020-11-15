
var photoCount = 2;
var activateInterval = null;

function openRegs(){
    window.open("https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0320", "_blank");
}

function startPass(){
    if(photoCount-1==0){
        document.getElementById("4").style.display = "none";
    }else{
        photoElement = document.getElementById(photoCount-1).style.display = "none";
    };
    document.getElementById(photoCount).style.display = "block";
    photoCount++;
    if(photoCount>4){
        photoCount=1;
    }  
}

function startInterval(){
    activateInterval = setInterval(startPass, 4000);
}

function stopInterval(){
    clearInterval(activateInterval);
}

document.addEventListener('DOMContentLoaded', function(){
    if(document.body.classList.contains('mainClass')){
        //show first photo and hide all others
        photoClass = document.getElementsByClassName("slides");
        for(let i=0; i<4; i++){
            photoClass[i].style.display = "none";
        }
        document.getElementById("1").style.display = "block";
        
        //photo back
        document.getElementById("photoBack").addEventListener('click', function(){
            stopInterval();
            photoCount-=1;
            if(photoCount<1){
                photoCount=4;
            };
            document.getElementById(photoCount).style.display = "none";
            if(photoCount-1<1){
                document.getElementById("4").style.display = "block";
            }else{
                document.getElementById(photoCount-1).style.display = "block";
            }
            startInterval();
        })


        document.getElementById("photoForward").addEventListener('click', function(){
            stopInterval();
            if(document.body.classList.contains('mainClass')){
                if(photoCount-1==0){
                    document.getElementById("4").style.display = "none";
                }else{
                    photoElement = document.getElementById(photoCount-1).style.display = "none";
                };
                document.getElementById(photoCount).style.display = "block";
                photoCount++;
                if(photoCount>4){
                    photoCount=1;
                }  
            }
            startInterval();
        })
        //interval for caurasel starts when on home page as 'mainClass' only exists on home 
        startInterval();
    }else{
        //interval for caurasel stops on subpages as 'mainClass' DNE on subpages  
        clearInterval();
    }
})

document.addEventListener('DOMContentLoaded', function(){
    if(document.body.classList.contains("costsClass")){
        document.getElementById('formSubmit').addEventListener('click', function(event){
            var userString = document.getElementById("emailAddress").value;
            var validEmail = true;

            if(/\S+@\S+\.\S+/.test(userString)){
                    //*********Submit User Provided Data**********
                var req = new XMLHttpRequest();
                req.open('POST', "https://httpbin.org/post", true);
                req.setRequestHeader('Content-Type', 'application/json');
                req.addEventListener('load', function(){
                    if(req.status>=200 && req.status<400){
                        console.log(JSON.parse(req.responseText));
                    }
                });
                console.log(document.getElementById("emailAddress").value); //email string is received
                req.send(JSON.stringify(document.getElementById("emailAddress").value));
                event.preventDefault();
            }else{
                alert("Please enter a valid email address.");
                validEmail = false;
            }
            //queryselector returns first element wich is a match
            var emailElement = document.querySelector('input');
            emailElement.value = '';
            document.getElementById("thankYouMsg").textContent="Thank you! You are now signed up to receive promotions.";
        });
    }
});

//**********************ADD-ON MAP WEATHER FORECAST*************************/
document.addEventListener('DOMContentLoaded', function(){
    if(document.body.classList.contains('mapClass')){
        var req = new XMLHttpRequest();
        req.open("GET", "https://api.openweathermap.org/data/2.5/onecall?lat=32.9847&lon=-97.0875&appid=99fc10e16dc88dd8e9f54a5f3f0bcc2d&units=imperial", true);

        req.addEventListener('load', function(){
          if(req.status>=200 && req.status<400){
            var weather = JSON.parse(req.response); //getting the returned & parsed object
            console.log(weather);
            for(x=0; x<5; x++){
                document.getElementById('description'+x).textContent = weather.daily[x].weather[0].description
                document.getElementById('highLow'+x).textContent = Math.trunc(weather.daily[x].temp.max)+'°/'+ Math.trunc(weather.daily[x].temp.min)+'°';

                var day0 = new Date();
                document.getElementById('date0').textContent = (day0.getMonth()+1)+'/'+day0.getDate();
                var day1 = new Date();
                day1.setDate(day0.getDate()+1)
                document.getElementById('date1').textContent = (day1.getMonth()+1)+'/'+day1.getDate();

                var day2 = new Date();
                day1.setDate(day0.getDate()+2)
                document.getElementById('date2').textContent = (day1.getMonth()+1)+'/'+day1.getDate();

                var day3 = new Date();
                day1.setDate(day0.getDate()+3)
                document.getElementById('date3').textContent = (day1.getMonth()+1)+'/'+day1.getDate();

                var day4 = new Date();
                day1.setDate(day0.getDate()+4)
                document.getElementById('date4').textContent = (day1.getMonth()+1)+'/'+day1.getDate();
            }
          }else{
            console.log("Request Error: " + req.statusText)
            }
          })
        req.send(null);
        //event.preventDefault();
    }
});

