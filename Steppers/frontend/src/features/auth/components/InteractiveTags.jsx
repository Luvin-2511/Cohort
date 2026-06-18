import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import "./interactiveTags.css";

const SPAWN_LABELS = [
  { label: "SALE", sub: "GET 50% OFF" },
  { label: "HOT", sub: "LIMITED DROP" },
  { label: "NEW", sub: "JUST LANDED" },
  { label: "VIP", sub: "MEMBER CHIP" },
  { label: "COP", sub: "QUICK DROP" },
  { label: "100%", sub: "VERIFIED" },
];

export default function InteractiveTags() {
  // Click-anywhere spawned tags states
  const [spawnedTags, setSpawnedTags] = useState([]);

  // Global touch/click listener to spawn tags anywhere on screen
  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Exclude interactive form elements to avoid typing interference
      if (e.target.closest("input, button, textarea, select, a, [role='button']")) {
        return;
      }

      const clickX = e.clientX;
      const clickY = e.clientY;

      // Choose random tag contents
      const randomLabel = SPAWN_LABELS[Math.floor(Math.random() * SPAWN_LABELS.length)];

      // New tag with randomized 3D starting rotations and dramatic tumbling targets
      const newTag = {
        id: `${Date.now()}-${Math.random()}`,
        x: clickX,
        y: clickY,
        label: randomLabel.label,
        sub: randomLabel.sub,
        initRX: (Math.random() - 0.5) * 90,
        initRY: (Math.random() - 0.5) * 90,
        initRZ: (Math.random() - 0.5) * 90,
        // Tumbling spin targets
        targetRX: (Math.random() - 0.5) * 1200,
        targetRY: (Math.random() - 0.5) * 1200,
        targetRZ: (Math.random() - 0.5) * 800,
      };

      setSpawnedTags((prev) => [...prev, newTag]);
    };

    window.addEventListener("click", handleGlobalClick);
    window.addEventListener("touchstart", handleGlobalClick);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("touchstart", handleGlobalClick);
    };
  }, []);

  // Callback to animate newly spawned 3D price tags globally
  const animateNewTag = (el, tagInfo) => {
    if (!el || el.dataset.animated) return;
    el.dataset.animated = "true";

    const viewportHeight = window.innerHeight;
    const exitY = viewportHeight + 120; // drop completely off screen

    // Set starting position at cursor click coordinate in 3D space
    gsap.set(el, {
      x: tagInfo.x - 29,
      y: tagInfo.y - 15,
      rotateX: tagInfo.initRX,
      rotateY: tagInfo.initRY,
      rotateZ: tagInfo.initRZ,
      scale: 0.8,
      opacity: 0,
    });

    // Animate falling off-screen with gravity acceleration and 3D tumbling rotation
    gsap.timeline()
      .to(el, {
        opacity: 1,
        scale: 1.1,
        duration: 0.1,
        ease: "power1.out",
      })
      .to(el, {
        y: exitY,
        x: tagInfo.x - 29 + (Math.random() - 0.5) * 220, // horizontal drift
        rotateX: tagInfo.targetRX,
        rotateY: tagInfo.targetRY,
        rotateZ: tagInfo.targetRZ,
        duration: 1.6,
        ease: "power2.in", // accelerating fall
        onComplete: () => {
          // Self-destruct state update immediately when off screen
          setSpawnedTags((prev) => prev.filter((t) => t.id !== tagInfo.id));
        },
      });
  };

  return (
    <div className="global-spawned-tags-container">
      {spawnedTags.map((tag) => (
        <div
          key={tag.id}
          className="interactive-tag-body spawned-tag-3d"
          ref={(el) => animateNewTag(el, tag)}
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          <div className="tag-grommet" />
          <div className="tag-label">{tag.label}</div>
          <div className="tag-sub">{tag.sub}</div>
        </div>
      ))}
    </div>
  );
}
