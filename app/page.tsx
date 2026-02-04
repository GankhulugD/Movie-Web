"use client";
import React from "react";
import { Card } from "./components/Card";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";

export default function HomePage() {
  return (
    <div className="h-full w-full flex-col gap-4 bg-white">
      <Header />
      <Hero />
      <div className="flex gap-2 p-4">
        <Card image="./Slide 4_3 - 1.png" point={6.9} name="Dear Santa" />
        <Card
          image="./Slide 4_3 - 2.png"
          point={6.9}
          name="How To Train Your Dragon Live Action"
        />
      </div>
    </div>
  );
}
