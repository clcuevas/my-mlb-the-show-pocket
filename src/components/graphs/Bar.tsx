import * as React from 'react'
import styled from 'styled-components'

const Style = {
  Bar: styled.dd<{ $color: string; $percentage: number }>`
    font-size: 0.8em;
    line-height: 1;
    text-transform: uppercase;
    width: 100%;
    height: 40px;
    background: repeating-linear-gradient(to right);
    margin-left: 0;

    &:after {
      content: '';
      display: block;
      background-color: ${(props) => props.$color};
      border: 5px solid gray;
      margin-bottom: 10px;
      height: 90%;
      position: relative;
      transform: translateY(-50%);
      transition: background-color 0.3s ease;
      width: ${({ $percentage }) => `${$percentage ?? 0}%`};
    }
  `,
}

const Bar = ({
  value,
  denominator,
  color,
}: {
  value: number
  denominator: number
  color: string
}) => {
  const [percentage, setPercentage] = React.useState(0)

  React.useEffect(() => {
    const p = value / denominator
    setPercentage(p * 100)
  }, [value, denominator])

  return <Style.Bar $percentage={percentage} $color={color} />
}

export default Bar
