import ArrowRight from '@mui/icons-material/ArrowRight'
import ArrowDown from '@mui/icons-material/ArrowDropDown'
import { IconButton, Typography } from '@mui/material'
import * as React from 'react'
import styled from 'styled-components'

const Style = {
  Button: styled(IconButton)`
    display: flex;
    justify-content: space-between;

    border-radius: 5px;
    padding: 5px;
    margin-bottom: 5px;
    width: 100%;
  `,
}

interface Props {
  children: React.ReactNode
  title?: string
}

const Dropdown = ({ children, title }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOnClick = React.useCallback(() => setIsOpen(!isOpen), [isOpen])

  return (
    <>
      <Style.Button type="button" onClick={handleOnClick}>
        {title != null && <Typography>{title}</Typography>}
        {isOpen ? <ArrowDown /> : <ArrowRight />}
      </Style.Button>
      {isOpen && <>{children}</>}
    </>
  )
}

export default Dropdown
