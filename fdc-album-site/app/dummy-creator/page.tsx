'use client';
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useRef, useState } from "react";

export default function Home() {
    interface DrawLine {
        pts : { x : number, y : number }[],
        color: string, strokeWidth: number,
    };

    const router = useRouter();
    const [designing, setDesigning] = useState(false);
    const [confirmText, setConfirmText] = useState<string | null>(null);
    const [confirmAction, setConfirmAction] = useState(() => () => {});

    const canvasRef = useRef<null | HTMLCanvasElement>(null);
    var ctx : CanvasRenderingContext2D, rect: DOMRect;
    var drawMode = false;
    var strokeWidth = 5;
    const color= useRef('#000000');

    var lines : DrawLine[] = [];
    var currStroke: any[] = [];

    function startStroke(x : number, y : number) {
        console.log(lines)
        if (!canvasRef.current) { return; }
        ctx = canvasRef.current.getContext('2d') ?? new CanvasRenderingContext2D();
        rect = canvasRef.current.getBoundingClientRect();
        drawMode = true;
        ctx.lineWidth = strokeWidth;
        ctx.lineCap = "round";
        ctx.strokeStyle = color.current;
        console.log(color)
        ctx.beginPath();

        currStroke = [{ x : x - rect.left, y : y - rect.top }];
    }  
    function canvasDraw(x : number, y : number) {
        if (!drawMode) { return; }
        ctx.lineTo(currStroke[currStroke.length - 1].x, currStroke[currStroke.length - 1].y);
        currStroke.push({ x : x - rect.left, y : y - rect.top });
        ctx.stroke();
    }
    function endStroke() {
        if (drawMode) {
            lines.push({ strokeWidth, color: color.current, pts : currStroke });
        }
        drawMode = false;
    }

    function undoStroke(){
        if (!canvasRef.current) { return; }
        lines.splice(-1, 1);

        ctx.clearRect(0, 0, canvasRef.current.width,canvasRef.current.height);
        lines.forEach(line => {
            ctx.lineWidth = line.strokeWidth;
            ctx.lineCap = "round";
            ctx.strokeStyle = line.color;
            ctx.beginPath();
            ctx.moveTo(line.pts[0].x, line.pts[0].y);  
            for (let i = 1; i < line.pts.length; i++){
                ctx.lineTo(line.pts[i].x,line.pts[i].y); 
            }
            ctx.stroke();
        })
    }

    useEffect(() => {
        if (!canvasRef.current) { return; }
        canvasRef.current.width = window.innerWidth * 0.9;
        canvasRef.current.height = window.innerHeight * 0.75;

        window.addEventListener('resize', () => {
            if (!canvasRef.current) { return; }
            canvasRef.current.width = window.innerWidth * 0.9;
            canvasRef.current.height = window.innerHeight * 0.75;
        });
    }, []);

    function startDesigning() {
        if (!canvasRef.current) { return; }
        setDesigning(true);
        canvasRef.current.width = window.innerWidth * 0.9;
        canvasRef.current.height = window.innerHeight * 0.75;
    }

    function initConfirmation(txt: string | null, action: any) {
        setConfirmAction(() => () => action());
        setConfirmText(txt);
    }
    function cancelAction() {
        setConfirmText(null);
        setConfirmAction(() => {});
    }

    return (
        <div className="dummy-creator">
            <div className="back-button" onClick={() => {
                designing ? 
                    initConfirmation("Are you sure you want to exit? Your current design will be lost.", () => router.push('/factory/production-room')) 
                    : router.push('/factory/production-room')
                }}>← Exit</div>
            <h1>Crash Dummy Designer</h1>

            { !designing && 
                <>
                    <p>Here at The Factory, we are constantly looking to innovate and take humans out of the picture. Design a new crash dummy and we'll be sure to put it to use!</p>
                    <div className='dummy-create-button' onClick={startDesigning}>CREATE YOUR OWN CRASH DUMMY</div>
                </>
            }

            { designing && 
                <>
                <div className="dummy-controls">
                    <button onClick={undoStroke}>undo</button>
                    <input onChange={ e => color.current = e.target.value } type="color"/>
                    <input onChange={ e => strokeWidth = parseInt(e.target.value) }
                        type="range" min={1} step={1} max={30}/>
                </div>

                <div className="completion-button">* FINISH *</div>
                </>
            }
                
            <canvas id="dummy-creator-canvas" className={ designing ? "" : 'hidden' }
                onMouseMove={e => canvasDraw(e.clientX, e.clientY)} onMouseDown={e => startStroke(e.clientX, e.clientY)} 
                onMouseUp={endStroke} onMouseLeave={endStroke}
                ref={canvasRef}/>

            { confirmText && 
                <div className="confirm-bg" onClick={cancelAction}>
                    <div className="confirm-text">
                        { confirmText }
                        <div className="confirm-options">
                            <div className='confirm-option' onClick={confirmAction}>Confirm</div>
                            <div className="cancel-option">Cancel</div>
                        </div>
                        <div className="cancel-option-x">x</div>
                    </div>
                </div>
            }
        </div>
  );
}