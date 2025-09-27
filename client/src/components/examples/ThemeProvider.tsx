import { ThemeProvider } from '../ThemeProvider'

export default function ThemeProviderExample() {
  return (
    <ThemeProvider>
      <div className="p-8 space-y-4">
        <h3 className="text-xl font-playfair font-bold">Theme Provider</h3>
        <p className="text-muted-foreground font-poppins">
          This component provides theme context for the application.
        </p>
      </div>
    </ThemeProvider>
  )
}