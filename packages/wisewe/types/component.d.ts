import { App } from 'vue'

/** Wisewe component common definition */
export interface WiseweComponent {
  /** Install component into Vue */
  install: (app: App, ...options: any[]) => any
}

/** Component size definition for button, input, etc */
export type WiseweComponentSize = 'large' | 'medium' | 'small' | 'mini'
