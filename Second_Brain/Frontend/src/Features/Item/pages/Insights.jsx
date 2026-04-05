import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Navbar from "../components/Navbar";
import useItem from "../hooks/useItem";
import "../styles/dashboard.css"; // Reuse TN glows 
import "../styles/insights.css";

const Insights = () => {
  const containerRef = useRef(null);
  const { items, loading, handleGetItems } = useItem();

  const [stats, setStats] = useState([
    { label: "TOTAL SAVED", value: "0", icon: "◵", color: "#f5a623", glow: "rgba(245, 166, 35, 0.15)" },
    { label: "AI PROCESSED", value: "0", icon: "⚡", color: "var(--acid)", glow: "rgba(199, 243, 0, 0.15)" },
    { label: "VIEWS (TOTAL)", value: "0", icon: "♡", color: "#ff2a4d", glow: "rgba(255, 42, 77, 0.15)" },
    { label: "TAGS USED", value: "0", icon: "🏷", color: "#00e5ff", glow: "rgba(0, 229, 255, 0.15)" },
  ]);
  const [topTags, setTopTags] = useState([]);
  const [activityData, setActivityData] = useState(Array(84).fill(0));
  const [chartPath, setChartPath] = useState("M0,200 L800,200");
  const [chartAreaPath, setChartAreaPath] = useState("M0,200 L800,200 Z");
  const [chartLabels, setChartLabels] = useState(["", "", "", "", ""]);
  const [donutData, setDonutData] = useState({ total: 0, gradient: "conic-gradient(#333 0% 100%)", legend: [] });

  // Fetch Items
  useEffect(() => {
    handleGetItems();
  }, []);

  // Compute stats when items arrive
  useEffect(() => {
    if (!items || items.length === 0) return;

    // 1. Stat Cards
    const totalSaved = items.length;
    let aiProcessed = 0;
    let totalViews = 0;
    const allTags = [];
    const typeFreq = {};

    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const days84 = Array(84).fill(0);
    const days30 = Array(30).fill(0);

    items.forEach(item => {
      // AI insights count
      if (item.aiInsights && item.aiInsights.length > 0) aiProcessed++;
      
      // View counts map
      totalViews += (item.viewCount || 0);
      
      // Tags map
      if (item.tags) allTags.push(...item.tags);
      
      // Type freq
      const tType = item.type || "other";
      typeFreq[tType] = (typeFreq[tType] || 0) + 1;

      // Dates
      const itemDate = new Date(item.createdAt || Date.now());
      const diffTime = Math.abs(today - itemDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 84) days84[83 - diffDays] += 1;
      if (diffDays < 30) days30[29 - diffDays] += 1;
    });

    const uniqueTagsCount = new Set(allTags).size;

    setStats([
      { label: "TOTAL SAVED", value: totalSaved.toString(), icon: "◵", color: "#f5a623", glow: "rgba(245, 166, 35, 0.15)" },
      { label: "AI PROCESSED", value: aiProcessed.toString(), icon: "⚡", color: "var(--acid)", glow: "rgba(199, 243, 0, 0.15)" },
      { label: "VIEWS (TOTAL)", value: totalViews.toString(), icon: "♡", color: "#ff2a4d", glow: "rgba(255, 42, 77, 0.15)" },
      { label: "TAGS USED", value: uniqueTagsCount.toString(), icon: "🏷", color: "#00e5ff", glow: "rgba(0, 229, 255, 0.15)" },
    ]);

    // 2. Top Tags
    const tagFreq = {};
    allTags.forEach(t => { tagFreq[t] = (tagFreq[t] || 0) + 1 });
    const sortedTags = Object.entries(tagFreq).sort((a,b) => b[1] - a[1]).slice(0, 4);
    const maxTagCount = sortedTags[0]?.[1] || 1;
    setTopTags(sortedTags.map(([name, count]) => ({
      name, count, pct: Math.round((count / maxTagCount) * 100)
    })));

    // 3. Activity Graph (84 days max intensity)
    const maxActivity = Math.max(...days84, 1);
    const activityLevels = days84.map(count => {
      if (count === 0) return 0;
      const ratio = count / maxActivity;
      if (ratio > 0.6) return 3;
      if (ratio > 0.3) return 2;
      return 1;
    });
    setActivityData(activityLevels);

    // 4. Content Mix (Doughnut)
    let currentPct = 0;
    const typeColors = { article: "#00e5ff", youtube: "#ff2a4d", tweet: "#1da1f2", other: "var(--acid)", note: "#a78bfa", pdf: "#f5a623" };
    let gradientParts = [];
    let legendArr = [];
    
    Object.entries(typeFreq).sort((a,b) => b[1] - a[1]).forEach(([type, count]) => {
      if (count === 0) return;
      const pct = (count / totalSaved) * 100;
      const color = typeColors[type] || typeColors.other;
      gradientParts.push(`${color} ${currentPct}% ${currentPct + pct}%`);
      legendArr.push({ type, count, pct: Math.round(pct), color });
      currentPct += pct;
    });
    
    setDonutData({
      total: totalSaved,
      gradient: gradientParts.length > 0 ? `conic-gradient(${gradientParts.join(', ')})` : "conic-gradient(#333 0% 100%)",
      legend: legendArr.slice(0, 3)
    });

    // 5. Saves Line Chart
    const chartWidth = 800;
    const chartHeight = 200;
    const padding = 20; 
    
    const maxSaves = Math.max(...days30, 1);
    let pathObj = "";
    const stepX = chartWidth / 29;
    
    days30.forEach((val, i) => {
      const x = i * stepX;
      const y = chartHeight - ((val / maxSaves) * (chartHeight - padding));
      if (i === 0) pathObj += `M${x},${y} `;
      else pathObj += `L${x},${y} `;
    });
    
    setChartPath(pathObj);
    setChartAreaPath(`${pathObj} L${chartWidth},${chartHeight} L0,${chartHeight} Z`);

    // Chart timeline labels
    const labels = [];
    for(let i=0; i<5; i++){
       const d = new Date();
       d.setDate(d.getDate() - (29 - Math.floor(i * (29/4))));
       labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    setChartLabels(labels);

  }, [items]);

  // GSAP Animations once data is ready
  useEffect(() => {
    if (loading || !items) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".insight-stat-card", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(".insights-panel",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(".chart-line",
         { strokeDasharray: 2000, strokeDashoffset: 2000 },
         { strokeDashoffset: 0, duration: 2.5, ease: "power2.out", delay: 0.5 }
      );
      gsap.fromTo(".chart-area",
         { opacity: 0 },
         { opacity: 1, duration: 2, delay: 0.8 }
      );
      gsap.fromTo(".tag-bar",
         { width: "0%" },
         { width: (i, el) => el.dataset.width, duration: 1.2, ease: "power3.out", delay: 0.8 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [loading, items]);

  return (
    <div className="tn-container" ref={containerRef}>
      <div className="tn-glow tn-glow--top" />
      <div className="tn-glow tn-glow--bot" />

      <Navbar />

      <main className="insights-container">
        <header className="insights-header">
          <h1 className="insights-title">
            Your <span className="insights-title-accent">Insights</span>
          </h1>
          <p className="insights-subtitle">A live view of your knowledge, patterns, and progress</p>
        </header>

        {loading && <div className="db-loading"><div className="db-spinner" /><span>Loading insights...</span></div>}

        {!loading && (
          <>
            {/* 4 Stat Cards */}
            <section className="insights-stats">
              {stats.map((s, i) => (
                <div key={i} className="insight-stat-card" style={{ "--stat-glow": s.glow }}>
                  <div className="in-stat-top">
                    <span className="in-stat-icon" style={{ color: s.color }}>{s.icon}</span>
                  </div>
                  <div className="in-stat-value">{s.value}</div>
                  <div className="in-stat-label" style={{ "--stat-color": s.color }}>{s.label}</div>
                </div>
              ))}
            </section>

            {/* First Grid Row */}
            <div className="insights-grid">
              {/* Main Chart Panel */}
              <div className="insights-panel">
                <div className="panel-header">
                  <span className="panel-icon">📊</span>
                  <span className="panel-title">Saves — Last 30 Days</span>
                </div>
                <div className="chart-container">
                  <svg className="chart-svg" viewBox="0 0 800 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--acid)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="var(--acid)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path className="chart-area" d={chartAreaPath} />
                    <path className="chart-line" d={chartPath} />
                  </svg>
                </div>
                <div className="chart-labels">
                  {chartLabels.map((lbl, i) => <span key={i}>{lbl}</span>)}
                </div>
              </div>

              {/* Doughnut Chart Panel */}
              <div className="insights-panel">
                <div className="panel-header">
                  <span className="panel-icon" style={{color: '#ff2a4d'}}>◉</span>
                  <span className="panel-title">Content Mix</span>
                </div>
                <div className="donut-container">
                  <div className="donut-chart" style={{ background: donutData.gradient }}>
                    <div className="donut-inner">
                      <span className="donut-val">{donutData.total}</span>
                      <span className="donut-label">TOTAL</span>
                    </div>
                  </div>
                  <div className="donut-legend">
                    {donutData.legend.length > 0 ? (
                      donutData.legend.map((l, i) => (
                        <span key={i}>
                          <span style={{color: l.color}}>●</span> {l.type} - {l.pct}%
                        </span>
                      ))
                    ) : (
                      <span>No detailed content yet</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Second Grid Row */}
            <div className="insights-grid">
              {/* Activity Graph Panel */}
              <div className="insights-panel">
                <div className="panel-header">
                  <span className="panel-icon" style={{color: '#f5a623'}}>⏱</span>
                  <span className="panel-title">Activity — Last 12 Weeks</span>
                </div>
                <div className="activity-grid">
                  {activityData.map((level, i) => (
                    <div key={i} className="activity-cell" data-level={level} />
                  ))}
                </div>
              </div>

              {/* Top Tags Panel */}
              <div className="insights-panel">
                <div className="panel-header">
                  <span className="panel-icon" style={{color: '#00e5ff'}}>🏷</span>
                  <span className="panel-title">Top Tags</span>
                </div>
                <div className="tags-list">
                  {topTags.length > 0 ? topTags.map((t, i) => (
                    <div key={i} className="tag-item">
                      <span className="tag-name">#{t.name || "unknown"}</span>
                      <div className="tag-bar-wrap">
                        <div className="tag-bar" data-width={`${t.pct}%`}></div>
                      </div>
                      <span className="tag-count">{t.count}</span>
                    </div>
                  )) : (
                    <span style={{color: "rgba(255,255,255,0.4)"}}>No tagged items. Add some tags!</span>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Insights;
