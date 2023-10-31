import * as React from 'react'
import styled from 'styled-components'

const Style = {
  Container: styled.dl`
    display: flex;
    background-color: white;
    flex-direction: column;
    width: 100%;
    max-width: 700px;
    position: relative;
  `,
}

const Chart = ({ children }: { children: React.ReactNode }) => {
  return <Style.Container>{children}</Style.Container>
}

export default Chart
