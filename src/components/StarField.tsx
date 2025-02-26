import React from "react";

const StarField: React.FC = () => {
  const createStars = () => {
    const stars = [];
    for (let i = 0; i < 200; i++) {
      const style = {
        "--duration": `${Math.random() * 3 + 2}s`,
        "--delay": `${Math.random() * 2}s`,
        "--opacity": Math.random() * 0.7 + 0.3,
        "--rotate": `${Math.random() * 360}deg`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      } as React.CSSProperties;

      stars.push(<div key={i} className="star" style={style} />);
    }
    return stars;
  };

  return <div className="star-field">{createStars()}</div>;
};

export default StarField;
