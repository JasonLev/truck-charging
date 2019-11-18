import { useState, useEffect } from "react";
import axios from "axios";

const useLegTimes = urlVal => {
  const [legTimes, setLegTimes] = useState("");

  useEffect(() => {
    const fetchlegTimes = async urlVal => {
        let url;
        const baseUrl = `https://cors-anywhere.herokuapp.com/http://34.94.125.194:8000/api/route${urlVal}/data/`;
        if (urlVal) {
          url = baseUrl;
        }
        try {
          const response = await axios.get(url);
          setLegTimes(response.data);
        } catch (error) {
          setLegTimes("");
        }
    };
    fetchlegTimes(urlVal);
  }, [urlVal]);
  return legTimes;
};

export default useLegTimes;
