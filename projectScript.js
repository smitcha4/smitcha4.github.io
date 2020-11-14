
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

        //photo forward
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


//email post request 
document.addEventListener('DOMContentLoaded', function(){
    if(document.body.classList.contains("costsClass")){
        emailSubmitted();
    }
});

function emailSubmitted(){
  document.getElementById('formSubmit').addEventListener('click', function(event){
    userText = document.getElementById("emailAddress").value;
    console.log(userText)
    var emailReq = new XMLHttpRequest();
    emailReq.open('POST', "http://httpbin.org/post", true);
    emailReq.setRequestHeader('Content-Type', 'application/json');
    emailReq.send(document.getElementById("emailAddress").value);
    event.preventDefault();
  })
}
