
function changeLanguage(language){


if(language === "sw"){



document.getElementById("title").innerHTML =
"Fomu ya Maoni ya Usafi";



document.getElementById("nameLabel").innerHTML =
"Jina";



document.getElementById("regionLabel").innerHTML =
"Mkoa";



document.getElementById("districtLabel").innerHTML =
"Wilaya";



document.getElementById("streetLabel").innerHTML =
"Mtaa/Kijiji";



document.getElementById("dateLabel").innerHTML =
"Tarehe";



document.getElementById("rateLabel").innerHTML =
"Kadiria Huduma";



document.getElementById("problemLabel").innerHTML =
"Eleza Tatizo";



document.getElementById("photoLabel").innerHTML =
"Pakia Picha ya Ushahidi";



document.getElementById("cameraBtn").innerHTML =
"📷 Fungua Kamera";



document.getElementById("switchBtn").innerHTML =
"🔄 Badili Kamera";



document.getElementById("captureBtn").innerHTML =
"Piga Picha";



document.getElementById("submitBtn").innerHTML =
"Tuma Maoni";



document.getElementById("rateSelect").innerHTML = `

<option>1 - Mbaya</option>
<option>2 - Wastani</option>
<option>3 - Nzuri</option>
<option>4 - Nzuri Sana</option>
<option>5 - Bora Sana</option>

`;



}




else{



document.getElementById("title").innerHTML =
"Sanitation Feedback Form";



document.getElementById("nameLabel").innerHTML =
"Name";



document.getElementById("regionLabel").innerHTML =
"Region";



document.getElementById("districtLabel").innerHTML =
"District";



document.getElementById("streetLabel").innerHTML =
"Street/Village";



document.getElementById("dateLabel").innerHTML =
"Date";



document.getElementById("rateLabel").innerHTML =
"Rate Service";



document.getElementById("problemLabel").innerHTML =
"Describe Problem";



document.getElementById("photoLabel").innerHTML =
"Upload Photo Evidence";



document.getElementById("cameraBtn").innerHTML =
"📷 Open Camera";



document.getElementById("switchBtn").innerHTML =
"🔄 Switch Camera";



document.getElementById("captureBtn").innerHTML =
"Capture Photo";



document.getElementById("submitBtn").innerHTML =
"Submit Feedback";



document.getElementById("rateSelect").innerHTML = `

<option>1 - Poor</option>
<option>2 - Fair</option>
<option>3 - Good</option>
<option>4 - Very Good</option>
<option>5 - Excellent</option>

`;



}




}



function openCamera(){

navigator.mediaDevices.getUserMedia({
video:true,
audio:false
})

.then(function(stream){

document.getElementById("camera").srcObject = stream;

})

.catch(function(error){

alert(error.name + " - " + error.message);

});

}
let currentCamera = "user";
let currentStream;


function switchCamera(){

if(currentStream){
    currentStream.getTracks().forEach(track => track.stop());
}


navigator.mediaDevices.getUserMedia({

video:{
facingMode:currentCamera
},
audio:false

})

.then(function(stream){

currentStream = stream;

document.getElementById("camera").srcObject = stream;

})

.catch(function(error){

alert(error.message);

});

}
document.getElementById("submitBtn").addEventListener("click", function(e){

    e.preventDefault();


    const data = {

        name: document.getElementById("name").value,

        region: document.getElementById("region").value,

        district: document.getElementById("district").value,

        date: document.getElementById("date").value,

        problem: document.getElementById("problem").value,

        rateSelect: document.getElementById("rateSelect").value

    };


    fetch("http://localhost:5000/submit", {

    method: "POST",

    body: (() => {

        const formData = new FormData();

        formData.append("name", document.getElementById("name").value);

        formData.append("region", document.getElementById("region").value);

        formData.append("district", document.getElementById("district").value);

        formData.append("date", document.getElementById("date").value);

        formData.append("problem", document.getElementById("problem").value);

        formData.append("rating", document.getElementById("rateSelect").value);


        const image = document.getElementById("image").files[0];

        formData.append("image", image);


        return formData;

    })()

})

.then(response => response.json())

.then(data => {

    alert(data.message);

})

.catch(error => {

    console.log(error);

});

function takePhoto(){

    const video = document.getElementById("camera");
    const canvas = document.getElementById("photoCanvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );

    alert("Photo captured successfully");
}