'use client';
import Flashlight from "@/components/flashlight";
import RoomLabel from "@/components/roomLabel"
import TextBox from "@/components/textBox"
import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const [active, setActive] = useState<string | null>(null);
    const [screen, setScreen] = useState(0); // 0 1 2 (left center right)

    return (
        <div className="main">
            <RoomLabel roomLabel="Production Room"/>
            <TextBox activeWriter={active} 
                resetWriter={() => setActive(null)} 
                changeWriter={(to: string) => setActive(to)} />

            <div className="entrance">
                <img style={{ filter: 'blur(3px)' }} className="background" src="/production.jpeg" onClick={() => setActive('hallway-door')}/>
                <img className='dummy-creation-kiosk interactable' src="/kiosk.png" onClick={() => setActive('dummy-kiosk')}></img>
            </div>

            <div className="movement">
                <div className="left"><Link href='left-hallway-end'>←</Link></div>
                <div className="right"><Link href='right-hallway-end'>→</Link></div>
                {/* staircase */}
                {/* <div className="up"><Link href=''>↑</Link></div>  */}

            </div>
        </div>
  );
}