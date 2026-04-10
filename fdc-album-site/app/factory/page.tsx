'use client';
import RoomLabel from "@/components/roomLabel"
import TextBox from "@/components/textBox"
import Link from "next/link";

export default function Home() {

    function exitTextBox() {}
    function startTypewriter(str: string) {}

    return (
        <div className="main">
            <RoomLabel roomLabel="Main exterior"/>
            <TextBox  />

            <div className="entrance">
                <img className="background" src="outisde-entrance.jpg" onClick={() => exitTextBox()}/>
                <div className="main-door interactable" onClick={() => startTypewriter('main-door')}></div>
            </div>

            <div className="movement">
                <div className="down"><Link href='/'>↓</Link></div>
                <div className="left"><Link href='/exterior-left'>←</Link></div>
                <div className="right">→</div>
            </div>
        </div>
  );
}
