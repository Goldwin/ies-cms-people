"use client";
import { useEffect, useRef } from "react";

const security = {
  paper_size: [288, 166.5],
  margin: [0, 0, 0, 0],
  objects: [
    {
      type: "text",
      name: "Current Date",
      color: "#000000",
      background: null,
      font: "Lato",
      styles: [],
      overflow: "shrink_to_fit",
      align: "center",
      valign: "center",
      vertical: false,
      at: [21.95, 9.75],
      width: 248.2,
      height: 26.6,
      size: 24,
    },
    {
      type: "text",
      name: "Security Code",
      color: "#ffffff",
      background: "#000000",
      font: "Lato",
      styles: ["bold"],
      overflow: "truncate",
      align: "center",
      valign: "center",
      vertical: false,
      at: [17.3, 52.15],
      width: 253.2,
      height: 62.65,
      size: 36,
    },
    {
      at: [34.56, 100.875],
      width: 218.88,
      height: 31.21875,
      type: "text",
      align: "center",
      color: "#000000",
      size: 48,
      valign: "bottom",
      vertical: false,
      styles: ["bold"],
      padding: 2,
      overflow: "shrink_to_fit_and_wrap",
      rotate: 0,
      name: "Numbers with Names",
    },
  ],
  orientation: "landscape",
};

const adult = {
  paper_size: [288, 166.5],
  margin: [0, 0, 0, 0],
  objects: [
    {
      type: "text",
      name: "Kind",
      color: "#ffffff",
      styles: ["bold"],
      size: 20,
      at: [11.52, 127.875],
      width: 261.09999999999974,
      height: 25.699999999999925,
      overflow: "truncate",
      align: "left",
      valign: "top",
      rotate: 0,
      background: "#000000",
    },
    {
      type: "text",
      name: "First Name",
      color: "#000000",
      styles: ["bold"],
      size: 48,
      at: [13.03999999999997, 17.40625],
      width: 266.25,
      height: 62.849999999999994,
      overflow: "shrink_to_fit_and_wrap",
      align: "left",
      valign: "center",
    },
    {
      type: "horizontal_line",
      at: [11.52, 122.875],
      width: 261.261285327139,
      stroke_color: "#000000",
      height: 2,
    },
    {
      type: "text",
      name: "Last Name",
      color: "#000000",
      styles: ["bold"],
      size: 32,
      at: [14.52, 75.65625],
      width: 145.80000000000004,
      height: 34.49999999999983,
      overflow: "shrink_to_fit",
      align: "left",
      valign: "center",
    },
  ],
};

const data = security;

const draw = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, data.paper_size[0], data.paper_size[1]);

  const x = data.objects[0];
  data.objects.forEach((x) => {
    ctx.textBaseline = "top";
    ctx.textAlign = x.align as CanvasTextAlign;

    if (x.background) {
      ctx.fillStyle = x.background;
      ctx.fillRect(x.at[0], x.at[1], x.width, x.height);
    }

    ctx.fillStyle = x.color;
    ctx.font = `${x.size}px ${x.font}`;
    ctx.fillText(x.name, x.at[0] + x.width / 2, x.at[1] + x.size / 2, x.width);
  });
};

export const LabelCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    draw(ctx);
  });
  return (
    <canvas
      className="my-10 mx-10"
      ref={canvasRef}
      width={`${data.paper_size[0]}px`}
      height={`${data.paper_size[1]}px`}
    />
  );
};
