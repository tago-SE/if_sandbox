import React from "react";

interface ArticleImageProps {
  imgSrc?: string;
  variant?: "" | "lifestyle";
  alt?: string;
  containerStyle?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
}

export const ArticleImage: React.FC<ArticleImageProps> = ({
  imgSrc = "",
  variant = "lifestyle",
  alt = "",
  imageStyle,
  containerStyle: imageContainerStyle
}) => {
  return (
    <span
      className={`if image ${variant}`}
      style={imageContainerStyle}
    >
      <img
        alt={alt}
        src={`${imgSrc}`}
        className="if"
        style={imageStyle}
      />
    </span>
  );
};

export default ArticleImage;
