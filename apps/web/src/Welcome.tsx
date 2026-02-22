import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Gauge,
  GaugeIndicator,
  GaugeTrack,
  GaugeRange,
  GaugeValueText,
  GaugeLabel,
} from "@/components/ui/gauge"

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })
}

const LOW_THRESHOLD = 100 / 3
const MEDIUM_THRESHOLD = (100 * 2) / 3

function Welcome() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [gaugeValue, setGaugeValue] = useState(50)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const gaugeColor =
    gaugeValue <= LOW_THRESHOLD
      ? "text-red-500"
      : gaugeValue <= MEDIUM_THRESHOLD
        ? "text-yellow-500"
        : "text-green-500"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {"Welcome to " + window.location.href}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Built with React, Vite, and shadcn/ui
          </p>
          <div className="text-3xl font-semibold text-red-600 mt-4">
            {formatTime(currentTime)}
          </div>
        </div>

        {/* Alert */}
        <Alert>
          <AlertTitle>Welcome!</AlertTitle>
          <AlertDescription>
            This is a demo page showcasing various shadcn/ui components. Explore the
            modern and accessible UI components below.
          </AlertDescription>
        </Alert>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature One</CardTitle>
              <CardDescription>
                Modern and responsive design with Tailwind CSS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Build beautiful user interfaces with pre-styled components that are
                fully customizable and accessible out of the box.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Learn More</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Two</CardTitle>
              <CardDescription>
                Type-safe with TypeScript support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Enjoy full TypeScript support with type definitions for all
                components, ensuring type safety throughout your application.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary">Explore</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Three</CardTitle>
              <CardDescription>
                Fast development with Vite
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Experience lightning-fast hot module replacement and optimized builds
                with Vite's next-generation frontend tooling.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Get Started</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Four</CardTitle>
              <CardDescription>
                Accessible and customizable
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All components follow WAI-ARIA guidelines and can be easily
                customized to match your brand and design system.
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="default">Primary</Button>
              <Button variant="ghost">Ghost</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Gauge Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Gauge Demo</CardTitle>
            <CardDescription>
              Enter a value between 0 and 100 to see the gauge update
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <Gauge value={gaugeValue} size={160} thickness={12}>
              <GaugeIndicator>
                <GaugeTrack />
                <GaugeRange className={gaugeColor} />
              </GaugeIndicator>
              <GaugeValueText className={gaugeColor} />
              <GaugeLabel>
                {gaugeValue <= LOW_THRESHOLD
                  ? "Low"
                  : gaugeValue <= MEDIUM_THRESHOLD
                    ? "Medium"
                    : "High"}
              </GaugeLabel>
            </Gauge>
            <div className="flex items-center gap-3">
              <label htmlFor="gauge-input" className="text-sm font-medium">
                Value (0–100):
              </label>
              <input
                id="gauge-input"
                type="number"
                min={0}
                max={100}
                value={gaugeValue}
                onChange={(e) => {
                  const num = Number(e.target.value)
                  if (!isNaN(num)) {
                    setGaugeValue(Math.min(100, Math.max(0, num)))
                  }
                }}
                className="w-24 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">
            Documentation
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Welcome
