import React from "react";
import { Button } from "antd";

interface GenreButtonsProps {
  genres: string[];
}

const GenreButtons: React.FC<GenreButtonsProps> = ({ genres }) => (
  <div style={{ marginBottom: "20px", textAlign: "center" }}>
    {genres.map((genre, index) => (
      <Button key={index} type="default" style={{ marginRight: "10px" }}>
        {genre}
      </Button>
    ))}
  </div>
);

export default GenreButtons;
