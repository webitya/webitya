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
  const [loadingStates, setLoadingStates] = useState(videos.map(() => true));
  const [errorStates, setErrorStates] = useState(videos.map(() => false));

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

  const handleLoaded = (index) => {
    // Force loading to stay visible for 2 seconds
    setTimeout(() => {
      setLoadingStates((prev) => {
        const updated = [...prev];
        updated[index] = false;
        return updated;
      });
    }, 3500);
  };

  const handleError = (index) => {
    setErrorStates((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  return (
    <div className="pb-14 px-4 bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] py-10 rounded-t-3xl shadow-inner">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-slate-800 mb-2">Influencer Reels</h2>
        <p className="text-slate-500 text-sm">Preview how creators perform</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {videos.map((src, index) => (
          <motion.div
            key={index}
            data-index={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl shadow-lg !bg-white backdrop-blur-xl border border-white/20 p-1 flex flex-col items-center w-full sm:w-[48%] md:w-[30%] max-w-[330px] aspect-[7/13]"
          >
            {/* Loading Spinner */}
            {loadingStates[index] && !errorStates[index] && (
              <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl">
                <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin"
                  style={{
                    borderColor: "#833ab4 #fd1d1d #fcb045 transparent",
                  }}
                />
                <p className="mt-2 text-sm text-slate-600">Loading...</p>
              </div>
            )}

            {/* Error fallback */}
            {errorStates[index] && (
              <div className="flex items-center justify-center w-full h-full text-red-500 text-sm font-semibold bg-slate-100 rounded-2xl p-4">
                Failed to load video
              </div>
            )}

            {/* Video */}
            {!errorStates[index] && (
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={src}
                className={`w-full h-auto object-cover rounded-2xl ${
                  loadingStates[index] ? "hidden" : "block"
                }`}
                muted={mutedStates[index]}
                controls={false}
                playsInline
                preload="metadata"
                data-index={index}
                onClick={() => togglePlay(index)}
                onTimeUpdate={() => handleTimeUpdate(index)}
                onEnded={() => handleEnded(index)}
                onLoadedData={() => handleLoaded(index)}
                onError={() => handleError(index)}
              />
            )}

            {/* Controls */}
            {!loadingStates[index] && !errorStates[index] && (
              <>
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-white/30 via-transparent to-transparent rounded-2xl">
                  <button
                    onClick={() => togglePlay(index)}
                    className="bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-lg w-10 h-10 flex items-center justify-center shadow-lg backdrop-blur-md hover:scale-105 transition"
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

                <button
                  onClick={() => toggleMute(index)}
                  className="absolute top-3 right-3 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-md w-8 h-8 flex items-center justify-center hover:opacity-90 transition duration-200 shadow-md"
                >
                  {mutedStates[index] ? (
                    <VolumeOff fontSize="small" />
                  ) : (
                    <VolumeUp fontSize="small" />
                  )}
                </button>

                <div className="absolute bottom-6 left-1/2 transform min-w-[180px] -translate-x-1/2 px-4 py-1 bg-white/90 backdrop-blur-md rounded-lg shadow-sm flex items-center gap-2 text-xs text-slate-700">
                  <span>Powered by</span>
                  <a href="/" className="block">
                    <img
                      src="/brand/logo1.png"
                      alt="Webitya Logo"
                      className="w-[70px] h-[22px] object-contain cursor-pointer"
                    />
                  </a>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-white">
                  <div
                    className="h-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] transition-all duration-200"
                    style={{ width: `${progress[index]}%` }}
                  />
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InfluencerVideosSection;
