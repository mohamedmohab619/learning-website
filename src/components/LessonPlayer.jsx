import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

const LessonPlayer = ({ lesson, onProgressUpdate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState(null);
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      const time = video.currentTime;
      setCurrentTime(time);
      if (onProgressUpdate) {
        onProgressUpdate(time, video.duration);
      }
    };
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [onProgressUpdate]);

  useEffect(() => {
    if (showControls) {
      const timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      setControlsTimeout(timeout);
      return () => clearTimeout(timeout);
    }
  }, [showControls]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    }
  };

  const restart = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md">
      <div className="relative bg-black aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover cursor-pointer"
          poster={lesson?.thumbnail}
          onClick={togglePlay}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setShowControls(false)}
        >
          <source src={lesson?.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="mb-4 cursor-pointer" ref={progressRef} onClick={handleProgressClick}>
            <div className="w-full h-1.5 bg-white/30 rounded overflow-hidden">
              <div
                className="h-full bg-teal-500 transition-all duration-100"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center flex-wrap gap-3">
            <div className="flex items-center gap-4 flex-wrap">
              <button className="bg-transparent border-none text-white cursor-pointer p-2 rounded-md transition-colors hover:bg-white/20 flex items-center justify-center" onClick={togglePlay} aria-label="Play/Pause">
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <button className="bg-transparent border-none text-white cursor-pointer p-2 rounded-md transition-colors hover:bg-white/20 flex items-center justify-center" onClick={restart} aria-label="Restart">
                <RotateCcw size={20} />
              </button>

              <div className="flex items-center gap-2">
                <button className="bg-transparent border-none text-white cursor-pointer p-2 rounded-md transition-colors hover:bg-white/20 flex items-center justify-center" onClick={toggleMute} aria-label="Mute/Unmute">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/30 rounded outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-teal-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-teal-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer"
                  aria-label="Volume"
                />
              </div>

              <div className="text-white text-sm font-medium min-w-[100px] md:min-w-[100px]">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="bg-transparent border-none text-white cursor-pointer p-2 rounded-md transition-colors hover:bg-white/20 flex items-center justify-center" onClick={toggleFullscreen} aria-label="Fullscreen">
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {lesson && (
        <div className="p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">{lesson.title}</h2>
          <p className="text-slate-500 leading-relaxed mb-4">{lesson.description}</p>

          <div className="flex gap-6 text-sm text-slate-500 flex-wrap">
            <span className="font-medium">Duration: {lesson.duration}</span>
            <span className="font-medium">Level: {lesson.level}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonPlayer;

