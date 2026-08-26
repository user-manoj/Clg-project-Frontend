import { useEffect, useState } from "react";
import axios from "axios";

const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api").replace(/\/api\/?$/, "");
const PLACEHOLDER = "https://picsum.photos/seed/placeholder/300/300";

// A plain <img src="..."> can't attach an Authorization header, but the
// backend requires a valid JWT for every endpoint now — including static
// files like faculty photos (SecurityConfig's anyRequest().authenticated()).
// So we fetch the image ourselves with the token attached, then hand the
// browser a local blob URL to render instead.
export default function AuthImage({ src, alt, className }) {
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    if (!src) {
      setBlobUrl(null);
      return;
    }

    let objectUrl;
    let cancelled = false;
    const isOwnBackend = src.startsWith("/") || src.startsWith(API_ORIGIN);
    const token = isOwnBackend ? localStorage.getItem("nexuscs_jwt") : null;
    const fullUrl = src.startsWith("http") ? src : `${API_ORIGIN}${src.startsWith("/") ? "" : "/"}${src}`;

    axios
      .get(fullUrl, {
        responseType: "blob",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((res) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(res.data);
        setBlobUrl(objectUrl);
      })
      .catch(() => {
        if (!cancelled) setBlobUrl(null);
      });

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);

  return <img src={blobUrl || PLACEHOLDER} alt={alt} loading="lazy" className={className} />;
}
