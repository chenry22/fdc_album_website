import { useEffect, useState } from "react";

export default function Flashlight() {
    const [pos, setPosition] = useState({ x: 500, y: 500 });
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handler);
        return () => {
            window.removeEventListener("mousemove", handler);
        };
    }, []);

    return (
        <div id="flashlight"
            style={{['--Xpos' as string]: pos.x + 'px', ['--Ypos' as string] : pos.y + 'px'}}>    
        </div>
    );
}
