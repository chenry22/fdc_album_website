'use client';
export default function TextBox() {
    let textFor = '';

    function skipTypewriter() {

    }
    function exitTextBox() {

    }

    return (
        <div id="text-box" className="hidden" onClick={() => skipTypewriter()}>
            <div id="text-box-content"></div>
            <div id="options">
                <div id="option1"></div>
                <div id="option2"></div>
            </div>
            <div id="exit-text-box" className="interactable" onClick={() => exitTextBox()}>x</div>
        </div>
    );
}
