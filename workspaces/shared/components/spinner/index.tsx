import styled, {keyframes} from '@shared/utils/styled'
import * as React from 'react'

export interface Props {
  white?: boolean
  small?: boolean
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const StyledSpinner = styled.svg.attrs({
  fill: props => props.white ? 'white' : props.theme.colors.primary.hex,
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 512 512',
})`
  width: ${(props: Props) =>  props.small ? '14px' : '32px'};
  animation: ${spin} 0.5s infinite linear;
`

export const Spinner = (props: Props) => (
  <StyledSpinner {...props}>
    {/* tslint:disable-next-line:max-line-length */}
    <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
  </StyledSpinner>
)