'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TextBox(props : { activeWriter: string | null, resetWriter: any }) {
    const router = useRouter();
    const contentIndex = new Map([
        ['main-door', ["It's the entrance to the factory. It doesn't look like it's locked... "]],
        ['lobby-dummy', ["There's a crash dummy at the front desk."]]
    ]);

    const optionsIndex = new Map([
        ['main-door', [
            { text: "Enter the factory", action: () => router.push('/factory/lobby') },
            { text: 'Keep looking around', action: () => exitTextBox() }
        ]],
        ['lobby-dummy', [
            { text: "Talk to it", action: () => {} },
            { text: 'Ignore it', action: () => exitTextBox() }
        ]]
    ]);

    const typewriterSpeed = 55;
    const typewriterPeriodSpeed = 300;
    const optionsSpeed = 220;

    const [showTextBox, setShowTextBox] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [textContent, setTextContent] = useState('');
    const writeFor = props.activeWriter;
    var textNum = 0;
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
        textNum = 0;
        charIndex = 0;
        setTextContent('');
        setShowTextBox(true);

        clearTimeout(typewriterWorker);
        setWorker(setTimeout(typewrite, typewriterSpeed));
    } 
    function typewrite() {
        if (!writeFor) { return; }
        let txt = contentIndex.get(writeFor)?.at(textNum) ?? 'err';

        if (charIndex < txt.length) {
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
        let txt = contentIndex.get(writeFor)?.at(textNum) ?? '';
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
                        <div onClick={ writeFor ? optionsIndex.get(writeFor)?.at(0)?.action : () => {} }
                            id="option1">{ writeFor ? optionsIndex.get(writeFor)?.at(0)?.text : '' }</div>
                        <div onClick={ writeFor ? optionsIndex.get(writeFor)?.at(1)?.action : () => {} }
                            id="option2">{ writeFor ? optionsIndex.get(writeFor)?.at(1)?.text : '' }</div>
                    </div> : <></>
                }
                <div id="exit-text-box" className="interactable" onClick={() => exitTextBox()}>x</div>
            </div>
            :
            <></>
        );
}
