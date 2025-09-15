/// <reference types="@emotion/react/types/css-prop" />

import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    colors?: {
      primary?: string
      secondary?: string
      background?: string
      text?: string
    }
    spacing?: {
      small?: string
      medium?: string
      large?: string
    }
  }
}