console.log("welcome to M company");

//intialize the variables
let songindex= 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay= document.getElementById('masterplay');
let soundcontrolar= document.getElementById('soundcontrolar')
let myProgressbar= document.getElementById('myProgressbar');
let mastersongname= document.getElementById('masterplaysong');
let gif = document.getElementById('gif');
let songitem = Array.from(document.getElementsByClassName('songitem'));


let songs =[
    {songName:"Agar tom sath ho - Arijit sing",      filepath:'songs/1.mp3' , cover:'covers/1.jpg'},
    {songName:"Runway - Aurora",                filepath:'songs/2.mp3' , cover:'covers/2.jpg'},
    {songName:"Middle of night - Elley due",    filepath:'songs/3.mp3' , cover:'covers/3.jpg'},
    {songName:"I have secret that nobody konws ",       filepath:'songs/4.mp3' , cover:'covers/4.jpg'},
    {songName:"paho2- put hoan",       filepath:'songs/5.mp3' , cover:'covers/5.jpg'},
    {songName:"Love story - indila",            filepath:'songs/6.mp3' , cover:'covers/6.jpg'},
    {songName:"English x Hindi Masup ",         filepath:'songs/7.mp3' , cover:'covers/7.jpg'},
    {songName:"Heat waves - Glass Animal",          filepath:'songs/8.mp3', cover:'covers/8.jpg'},
    {songName:"beliver -imagine dragon ",          filepath:'songs/9.mp3', cover:'covers/9.jpg'},
    {songName:"cradless - M companyf",            filepath:'songs/10.mp3', cover:'covers/10.jpg'},
    
    

]

songitem.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].cover; 
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName; 
})
 

//handle play/pause click
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    }
    else{
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        audioElement.pause();
       
    }
})


//listen to the Events

audioElement.addEventListener('timeupdate', ()=>{
 //update secbar
 progress = parseFloat((audioElement.currentTime/audioElement.duration)*100);
 myProgressbar.value=progress;

     
})
    
myProgressbar.addEventListener('change', ()=>{
    audioElement.currentTime=myProgressbar.value * audioElement.duration/100;
})
audioElement.addEventListener('ended',  ()=>{ 
    audioElement.play();})
   
//song playing infos
const makeAllPlays =()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
         masterplay.classList.remove('fa-circle-play');
         masterplay.classList.add('fa-circle-pause');
    

    })
    
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        makeAllPlays();
        
        songindex =parseInt(e.target.id);
        //  e.target.classList.remove('fa-circle-play');
        //  e.target.classList.add("fa-circle-pause");
        audioElement.src =`songs/${songindex+1}.mp3`;
        masterplaysong.innerText = songs[songindex].songName;
        audioElement.currentTime = 0 ;
        audioElement.play();
        gif.style.opacity=1;
        // masterplay.classList.remove('fa-circle-play');
        // masterplay.classList.add('fa-circle-pause');
    
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songindex >=songs.length-1)
    {songindex=0}
    else{songindex+=1}


    audioElement.src =`songs/${songindex+1}.mp3`;
    masterplaysong.innerText = songs[songindex].songName;
    audioElement.currentTime = 0 ;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');

    

 

})

document.getElementById('previous').addEventListener('click',()=>{
    if(songindex <= 0){
        songindex = 0
    }
    else{
        songindex -=1;
    }

    audioElement.src =`songs/${songindex+1}.mp3`;
    masterplaysong.innerText = songs[songindex].songName;
    audioElement.currentTime = 0 ;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
});

// get song duration and get  
let currentime= document.getElementById('curentime');
let duration= document.getElementById('duration')

audioElement.addEventListener('timeupdate', ()=>{



    if( audioElement.duration){
        let curmin= Math.floor(audioElement.currentTime /60);
        let cursec= Math.floor(audioElement.currentTime - curmin * 60);

        let durmin= Math.floor(audioElement.duration /60);
        let dursec= Math.floor(audioElement.duration - durmin * 60);
        if ( dursec <10){
            dursec = "0"+dursec
        }
        if ( durmin <10){
            durmin = "0"+durmin
        }
        if ( cursec <10){
            cursec = "0"+cursec
        }
        if ( curmin <10){
            curmin = "0"+curmin
        }
        currentime.innerText= curmin+':'+cursec;
        duration.innerText= durmin+':'+dursec;


    }
    else{
        currentime.innerText= "00"+"00";
        duration.innerText= "00"+"00";

    }

})

soundcontrolar.addEventListener('change', ()=>{
    audioElement.volume= soundcontrolar.value/100;
})