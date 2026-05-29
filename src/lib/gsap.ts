"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    useGSAP,
    SplitText,
    ScrambleTextPlugin,
    MorphSVGPlugin,
  );
}

export { gsap, ScrollTrigger, useGSAP, SplitText, ScrambleTextPlugin, MorphSVGPlugin };
