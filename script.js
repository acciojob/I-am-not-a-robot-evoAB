//your code here
const robotContainer  = document.querySelector(".robot-section");

const mainContainer = document.querySelector(".main-section")

const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");

// verifyBtn.addEventListener("click", ()=>{
//     console.log("click");
// })

let imagesClassNames = ["img1", "img2", "img3","img4","img5"];
let randomImgClassNames = [...imagesClassNames, imagesClassNames[Math.floor(Math.random()*imagesClassNames.length)] ];

function deleteElement(arr, index){
    for(let i=index; i<arr.length-1; i++){
        arr[i]=arr[i+1];
    }
    arr.pop();
    return arr;
}

for(let i=0;i<6;i++){
    let randomIdx=Math.floor(Math.random()*randomImgClassNames.length)

    let imageTag = document.createElement("img");
    imageTag.className = randomImgClassNames[randomIdx];
    imageTag.id = "pic"+i;

    robotContainer.append(imageTag);
    
    randomImgClassNames=deleteElement(randomImgClassNames, randomIdx);
    
}

let images = document.querySelectorAll("img");

for(let img of images){
    img.addEventListener("click", validate);
}

let click=0;
let previousImgaeId="";
function validate(event_details){

    let currentImageId = event_details.target.id

    if(previousImgaeId != currentImageId){
        click++ 
        previousImgaeId = currentImageId
    }
    event_details.target.classList.add("selected")

    if(click==1)
        resetBtn.classList.remove("hide");

    else
    if(click==2)
        verifyBtn.classList.remove("hide");
    
    else
    if(click==3)
        verifyBtn.classList.add("hide");

}


resetBtn.addEventListener("click", reset);

function reset(){
    click=0;
    previousImgaeId="";
    resetBtn.classList.add("hide");
    verifyBtn.classList.add("hide");

    let lastIdToRemove = document.getElementById("para");
    if(lastIdToRemove)
        mainContainer.removeChild(lastIdToRemove);

    let images = document.querySelectorAll(".selected")
    for(let t of images){
        t.classList.remove("selected")
    }
    
}

verifyBtn.addEventListener("click", verify);

function verify(){
    verifyBtn.classList.add("hide");

    let selectedImages = document.querySelectorAll(".selected")
    let para = document.createElement('p');
    para.id = "para"
    if(selectedImages[0].className == selectedImages[1].className){
        para.innerText = "You are a human. Congratulations!."
    }
    else{
        para.innerText = " We can't verify you as a human. You selected the non-identical tiles."
    }
    mainContainer.append(para)
}
