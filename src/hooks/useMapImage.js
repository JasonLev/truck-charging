import { useState, useEffect } from "react";
import route1 from '../images/route1.png'
import route2 from '../images/route2.png'
import route3 from '../images/route3.png'

const IMAGES = [route2, route1, route3]

const useMapImage = urlParam => {
  const [mapImage, setMapImage] = useState("");

  useEffect(() => {
    const fetchMapImage = async urlParam => {
        setMapImage(IMAGES[urlParam - 1])
    };
    fetchMapImage(urlParam);
  }, [urlParam]);
  return mapImage;
};

export default useMapImage;
