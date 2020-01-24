import React, { Component } from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 2rem;
`

class PaletteFooter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <FooterContainer>
        <Typography style={{ width: '7rem' }}>Test Footer</Typography>
      </FooterContainer>
    )
  }
}

export default PaletteFooter
