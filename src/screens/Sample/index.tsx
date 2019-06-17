import React, { useState, useEffect } from "react";

export const Sample = () => {
  // state
  const [count, setCount] = useState(0);
  const [light, setLight] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [status, setStatus] = useState(navigator.onLine);
  const [{ latitude, longitude, speed }, setLocation] = useState({
    latitude: "",
    longitude: "",
    speed: ""
  });
  let mounted = true;

  // actions
  const increment = () => setCount(prevCount => prevCount + 1);
  const toggleLight = () => setLight(prevLight => !prevLight);
  const handleMouseMove = (e: MouseEvent) =>
    setMousePosition({ x: e.pageX, y: e.pageY });
  const handleOnline = () => setStatus(true);
  const handleOffline = () => setStatus(false);
  const handleGeolocation = (e: Position) => {
    if (!mounted) return;
    setLocation({
      latitude: processNumber(e.coords.latitude),
      longitude: processNumber(e.coords.longitude),
      speed: processNumber(e.coords.speed)
    });
  };
  const processNumber = (n: number | null): string => Number(n || 0).toFixed(4);

  // effects
  useEffect(() => {
    document.title = `${count}`;
  }, [count]);
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    navigator.geolocation.getCurrentPosition(handleGeolocation);
    const watchId = navigator.geolocation.watchPosition(handleGeolocation);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      navigator.geolocation.clearWatch(watchId);
      mounted = false;
    };
  }, []);

  // render
  return (
    <>
      <h2>counter</h2>
      <button onClick={increment}>you clicked me {count} times</button>
      <h2>toggle light</h2>
      <img
        src={`https://icon.now.sh/highlight/${light ? "fd0" : "aaa"}`}
        onClick={toggleLight}
        style={{
          height: "50px",
          width: "50px"
        }}
        alt="light-bulb"
      />
      <h2>mouse position</h2>
      <p>X position: {mousePosition.x}</p>
      <p>Y position: {mousePosition.y}</p>
      <h2>internet connection</h2>
      <p>
        You are <strong>{status ? "online" : "offline"}</strong>
      </p>
      <h2>geolocation</h2>
      <p>latitude: {latitude}</p>
      <p>longitude: {longitude}</p>
      <p>speed: {speed}</p>
    </>
  );
};
