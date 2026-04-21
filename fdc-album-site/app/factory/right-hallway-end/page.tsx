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
            <RoomLabel roomLabel="Hallway (R)"/>
            <Flashlight></Flashlight>
            <TextBox activeWriter={active} resetWriter={() => setActive(null)} changeWriter={(to: string) => setActive(to)} />

            <div className="entrance">
                <img className="background" src="/hallway-door.avif"/>
                <div className="main-door interactable" onClick={() => setActive('hallway-door')}></div>
            </div>

            <div className="movement">
                <div className="down"><Link href='right-hallway'>↓</Link></div>
            </div>
        </div>
  );
}