"use client";

import * as React from "react";
import * as Recharts from "recharts";

import { cn } from "./utils";

/**
 * Themes
 */
const THEMES = {
  light: "",
  dark: ".dark",
};

/**
 * Context
 */
const ChartContext = React.createContext(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a ChartContainer");
  }
  return context;
}

/**
 * Chart Container
 */
function ChartContainer({ id, className, children, config, ...props }) {
  const reactId = React.useId();
  const chartId = `chart-${id || reactId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ id: chartId, config }}>
      <div
        data-chart={chartId}
        className={cn("relative w-full", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        {children}
      </div>
    </ChartContext.Provider>
  );
}

/**
 * Inject CSS variables for colors
 */
function ChartStyle({ id, config }) {
  const entries = Object.entries(config || {}).filter(
    ([, v]) => v?.color || v?.theme
  );

  if (!entries.length) return null;

  const css = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const vars = entries
        .map(([key, item]) => {
          const color =
            (item.theme && item.theme[theme]) || item.color;
          return color ? `  --color-${key}: ${color};` : "";
        })
        .join("\n");

      return `
${prefix} [data-chart="${id}"] {
${vars}
}
`;
    })
    .join("\n");

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

/**
 * Tooltip
 */
const ChartTooltip = Recharts.Tooltip;

function ChartTooltipContent({
  active,
  payload,
  label,
  formatter,
  hideLabel = false,
  hideIndicator = false,
  indicator = "dot",
}) {
  const { config } = useChart();

  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border bg-background p-2 text-sm shadow-md">
      {!hideLabel && (
        <div className="mb-1 font-medium text-foreground">{label}</div>
      )}

      <div className="space-y-1">
        {payload.map((item, i) => {
          const key = item.dataKey || item.name;
          const cfg = config?.[key];

          return (
            <div
              key={i}
              className="flex items-center gap-2 text-muted-foreground"
            >
              {!hideIndicator && (
                <span
                  className={cn(
                    "inline-block size-2 rounded-full",
                    indicator === "line" && "h-0.5 w-3 rounded-none",
                    indicator === "dashed" && "border border-dashed"
                  )}
                  style={{
                    backgroundColor:
                      item.color || item.payload?.fill,
                  }}
                />
              )}

              <span className="flex-1">
                {cfg?.label || item.name}
              </span>

              <span className="font-medium text-foreground">
                {formatter
                  ? formatter(item.value, item.name)
                  : item.value?.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Legend
 */
const ChartLegend = Recharts.Legend;

function ChartLegendContent({
  payload,
  className,
  hideIcon = false,
}) {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 text-sm",
        className
      )}
    >
      {payload.map((item, i) => {
        const cfg = config?.[item.dataKey];

        return (
          <div key={i} className="flex items-center gap-1.5">
            {!hideIcon && (
              <span
                className="size-3 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
            )}
            <span>{cfg?.label || item.value}</span>
          </div>
        );
      })}
    </div>
  );
}

export {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
};
