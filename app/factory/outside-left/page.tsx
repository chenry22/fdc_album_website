'use client';

import RoomLabel from "@/components/roomLabel"
import TextBox from "@/components/textBox"
import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div className="main">
            <RoomLabel roomLabel="Outside (L)"/>
            <TextBox activeWriter={active} resetWriter={() => setActive(null)} changeWriter={() => {}} />

            <div className="entrance">
                <img className="background" src="/outside-side.jpg"/>
            </div>

            <div className="movement">
                <div className="right"><Link href='/factory'>→</Link></div>
            </div>
    </div>
  );
}