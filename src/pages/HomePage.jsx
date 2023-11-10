import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiErrorAlt } from "react-icons/bi";
import { BsCloudDrizzleFill, BsCloudHaze2Fill, BsEye, BsThermometer, BsWater, BsWind } from "react-icons/bs";
import { ImSpinner8 } from "react-icons/im";
import { IoMdCloudy, IoMdRainy, IoMdSearch, IoMdSnow, IoMdSunny, IoMdThunderstorm } from "react-icons/io";
import { TbTemperatureCelsius } from "react-icons/tb";

const APIkey = import.meta.env.VITE_API_KEY;
const APIurl = import.meta.env.VITE_BASE_URL;
function HomePage() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Jakarta");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inputValue !== "") {
      setLocation(inputValue);
    }
    const input = document.querySelector("input");

    if (input.value === "") {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    input.value = "";

    e.preventDefault();
  };

  useEffect(() => {
    setLoading(true);

    const url = `${APIurl}/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  if (!data) {
    return (
      <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center">
        <div>
          <ImSpinner8 className="text-4xl animate-spin text-white" />
        </div>
      </div>
    );
  }

  let icon;

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-yellow-400" />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-blue-400" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-blue-400" />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill className="text-blue-400" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-blue-400" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm className="text-blue-400" />;
      break;
  }

  const date = new Date();

  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      {errorMsg && (
        <div className="w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c] text-white font-raleway absolute top-2 lg:top-5 p-4 capitalize rounded-md">
          <BiErrorAlt className="inline text-3xl mr-2" /> {`${errorMsg.response.data.message}`}
        </div>
      )}
      {/* form */}
      <form className={`${animate ? "animate-shake" : "animate-none"} h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8 lg:mt-[10vh]`}>
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            onChange={(e) => handleInput(e)}
            className="flex-1 bg-transparent outline-none text-white font-raleway placeholder:text-white placeholder:font-poppins text-[15px] font-light pl-6 h-full"
            type="text"
            placeholder="Enter your location... "
          />
          <button onClick={(e) => handleSubmit(e)} className="bg-[#1bc8ed] hover:bg-opacity-80 w-20 h-12 rounded-full flex justify-center items-center transition">
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      {/* card */}
      <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ImSpinner8 className="text-white text-5xl animate-spin" />
          </div>
        ) : (
          <div>
            {/* card top */}
            <div className="flex items-center gap-x-5">
              {/* icon */}
              <div className="text-[87px]">{icon}</div>
              <div>
                {/* country name */}
                <div className="text-2xl font-semibold font-poppins">
                  {data.name}, {data.sys.country}
                </div>
                {/* date */}
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
                </div>
              </div>
            </div>
            {/* card body */}
            <div className="my-20">
              <div className="flex justify-center items-center">
                {/* temp */}
                <div className="text-[144px] leading-none font-light">{parseInt(data.main.temp)}</div>
                {/* celcius */}
                <div className="text-5xl">
                  <TbTemperatureCelsius />
                </div>
              </div>
              {/* weather description */}
              <div className="capitalize text-center font-raleway">{data.weather[0].description}</div>
            </div>
            {/* card bottom */}
            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div className="font-raleway">
                    Visibility <span className="ml-2">{data.visibility / 1000} km</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex font-raleway">
                    Feels like{" "}
                    <div className="flex ml-2">
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div className="font-raleway">
                    Humidity <span className="ml-2">{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div className="font-raleway">
                    Wind <span className="ml-2">{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
