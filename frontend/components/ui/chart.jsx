"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/utils/cn"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" }

const ChartContext = React.createContext(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef(
  ({ id, className, children, config, ...props }, ref) => {
    const uniqueId = React.useId()
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          data-chart={chartId}
          ref={ref}
          className={cn(
            "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
            className
          )}
          {...props}
        >
          <ChartStyle id={chartId} config={config} />
          <RechartsPrimitive.ResponsiveContainer>
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    )
  }
)
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {!hideIndicator && (
                  <div
                    className={cn(
                      "flex h-2.5 w-2.5 items-center justify-center rounded-full border border-border bg-background",
                      indicator === "dot" && "h-2 w-2"
                    )}
                    style={{
                      backgroundColor: indicatorColor,
                      borderColor: indicatorColor,
                    }}
                  />
                )}
                <div className="flex flex-1 items-center gap-1">
                  <span className="text-muted-foreground">
                    {itemConfig?.label || item.name || item.dataKey}
                  </span>
                  <span className="font-medium tabular-nums">
                    {formatter
                      ? formatter(item.value, item.name, item.payload, index, item)
                      : item.value}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)

ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-2 text-xs [&_.recharts-legend-item]:flex [&_.recharts-legend-item]:items-center [&_.recharts-legend-item]:gap-1 [&_.recharts-legend-item]:text-muted-foreground [&_.recharts-legend-item]:[&>svg]:h-3 [&_.recharts-legend-item]:[&>svg]:w-3",
        className
      )}
      {...props}
    />
  )
)

ChartLegendContent.displayName = "ChartLegendContent"

const ChartAxis = RechartsPrimitive.XAxis

const ChartAxisTick = React.forwardRef(
  ({ className, ...props }, ref) => (
    <RechartsPrimitive.XAxisTick
      ref={ref}
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
)

ChartAxisTick.displayName = "ChartAxisTick"

const ChartGrid = RechartsPrimitive.CartesianGrid

const ChartLine = RechartsPrimitive.Line

const ChartArea = RechartsPrimitive.Area

const ChartBar = RechartsPrimitive.Bar

const ChartPie = RechartsPrimitive.Pie

const ChartCell = RechartsPrimitive.Cell

const ChartSector = RechartsPrimitive.Sector

const ChartRadialBar = RechartsPrimitive.RadialBar

const ChartComposed = RechartsPrimitive.ComposedChart

const ChartScatter = RechartsPrimitive.Scatter

const ChartFunnel = RechartsPrimitive.Funnel

const ChartTreemap = RechartsPrimitive.Treemap

const ChartResponsive = RechartsPrimitive.ResponsiveContainer

function getPayloadConfigFromPayload(config, payload, key) {
  if (!config || !payload) {
    return null
  }

  const itemConfig = config[key]

  if (!itemConfig) {
    return null
  }

  return itemConfig
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartAxis,
  ChartAxisTick,
  ChartGrid,
  ChartLine,
  ChartArea,
  ChartBar,
  ChartPie,
  ChartCell,
  ChartSector,
  ChartRadialBar,
  ChartComposed,
  ChartScatter,
  ChartFunnel,
  ChartTreemap,
  ChartResponsive,
} 