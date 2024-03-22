const formElement = document.getElementById('form');
const textAreaElement = document.getElementById('text-area');
const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');
const synth = window.speechSynthesis;

function welcome() {
  // voice assistant
  textAreaElement.innerHTML = "Hi, Welcome to my App! Enter your text here...";
  const utterThis = new SpeechSynthesisUtterance(`Welcome!`);
  const synth = window.speechSynthesis;
  synth.speak(utterThis);
}

window.onload = welcome;


function togglePlayStop(isPlaying) {
    if(isPlaying) {
        playButton.innerHTML = `<svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
        />
      </svg>&nbsp;Stop`
    } else {
        playButton.innerHTML = `<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
            />
          </svg>
          &nbsp;Play`
    }
}

function startSpeak(txt) {
    textAreaElement.setAttribute('disabled', true);
    const utterThis = new SpeechSynthesisUtterance(txt);
    synth.speak(utterThis);
    utterThis.onend = function() {
        textAreaElement.removeAttribute('disabled', true);
        togglePlayStop(false);
    };
}

function stopSpeak() {
    synth.cancel();
    textAreaElement.removeAttribute('disabled', true);
}

formElement.addEventListener('submit', function(e) {
    e.preventDefault();
})

textAreaElement.addEventListener('keyup', function(e) {
  if(!e.target.value) {
    playButton.setAttribute('disabled', true);
  } else {
    playButton.removeAttribute('disabled', true);
  }
});
textAreaElement.addEventListener('paste', function() {
    playButton.removeAttribute('disabled', true);
});
// Play
playButton.addEventListener('click', function() {
    const txt = textAreaElement.value;
    if(synth.speaking) {
        stopSpeak();
    } else {
        startSpeak(txt);
    }
    togglePlayStop(synth.speaking)
});
// Stop
// stopButton.addEventListener('click', function() {
//     const txt = textAreaElement.value;
//     textAreaElement.removeAttribute('disabled', true);
//     speakOnClick(txt);
// });
