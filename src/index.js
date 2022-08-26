import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


    let Voices = [];
    let speaker;
    let synth;
    if(typeof window !== "undefined" && "speechSynthesis" in window){
    speaker = new SpeechSynthesisUtterance()
    synth = window.speechSynthesis
    }

const Index = () => {
    const [Speech, setSpeech] = useState("Enter text in the textarea, and I will read it out for you");

    const [Voice, setVoice] = useState(0);
    const [Chars, setChars] = useState(0);
    Voices = synth.getVoices()
    speaker.lang = "en-US"
    speaker.pitch = 1
    speaker.rate = 1.6
    speaker.volume = 1
    let listOfSentences = []
   
    const manipulateSpeech = (text) => {
        let items = 0
        for(var i = 0; i < Math.ceil(text.split(" ").length/500); i++){
            listOfSentences[i] = []
        }
        for (var x = 0; x < Math.ceil(text.split(" ").length/500); x++) {
            for (var j = 0; j < 500; j++) {
                listOfSentences[x][j] = text.split(" ")[items++];
            }
            speaker.text = listOfSentences[x].join(" ")
            synth.speak(speaker)
        }
       
    }
    useEffect(() => {
        // Check if browser supports the Web Speech Api
        synth.cancel()
        speaker.voice = Voices[Voice]
        setChars(Speech.split(" ").length)
        
    }, [Voice, Speech]);
    
    return (
        <div>
           <h2>Text To Speech - {Chars} Chars</h2> 
            <div className='Form'>
            {/* Text Area to Get User Text Input */}
                <textarea name="Text" id="TextArea" cols="100" rows="10" onChange={(e) => {setSpeech(e.target.value); }} value={Speech}>
                </textarea>
           
                <div className='Buttons'>
            {/* Buttons for Controls */}
                    <button onClick={() => {
                        if(synth.paused){
                            synth.resume()
                        }
                       else manipulateSpeech(Speech)
                    }}>Play</button>
                    <button onClick={() => synth.cancel()}>Stop</button>
                </div>
                <select className='SelectVoice' onChange={(event) => {setVoice(event.target.value)}}>
                    {
                        Voices.map((voice, index) => (<option key={voice + index} value={index}>{voice.name}</option>))
                    }
                </select>
            </div>
        </div>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);

