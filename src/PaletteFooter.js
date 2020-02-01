import React, { Component } from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 2rem;
  background-color: white;
`

class PaletteFooter extends Component {
  render() {
    const { name, emoji } = this.props

    return (
      <FooterContainer>
        <Typography style={{ paddingRight: '.5rem', fontWeight: 'bold' }}>
          {name} <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
        </Typography>
      </FooterContainer>
    )
  }
}

export default PaletteFooter
