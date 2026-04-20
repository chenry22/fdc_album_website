'use client';
import Flashlight from "@/components/flashlight";
import RoomLabel from "@/components/roomLabel"
import TextBox from "@/components/textBox"
import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const [active, setActive] = useState<string | null>(null);

    return (
        <div className="main">
            <RoomLabel roomLabel="Lobby"/>
            <Flashlight></Flashlight>
            <TextBox activeWriter={active} resetWriter={() => setActive(null)} changeWriter={(to: string) => setActive(to)}/>

            <div className="entrance">
                <img className="background" src="/lobby.webp" onClick={() => setActive(null)}/>
                <div className="lobby-dummy interactable" onClick={() => setActive('lobby-dummy')}></div>
            </div>

            <div className="movement">
                <div className="down"><Link href='/factory'>↓</Link></div>
                <div className="left"><Link href='left-hallway'>←</Link></div>
                <div className="right">→</div>
            </div>
        </div>
  );
}
