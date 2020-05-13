import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef;
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    this.buildplayer();
  }

  componentDidUpdate() {
    this.buildplayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildplayer() {
    if (this.player || !this.props.stream) {
      return;
    }
    const { id } = this.props.match.params;
    this.player = this.props.fetchStream(id);
    // Create Video Player
    flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachedMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    const { title, description } = this.props.stream;
    return (
      <div>
        <video ref={this.videoRef} style={videoStyle} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}
let videoStyle = {
  width: "100%",
};
const mapState = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapState, { fetchStream })(StreamShow);
