import { css } from '@emotion/css'
import tw from 'twin.macro'

const twclass = (styles: string) => css`
  ${tw`${styles}`}
`

export default twclass;
