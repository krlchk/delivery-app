import { useEffect } from "react";
import type { ModalWindowProps } from "./types";

export const ModalWindow = ({
  isOpen,
  handleClick,
  child,
}: ModalWindowProps) => {

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <div
      onClick={handleClick}
      className={`fixed left-0 top-0 z-10 ${isOpen === true ? "flex" : "hidden"} h-screen w-full  items-center justify-center backdrop-blur-sm`}
    >
      <section
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="h-auto w-2/3 rounded-md bg-neutral-300 p-4 text-black"
      >
        {child}
      </section>
    </div>
  );
};
