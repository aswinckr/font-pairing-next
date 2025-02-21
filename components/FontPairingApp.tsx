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
  const [debug, setDebug] = useState<string[]>([]);

  const addDebugMessage = (message: string) => {
    setDebug((prev) => [...prev, `${new Date().toISOString()}: ${message}`]);
  };

  const generateFontPair = async () => {
    setIsLoading(true);
    setError(null);
    setDebug([]);
    addDebugMessage("Generating new font pair...");

    try {
      addDebugMessage("Making API request to /api/fonts");
      const response = await fetch("/api/fonts");
      addDebugMessage(`API Response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        addDebugMessage(`API Error: ${errorText}`);
        throw new Error(
          `Failed to fetch font pair: ${response.status} ${errorText}`
        );
      }

      const newFontPair: FontPair = await response.json();
      addDebugMessage(`Received font pair: ${JSON.stringify(newFontPair)}`);
      setFontPair(newFontPair);

      // Get the preloaded font objects
      addDebugMessage(`Loading header font: ${newFontPair.headerFont}`);
      const headerFont = getFontByName(newFontPair.headerFont);
      addDebugMessage(
        `Header font loaded: ${headerFont?.className || "no className"}`
      );

      addDebugMessage(`Loading body font: ${newFontPair.bodyFont}`);
      const bodyFont = getFontByName(newFontPair.bodyFont);
      addDebugMessage(
        `Body font loaded: ${bodyFont?.className || "no className"}`
      );

      setHeaderFontObj(headerFont);
      setBodyFontObj(bodyFont);
      addDebugMessage("Font objects updated");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to generate or load fonts";
      addDebugMessage(`Error: ${errorMessage}`);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      addDebugMessage("Font generation completed");
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
        <p>
          Header Font: {fontPair.headerFont} (className:{" "}
          {headerFontObj?.className || "none"})
        </p>
        <p>
          Body Font: {fontPair.bodyFont} (className:{" "}
          {bodyFontObj?.className || "none"})
        </p>
      </div>

      {process.env.NODE_ENV === "development" && debug.length > 0 && (
        <div className="mt-8 p-4 bg-gray-100 rounded text-xs font-mono">
          <h3 className="font-bold mb-2">Debug Log:</h3>
          {debug.map((msg, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {msg}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FontPairingApp;
