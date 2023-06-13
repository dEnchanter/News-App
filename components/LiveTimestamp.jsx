import TimeAgo from "react-timeago";

function LiveTimestamp({ time }) {
  return (
    <TimeAgo date={time} />
  )
}

export default LiveTimestamp;