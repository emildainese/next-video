import { VIEDO_SIZE_THRESHOLD_MB } from "@/constants/file";
import { DELAY_4S_MS } from "@/constants/time";
import { useSession } from "next-auth/client";
import { useState, useRef, useEffect, useCallback } from "react";

// TODO Clean up....
export const useFileReader = (data) => {
  const { videoDetails, setVideoDetails } = data;
  const [previewProgress, setPreviewProgress] = useState(0);
  const [loadPreview, setLoadPreview] = useState(false);
  const videoTagRef = useRef(null);
  const videoSrcRef = useRef(null);
  const [user] = useSession();

  const fileChangeHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = function (e) {
        const fileSrc = reader.result;
        setVideoDetails({
          ...videoDetails,
          fileName: file.name,
          fileSize: `${(file.size * 1e-6).toFixed(2)} MB`,
          fileType: file.type,
          uploadedBy: user && user.user && user.user.name,
          videoSrc: fileSrc,
          video: file,
        });
        videoSrcRef.current.src = fileSrc;
        videoTagRef.current.load();
        const timer = setTimeout(() => {
          setLoadPreview(false);
          setPreviewProgress(0);
          clearTimeout(timer);
        }, DELAY_4S_MS);
      };

      if (file) reader.readAsDataURL(file);

      reader.onloadstart = (e) => {
        if ((e.total * 1e-6).toFixed(2) > VIEDO_SIZE_THRESHOLD_MB) {
          setLoadPreview(true);
        }
      };

      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          if ((e.total * 1e-6).toFixed(2) > VIEDO_SIZE_THRESHOLD_MB) {
            const loaded = Math.round((e.loaded / e.total) * 100);
            setPreviewProgress(loaded);
          }
        }
      };

      reader.onerror = function () {
        setError(`Fail to read the file, ${reader.error}`);
      };
    }
  };

  const loadMetadataHandler = useCallback(
    (e) => {
      setVideoDetails({
        ...videoDetails,
        width: videoTagRef.current.videoWidth,
        height: videoTagRef.current.videoHeight,
      });
    },
    [videoDetails]
  );

  useEffect(() => {
    if (!videoTagRef.current) return;
    videoTagRef.current.addEventListener("loadedmetadata", loadMetadataHandler);
    return () => {
      if (videoTagRef.current)
        videoTagRef.current.removeEventListener(
          "loadedmetadata",
          loadMetadataHandler
        );
    };
  }, [videoDetails.videoSrc, videoTagRef]);

  return {
    fileChangeHandler,
    videoTagRef,
    videoSrcRef,
    previewProgress,
    loadPreview,
  };
};
