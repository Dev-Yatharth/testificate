let form = document.getElementById("form");
let sr = window.webkitSpeechRecognition || window.SpeechRecognition;
let spRec = new sr();
spRec.lang = "hi";
spRec.continuous = true;
spRec.interimResults = true;
// console.log(spRec);
form.addEventListener("submit", e => {
    e.preventDefault();
    spRec.start();
})
spRec.onresult = res => {
    let letter = Array.from(res.results)
        .map(r => r[0])
        .map(txt => txt.transcript)
        .join("");
    form[0].value = letter;
    // console.log(text);
}
form[2].addEventListener("click", () => {
    spRec.stop()
})

interchange();

function interchange(){
    let stt = document.getElementById("stt").value;
    let tts = document.getElementById("tts");
    tts.value = stt;
}

const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");

let synth = speechSynthesis,
isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }else{
                }
            }, 500);
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
        }else{
            speechBtn.innerText = "Convert To Speech";
        }
    }
});