import { App } from 'vue'
import { WiseweComponent, WiseweComponentSize } from './component'
export { ElButton } from './button'

export const version: string;

export function install(app: App, ...options: any[]): any;
export type Component = WiseweComponent;
export type ComponentSize = WiseweComponentSize;

/** set GlobalOptions */
export type GlobalOptions = {
  size?: number | string
}
export function setupGlobalOptions(opts: GlobalOptions): void
