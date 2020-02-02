import React from 'react'
import { withStyles } from '@material-ui/styles'
import styled from 'styled-components'

const styles = {}

const Box = styled.div`
  display: inline-block;
  position: relative;
  width: 20%;
  height: 25%;
  background-color: ${props => props.color};
`

function DraggableColorBox(props) {
  return <Box color={props.color}>{props.color}</Box>
}

export default withStyles(styles)(DraggableColorBox)
