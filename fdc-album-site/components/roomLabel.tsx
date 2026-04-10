export default function RoomLabel(props: { roomLabel: string; }) {
    let roomLabel = props.roomLabel;

    return (
        <div id="current-room">{ roomLabel }</div>
    );
}
