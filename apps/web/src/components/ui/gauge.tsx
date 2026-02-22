import * as React from "react"
import { cn } from "@/lib/utils"

interface GaugeProps extends React.SVGProps<SVGSVGElement> {
  value: number
  min?: number
  max?: number
  size?: number
  strokeWidth?: number
  label?: React.ReactNode
  showValue?: boolean
  gaugePrimaryColor?: string
  gaugeSecondaryColor?: string
}

const Gauge = React.forwardRef<SVGSVGElement, GaugeProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      size = 160,
      strokeWidth = 14,
      label,
      showValue = true,
      gaugePrimaryColor,
      gaugeSecondaryColor = "var(--color-muted)",
      className,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(Math.max(value, min), max)
    const percentage = (clampedValue - min) / (max - min)

    // Gauge spans 270 degrees (from 135deg to 405deg / -225deg to 45deg)
    const startAngle = 135
    const endAngle = 405
    const totalAngle = endAngle - startAngle

    const radius = (size - strokeWidth) / 2
    const cx = size / 2
    const cy = size / 2

    const polarToCartesian = (angle: number) => {
      const rad = ((angle - 90) * Math.PI) / 180
      return {
        x: cx + radius * Math.cos(rad),
        y: cy + radius * Math.sin(rad),
      }
    }

    const describeArc = (start: number, end: number) => {
      const s = polarToCartesian(start)
      const e = polarToCartesian(end)
      const largeArcFlag = end - start > 180 ? 1 : 0
      return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${e.x} ${e.y}`
    }

    const fillAngle = startAngle + totalAngle * percentage

    // Determine color based on percentage thresholds
    const getColor = () => {
      if (gaugePrimaryColor) return gaugePrimaryColor
      if (percentage <= 1 / 3) return "#ef4444" // red-500
      if (percentage <= 2 / 3) return "#eab308" // yellow-500
      return "#22c55e" // green-500
    }

    const trackPath = describeArc(startAngle, endAngle)
    const fillPath =
      percentage > 0
        ? describeArc(
            startAngle,
            // Subtract a tiny amount to avoid the fill overlapping the track endpoint
            Math.min(fillAngle, endAngle - 0.01)
          )
        : ""

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={cn("select-none", className)}
        aria-valuenow={clampedValue}
        aria-valuemin={min}
        aria-valuemax={max}
        role="meter"
        {...props}
      >
        {/* Track */}
        <path
          d={trackPath}
          fill="none"
          stroke={gaugeSecondaryColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Fill */}
        {percentage > 0 && (
          <path
            d={fillPath}
            fill="none"
            stroke={getColor()}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        )}
        {/* Center label */}
        {showValue && (
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-2xl font-bold fill-current"
            style={{ fontSize: size * 0.18, fontWeight: 700 }}
            fill="currentColor"
          >
            {clampedValue}
          </text>
        )}
        {label && (
          <text
            x={cx}
            y={cy + size * 0.18}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: size * 0.1 }}
            fill="currentColor"
            opacity={0.6}
          >
            {label}
          </text>
        )}
      </svg>
    )
  }
)

Gauge.displayName = "Gauge"

export { Gauge }
