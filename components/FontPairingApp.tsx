"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NextFont } from "@next/font";
import { getFontByName } from "@/lib/fonts";

interface FontPair {
  headerFont: string;
  bodyFont: string;
}

const FontPairingApp = () => {
  const [fontPair, setFontPair] = useState<FontPair>({
    headerFont: "Inter",
    bodyFont: "Roboto",
  });
  const [headerFontObj, setHeaderFontObj] = useState<NextFont | null>(null);
  const [bodyFontObj, setBodyFontObj] = useState<NextFont | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateFontPair = async () => {
    setIsLoading(true);
    setError(null);
    console.log("Generating new font pair...");

    try {
      console.log("Making API request to /api/fonts");
      const response = await fetch("/api/fonts");
      console.log("API Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(
          `Failed to fetch font pair: ${response.status} ${errorText}`
        );
      }

      const newFontPair: FontPair = await response.json();
      console.log("Received font pair:", newFontPair);
      setFontPair(newFontPair);

      // Get the preloaded font objects
      const headerFont = getFontByName(newFontPair.headerFont);
      const bodyFont = getFontByName(newFontPair.bodyFont);

      setHeaderFontObj(headerFont);
      setBodyFontObj(bodyFont);
    } catch (error) {
      console.error("Detailed error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to generate or load fonts. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateFontPair();
  }, []);

  return (
    <div className="w-full max-w-2xl">
      <Button onClick={generateFontPair} className="mb-8" disabled={isLoading}>
        {isLoading ? "Loading..." : "Generate New Pair"}
      </Button>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className={`${headerFontObj?.className || ""} text-3xl mb-4`}>
          {fontPair.headerFont}: The quick brown fox jumps over the lazy dog
        </h2>
        <p className={`${bodyFontObj?.className || ""} text-lg`}>
          {fontPair.bodyFont}: Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>Header Font: {fontPair.headerFont}</p>
        <p>Body Font: {fontPair.bodyFont}</p>
      </div>
    </div>
  );
};

export default FontPairingApp;
