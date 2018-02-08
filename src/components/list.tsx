import * as React from 'react'
import {CSS} from '../constants'

type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface Props {
  children: React.ReactNode,
  horizontal?: boolean,
  spacing?: Spacing
}

export const List = ({children, horizontal, spacing = 'md'}: Props) => (
  <ul className={`
    List
    ${horizontal ? 'List--horizontal' : ''}
    ${spacing ? `List--${spacing}` : ''}
  `}>
    {children}

    <style jsx>{`
      .List {
        width: 100%;
        padding: 0;
        margin: 0;
        list-style-type: none;
      }

      .List--horizontal {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .List--xs:not(.List--horizontal) > :global(* + *) { margin-top: ${CSS.spacing.xs} }
      .List--sm:not(.List--horizontal) > :global(* + *) { margin-top: ${CSS.spacing.sm} }
      .List--md:not(.List--horizontal) > :global(* + *) { margin-top: ${CSS.spacing} }
      .List--lg:not(.List--horizontal) > :global(* + *) { margin-top: ${CSS.spacing.lg} }
      .List--xl:not(.List--horizontal) > :global(* + *) { margin-top: ${CSS.spacing.xl} }

      .List--xs.List--horizontal > :global(* + *) { margin-left: ${CSS.spacing.xs} }
      .List--sm.List--horizontal > :global(* + *) { margin-left: ${CSS.spacing.sm} }
      .List--md.List--horizontal > :global(* + *) { margin-left: ${CSS.spacing} }
      .List--lg.List--horizontal > :global(* + *) { margin-left: ${CSS.spacing.lg} }
      .List--xl.List--horizontal > :global(* + *) { margin-left: ${CSS.spacing.xl} }
    `}</style>
  </ul>
)
