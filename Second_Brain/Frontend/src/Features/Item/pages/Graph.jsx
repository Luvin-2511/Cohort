import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import Navbar from "../components/Navbar";
import useItem from "../hooks/useItem";
import "../styles/graph.css";

const TYPE_COLORS = {
  article: "#00e5ff",
  youtube: "#ff2a4d",
  tweet: "#1da1f2",
  image: "#c7f300",
  pdf: "#f5a623",
  video: "#a78bfa",
  default: "#ffffff",
};

const GraphPage = () => {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const [data, setData] = useState({ nodes: [], links: [] });
  const { handleGetGraph, loading } = useItem();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGraph = async () => {
      const res = await handleGetGraph();
      if (res && res.success) {
        setData({ nodes: res.nodes, links: res.links });
      }
    };
    fetchGraph();
  }, []);

  useEffect(() => {
    if (!data.nodes.length || loading) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Clear previous SVG
    d3.select(containerRef.current).select("svg").remove();

    const svg = d3
      .select(containerRef.current)
      .append("svg")
      .attr("class", "graph-svg")
      .attr("viewBox", [0, 0, width, height]);

    const g = svg.append("g");

    svg.call(
      d3.zoom()
        .extent([[0, 0], [width, height]])
        .scaleExtent([0.1, 4])
        .on("zoom", (e) => {
          g.attr("transform", e.transform);
        })
    );

    const nodes = data.nodes.map(d => ({ ...d }));
    const links = data.links.map(d => ({ ...d }));

    const simulation = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(30));

    const link = g
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("class", "link");

    const node = g
      .append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("class", "node")
      .call(
        d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    node
      .append("circle")
      .attr("r", 8)
      .attr("fill", d => TYPE_COLORS[d.type] || TYPE_COLORS.default)
      .on("mouseover", (event, d) => {
        const tooltip = tooltipRef.current;
        tooltip.style.opacity = 1;
        tooltip.innerHTML = `<span class="gt-type">${d.type}</span><br/><strong>${d.title || 'Untitled'}</strong>`;
      })
      .on("mousemove", (event) => {
        const tooltip = tooltipRef.current;
        tooltip.style.left = event.pageX + 15 + "px";
        tooltip.style.top = event.pageY + 15 + "px";
      })
      .on("mouseout", () => {
        tooltipRef.current.style.opacity = 0;
      })
      .on("click", (event, d) => {
        navigate(`/item/${d.id}`);
      });

    node
      .append("text")
      .attr("dx", 12)
      .attr("dy", 4)
      .text(d => (d.title && d.title.length > 20 ? d.title.substring(0, 20) + "..." : d.title));

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data, loading, navigate]);

  return (
    <div className="graph-page">
      <Navbar />
      
      <main className="graph-main">
        <div className="graph-overlay">
          <h1 className="graph-title">Knowledge Graph</h1>
          <p className="graph-subtitle">Visual connection mapping based on AI embeddings</p>
        </div>

        {loading && (
          <div className="graph-loading">
            <span className="db-spinner" style={{ borderColor: 'var(--acid)', borderTopColor: 'transparent', width: '40px', height: '40px' }} />
            <p>Mapping neural links...</p>
          </div>
        )}

        <div className="graph-container" ref={containerRef} />
        
        <div className="graph-tooltip" ref={tooltipRef} />
      </main>
    </div>
  );
};

export default GraphPage;
