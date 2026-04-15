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
            <RoomLabel roomLabel="Hallway (L)"/>
            <Flashlight></Flashlight>
            <TextBox activeWriter={active} resetWriter={() => setActive(null)} />

            <div className="entrance">
                <img className="background" src="/hallway.jpg" onClick={() => setActive(null)}/>
            </div>

            <div className="movement">
                <div className="up"><Link href=''>↑</Link></div>
                <div className="right"><Link href='lobby'>→</Link></div>
            </div>
        </div>
  );
}