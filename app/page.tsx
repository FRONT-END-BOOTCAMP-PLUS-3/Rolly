"use client";

import React from "react";
import MainButton from "@/components/MainButton";

const Page = () => {
  const handleClick = () => {
    alert("버튼이 클릭되었습니다!");
  };
  return (
    <div>
      <MainButton text="로그인" onClick={handleClick} />
    </div>
  );
};

export default Page;
