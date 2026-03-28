"use client";
import React from "react";

export default function Landing() {
  <style>{`
        *,body,html{
        background-color: white;
        `}</style>;
  return (
    <div className="h-[200vh] w-[80%] p-20 bg-gray-100">
      <div className="max-w-8xl mx-auto bg-white h-full w-full"></div>
      <div className="fixed inset-0 h-full w-full">
        <Bars />
      </div>
    </div>
  );
}

const Bars = () => {
  const bars = new Array(50).fill(0).map((_, index) => index);

  return (
    <div className="flex flex-col gap-3 absolute top-1/2 -translate-y-1/2">
      {bars.map((bar, idx) => (
        <div key={`bar-${idx}`} className="h-px w-20 bg-neutral-400" />
      ))}
    </div>
  );
};
