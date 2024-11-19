import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { WaveCreatorrWrapper } from "models/MessagerStyle";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { PauseBtn, PlayBtn } from "Utils/Image";
import WaveSurfer from "wavesurfer.js";

const WaveCreator = ({
  audioUrl,
  peaks,
  myDuration,
  currentId,
  setCurrentId,
  messageId,
}) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);

  const millisecondsToSeconds = (milliseconds) => {
    return milliseconds / 1000;
  };

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#000)",
      progressColor: "#0CAF60",
      barWidth: 4,
      barRadius: 10,
      barGap: 2,
      url: audioUrl,
      peaks: [peaks],
      height: 40,
      duration: millisecondsToSeconds(myDuration),
    });

    wavesurfer.current.on("ready", () => {
      setDuration(wavesurfer.current.getDuration());
      setIsReadyToPlay(true);
    });
    wavesurfer.current.on("audioprocess", () => {
      setCurrentTime(wavesurfer.current.getCurrentTime());
    });

    wavesurfer.current.on("finish", () => {
      wavesurfer.current.seekTo(0);
      setIsPlaying(false);
      setCurrentTime(0);
    });

    return () => {
      wavesurfer.current.destroy();
    };
  }, []);

  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      const startTime = Date.now() - currentTime * 1000;
      intervalId = setInterval(() => {
        setCurrentTime((Date.now() - startTime) / 1000);
      }, 100);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, currentTime]);

  const handlePlay = async () => {
    if (wavesurfer.current.isPlaying()) {
      wavesurfer.current.pause();
      setIsPlaying(false);
    } else {
      setIsReadyToPlay(false);
      await wavesurfer.current.play();
      setIsReadyToPlay(true);
      setCurrentId(messageId);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (currentId !== messageId) {
      wavesurfer.current?.pause();
      setIsPlaying(false);
    }
  }, [currentId, messageId]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <WaveCreatorrWrapper>
      <div className="audio-content">
        <div ref={waveformRef} />

        <div className="playPause">
          {isReadyToPlay ? (
            <div
              role="button"
              tabIndex={0} // Makes the div focusable
              onClick={handlePlay}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Space") {
                  handlePlay();
                }
              }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <img src={isPlaying ? PauseBtn : PlayBtn} alt="" />
            </div>
          ) : (
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 24,
                  }}
                  spin
                />
              }
            />
          )}
        </div>
        <div className="audioDiv" ref={waveformRef} />
        <p>{duration ? formatTime(duration - currentTime) : "N/A"}</p>
      </div>
    </WaveCreatorrWrapper>
  );
};

export default WaveCreator;

WaveCreator.propTypes = {
  audioUrl: PropTypes.string,
  peaks: PropTypes.any,
  myDuration: PropTypes.any,
  currentId: PropTypes.any,
  setCurrentId: PropTypes.func,
  messageId: PropTypes.any,
};
