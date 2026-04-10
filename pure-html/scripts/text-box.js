const contentIndex = {
    'main-door' : ["It's the entrance to the factory. It doesn't look like it's locked... "],
    'lobby-dummy' : ["There's a crash dummy at the front desk."]
};
const optionsIndex = {
    'main-door' : [
        { text: "Enter the factory", action: () => window.open('lobby.html', '_self') },
        { text: 'Keep looking around', action: () => exitTextBox() }
    ],
    'lobby-dummy' : [
        { text: "Talk to it", action: () => {} },
        { text: 'Ignore it', action: () => exitTextBox() }
    ]
}
const typewriterSpeed = 55;
const typewriterPeriodSpeed = 200;
const optionsSpeed = 220;

var typewriterWorker = 0;
var textFor = '';
var textNum = 0;
var charIndex = 0;

function startTypewriter(textFor) {
    document.getElementById('options').classList.add('hidden');
    this.textFor = textFor;
    textNum = 0;
    charIndex = 0;
    document.getElementById("text-box-content").textContent = '';
    document.getElementById("text-box").classList.remove('hidden');

    clearTimeout(typewriterWorker);
    typewriterWorker = setTimeout(typewrite, typewriterSpeed);
} 
function typewrite() {
    let txt = contentIndex[textFor][textNum];
    if (charIndex < txt.length) {
        document.getElementById("text-box-content").textContent += txt.charAt(charIndex++);
        typewriterWorker = setTimeout(typewrite, 
            txt.charAt(charIndex - 1) === '.' ? typewriterPeriodSpeed : typewriterSpeed
        );
    } else {
        typewriterWorker = setTimeout(loadOptions, optionsSpeed);
    }
}
function skipTypewriter() {
    clearTimeout(typewriterWorker);
    document.getElementById("text-box-content").textContent = contentIndex[textFor][textNum];
    loadOptions();
}
function loadOptions() {
    document.getElementById('option1').innerText = optionsIndex[textFor][0].text;
    document.getElementById('option1').onclick = optionsIndex[textFor][0].action;
    document.getElementById('option2').innerText = optionsIndex[textFor][1].text;
    document.getElementById('option2').onclick = optionsIndex[textFor][1].action;
    document.getElementById('options').classList.remove('hidden');
}
function exitTextBox() {
     document.getElementById("text-box").classList.add('hidden');
}