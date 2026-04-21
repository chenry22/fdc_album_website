'use client';
import RoomLabel from "@/components/roomLabel"
import TextBox from "@/components/textBox"
import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const [active, setActive] = useState<string | null>(null);

    return (
        <div className="main">
            <RoomLabel roomLabel="Main exterior"/>
            <TextBox activeWriter={active} resetWriter={() => setActive(null)} changeWriter={() => {}}/>

            <div className="entrance">
                <img className="background" src="/outisde-entrance.jpg" onClick={() => setActive(null)}/>
                <div className="main-door interactable" onClick={() => setActive('main-door')}></div>
            </div>

            <div className="movement">
                <div className="down"><Link href='/'>↓</Link></div>
                {/* <div className="left"><Link href='/factory/outside-left'>←</Link></div> */}
                {/* <div className="right">→</div> */}
            </div>
        </div>
  );
}
