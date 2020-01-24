import React, { Component } from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'

const Box = styled(Grid)`
  height: 12vw;
  background-color: ${props => props.color};
`

class ColorBox extends Component {
  render() {
    return <Box item xs={12} sm={6} md={3} lg={1.5} color={this.props.color} />
  }
}

export default ColorBox
