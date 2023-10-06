import { Grid } from '@mui/material'
import * as React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styled from 'styled-components'

import RightPanel from './RightPanel'
import Squad from './Squad'

const Style = {
  Container: styled(Grid)`
    margin-bottom: 30px;
  `,
}

const SquadBuilder = () => (
  <DndProvider backend={HTML5Backend}>
    <Style.Container container spacing={2}>
      <Grid item xs={7} md={9} lg={10}>
        <Squad />
      </Grid>
      <Grid item xs={5} md={3} lg={2}>
        <RightPanel />
      </Grid>
    </Style.Container>
  </DndProvider>
)

export default SquadBuilder
