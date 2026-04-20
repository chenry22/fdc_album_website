'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TextBox(props : { activeWriter: string | null, resetWriter: any, changeWriter: any }) {
    const router = useRouter();
    const contentIndex = new Map([
        ['main-door', "It's the entrance to the factory. It doesn't look like it's locked..."],
        ['lobby-dummy', "There's a crash dummy at the front desk."],
        ['lobby-dummy-talk', '"Oh, hello! I didn\'t know people were still allowed in here... Can I do something for you?"'],
        ['hallway-door', 'Behind the doors you can hear clanking and whirring. There must be a bunch of things moving around in there. It looks like the lights are on inside too.'],
        ['dummy-kiosk', 'There\'s a kiosk labeled "Crash Dummy Designer". The screen is flashing with alluring colors, so it must still be working.'],
    ]);

    const optionsIndex = new Map([
        ['main-door', [
            { text: "Enter the factory", action: () => router.push('/factory/lobby') },
            { text: 'Keep looking around', action: () => exitTextBox() }
        ]],
        ['lobby-dummy', [
            { text: "Talk to it", action: () => {
                console.log('hi');
                props.changeWriter('lobby-dummy-talk');
            }},
            { text: 'Ignore it', action: () => exitTextBox() }
        ]],
        ['lobby-dummy-talk', [
            { text: 'What is this place?', action: () => {}},
            { text: 'What\'s your name?', action: () => {}},
        ]],
        ['hallway-door', [
            { text: 'Go inside', action: () => router.push('/factory/production-room')},
            { text: 'Keep looking around', action: () => exitTextBox()},
        ]],
        ['dummy-kiosk', [
            { text: 'Design a crash dummy', action: () => router.push('/dummy-creator')},
            { text: 'Ignore', action: () => exitTextBox()},
        ]]
    ]);

    const typewriterSpeed = 55;
    const typewriterPeriodSpeed = 300;
    const optionsSpeed = 220;

    const [showTextBox, setShowTextBox] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [textContent, setTextContent] = useState('');

    var writeFor = props.activeWriter;
    var charIndex = 0;
    const [typewriterWorker, setWorker] = useState<NodeJS.Timeout>();

    useEffect(() => {
        if (writeFor) {
            startTypewriter();
        } else {
            exitTextBox();
        }
    },[writeFor]);

    function startTypewriter() {
        setShowOptions(false);
        charIndex = 0;
        setTextContent('');
        setShowTextBox(true);

        clearTimeout(typewriterWorker);
        setWorker(setTimeout(typewrite, typewriterSpeed));
    } 
    function typewrite() {
        if (!writeFor) { return; }
        let txt = contentIndex.get(writeFor) ?? 'err';

        if (charIndex < txt.length + 1) {
            setTextContent(txt.slice(0, charIndex));
            charIndex++;
            setWorker(setTimeout(typewrite, 
                txt.charAt(charIndex - 2) === '.' ? typewriterPeriodSpeed : typewriterSpeed
            ));
        } else {
            setWorker(setTimeout(() => setShowOptions(true), optionsSpeed));
        }
    }
    function skipTypewriter() {
        if (!writeFor) { return; }
        clearTimeout(typewriterWorker);
        let txt = contentIndex.get(writeFor) ?? '';
        setTextContent(txt);
        setShowOptions(true);
    }
    function exitTextBox() {
        setShowTextBox(false);
        props.resetWriter();
    }

    return ( showTextBox ?
            <div id="text-box" onClick={() => skipTypewriter()}>
                <div id="text-box-content">{ textContent }</div>
                { showOptions ? 
                    <div id="options">
                        <div onClick={writeFor ? optionsIndex.get(writeFor)?.at(0)?.action : () => {}}
                            id="option1">{ writeFor ? optionsIndex.get(writeFor)?.at(0)?.text : '' }</div>
                        <div onClick={writeFor ? optionsIndex.get(writeFor)?.at(1)?.action : () => {}}
                            id="option2">{ writeFor ? optionsIndex.get(writeFor)?.at(1)?.text : '' }</div>
                    </div> : <></>
                }
                <div id="exit-text-box" className="interactable" onClick={() => exitTextBox()}>x</div>
            </div>
            :
            <></>
        );
}
