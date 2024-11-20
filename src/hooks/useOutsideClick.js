import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("click outside the modal");
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing); // capturing phase
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing); // capturing phase
    },
    [handler, listenCapturing],
  );

  return ref;
}
