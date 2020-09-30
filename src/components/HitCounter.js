import React from "react";
import RetroHitCounter from "react-retro-hit-counter";

const HitCounter = ({ slug }) => {
  const [hits, setHits] = React.useState(undefined);

  React.useEffect(() => {
    // Invoke the function by making a request.
    fetch(`/api/register-hit?slug=${slug}`)
      .then((res) => res.json())
      .then((json) => {
        if (typeof json.hits === "number") {
          setHits(json.hits);
        }
      });
  }, [slug]);

  if (typeof hits === "undefined") {
    return null;
  }

  return <RetroHitCounter hits={hits} />;
};

export default HitCounter;
