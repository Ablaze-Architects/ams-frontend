
import { cva } from "class-variance-authority"

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-primary-foreground focus:bg-accent focus:text-primary-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-primary-foreground" 
)

export { navigationMenuTriggerStyle }