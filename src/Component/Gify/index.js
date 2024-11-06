import { GiphyFetch } from "@giphy/js-fetch-api";
import { Gif } from "@giphy/react-components";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const giphyFetch = new GiphyFetch("CzPB3XZ6nzyxMiJGYGz6Z3D2FaHYjn9l");

function GifyRender({ gifyName }) {
  const [gif, setGif] = useState(null);

  const handleGif = async () => {
    const { data } = await giphyFetch.gif(gifyName);
    setGif(data);
  };

  useEffect(() => {
    if (gifyName !== null) handleGif();
  }, [gifyName]);

  return gif && <Gif gif={gif} width={100} />;
}
export default GifyRender;

GifyRender.propTypes = {
  gifyName: PropTypes.string,
};
