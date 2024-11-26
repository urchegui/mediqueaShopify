/* eslint-disable react/prop-types */
import { useOutletContext } from 'react-router-dom';
import './multimedia.scss';
import { useEffect, useState } from 'react';
import { TbLoader3 } from "react-icons/tb";

const Loader = () => (
  <div className="loader">
    <TbLoader3 />
  </div>
);

const Multimedia = () => {
  const selectedOption = useOutletContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
      setLoading(false);
  }, [selectedOption]);

  const renderIframe = (url, index) => (
    <iframe
      key={index}
      style={{ borderRadius: '12px' }}
      src={url}
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );

  if (loading) {
    return <Loader />;
  }

  if (!selectedOption) {
    return <p>No content available.</p>;
  }

  return (
    <div className="multimedia-page">
        {selectedOption.items
            ? selectedOption.items.map((item, index) =>
                <div className='spotify-iframes'>
                    {renderIframe(
                        `https://open.spotify.com/embed/episode/${item.id}?utm_source=generator&theme=0`,
                        index
                    )}
                </div>
            )
            : 
            <div className='youtube-iframes'>
                {selectedOption.youtubeIframes && selectedOption.youtubeIframes.map((item, index) => renderIframe(item.url, index))}
            </div>
        }
    </div>
);
};

export default Multimedia;
