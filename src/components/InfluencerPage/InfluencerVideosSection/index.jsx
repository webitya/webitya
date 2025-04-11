"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  PlayArrow,
  Pause,
  VolumeOff,
  VolumeUp,
  Replay,
} from "@mui/icons-material";

const InfluencerVideosSection = ({ videos = [] }) => {
  const videoRefs = useRef([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [mutedStates, setMutedStates] = useState(videos.map(() => true));
  const [endedStates, setEndedStates] = useState(videos.map(() => false));
  const [progress, setProgress] = useState(videos.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          const video = videoRefs.current[index];
          if (!entry.isIntersecting && video && !video.paused) {
            video.pause();
            setPlayingIndex(null);
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video, index) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  const togglePlay = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused || video.ended) {
      videoRefs.current.forEach((v, i) => {
        if (i !== index && v) v.pause();
      });
      video.play();
      setPlayingIndex(index);
      setEndedStates((prev) =>
        prev.map((_, i) => (i === index ? false : prev[i]))
      );
    } else {
      video.pause();
      setPlayingIndex(null);
    }
  };

  const toggleMute = (index) => {
    const updated = [...mutedStates];
    updated[index] = !updated[index];
    setMutedStates(updated);
    const video = videoRefs.current[index];
    if (video) video.muted = updated[index];
  };

  const handleTimeUpdate = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      const percent = (video.currentTime / video.duration) * 100;
      const updated = [...progress];
      updated[index] = percent;
      setProgress(updated);
    }
  };

  const handleEnded = (index) => {
    setEndedStates((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
    setPlayingIndex(null);
  };

  return (
    <div className="mt-20 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800">Demo Videos</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {videos.map((src, index) => (
          <motion.div
            key={index}
            data-index={index}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
            className="relative group overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-[#fdf3f7] to-[#f0f4fd] border border-white/40 backdrop-blur-md p-1 w-[220px] flex flex-col items-center"
          >
            {/* Video Element */}
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={src}
              className="w-full h-auto object-cover rounded-xl"
              muted={mutedStates[index]}
              controls={false}
              playsInline
              preload="metadata"
              data-index={index}
              onClick={() => togglePlay(index)}
              onTimeUpdate={() => handleTimeUpdate(index)}
              onEnded={() => handleEnded(index)}
              style={{ aspectRatio: "7 / 13" }}
            />

            {/* Overlay Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent rounded-xl flex items-center justify-center">
              <button
                onClick={() => togglePlay(index)}
                className="bg-white text-black rounded-full p-3 shadow-md hover:scale-110 transition sm:opacity-0 sm:group-hover:opacity-100"
              >
                {endedStates[index] ? (
                  <Replay fontSize="small" />
                ) : playingIndex === index ? (
                  <Pause fontSize="small" />
                ) : (
                  <PlayArrow fontSize="small" />
                )}
              </button>
            </div>

            {/* Mute Button */}
            <button
              onClick={() => toggleMute(index)}
              className="absolute bottom-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition"
            >
              {mutedStates[index] ? (
                <VolumeOff fontSize="small" />
              ) : (
                <VolumeUp fontSize="small" />
              )}
            </button>

            {/* Branding - inside video container */}
        {/* Branding - centered bottom inside video container */}
        <div className="absolute bottom-2 left-[90px] transform -translate-x-1/2 px-4 py-1 bg-white rounded-md shadow-sm flex items-center gap-2 min-w-[160px] text-xs text-slate-600 z-10">
  <span className="whitespace-nowrap text-xs">Powered by</span>
  <a href="/" className="block">
    <img
      src="/brand/logo1.png"
      alt="Webitya Logo"
      className="w-[80px] h-[24px] object-contain cursor-pointer"
    />
  </a>
</div>



            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-200"
                style={{ width: `${progress[index]}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InfluencerVideosSection;
