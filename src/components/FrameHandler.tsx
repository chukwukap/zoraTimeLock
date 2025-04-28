"use client";
import { useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";

export default function FrameHandler() {
  useEffect(() => {
    // Initialize the frame
    const initializeFrame = async () => {
      try {
        // Hide splash screen when app is ready
        await sdk.actions.ready();

        // Listen for frame events
        sdk.on("frameAdded", () => {
          console.log("Frame added");
        });

        sdk.on("frameRemoved", () => {
          console.log("Frame removed");
        });

        // Handle wallet interactions
        if (sdk.wallet.ethProvider) {
          // You can use the wallet provider here
          console.log("Wallet provider available");
        }
      } catch (error) {
        console.error("Error initializing frame:", error);
      }
    };

    initializeFrame();

    // Cleanup
    return () => {
      sdk.removeAllListeners();
    };
  }, []);

  return null; // This component doesn't render anything
}
