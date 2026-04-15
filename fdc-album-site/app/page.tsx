import RoomLabel from "@/components/roomLabel"
import Link from "next/link";

export default function Home() {
  return (
    <div className="main">
      <RoomLabel roomLabel="Outside the factory"/>

      <div className="background">
          <img className="factory" src="/outside-factory.jpg"/>
      </div>

      <div className="foreground">
          <img className="gate interactable" src="/front-gate.png"/>
          <div className="about button">?</div>
          <div className="enter button"><Link href="/factory">Approach the Factory</Link></div>
      </div>
    </div>
  );
}
