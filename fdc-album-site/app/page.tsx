'use client';
import RoomLabel from "@/components/roomLabel"
import TextBox from "@/components/textBox";
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="main">
      <TextBox activeWriter={active} resetWriter={() => setActive(null)} changeWriter={(p: string) => setActive(p)}/>
      <RoomLabel roomLabel="Outside the factory"/>

      <div className="background">
          <img className="factory" src="/outside-factory.jpg"/>
      </div>

      <div className="foreground">
          <img className="gate interactable" onClick={() => setActive('gate-dummy')} src="/front-gate.png"/>
          <div className="about button" onClick={() => setShowInfo(true)}>?</div>
      </div>

      { showInfo && 
        <div className="info-screen" onClick={() => setShowInfo(false)}>
          <div className="info-box" onClick={e => e.stopPropagation()}>
            <p>This is an interactive digital experience connected to the St. Louis, MO band <a href="https://www.fourdegreescolder.com" target="_blank">Four Degrees Colder</a> and their upcoming album "Nothing To Do". Four Degrees Colder is an indie pop rock duo who have made a name for themselves through their energetic performances, synthy soundscapes, and dynamic style.<br/><br/>Their latest project is a perfect reflection of the evolution of their sound, merging the traditional bedroom pop instrumentals of their first EP <a href='https://music.apple.com/us/album/pretty-men-in-suits-ep/1718425739' target="_blank">"Pretty Men In Suits"</a> with louder, faster riffs and vivacious, lush tones.</p>

            <a href="https://www.fourdegreescolder.com" target="_blank"><div className="link-button">Find Out More</div></a>

            <div className="x-button" onClick={() => setShowInfo(false)}>x</div>
          </div>
        </div>
      }
    </div>
  );
}
