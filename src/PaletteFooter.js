import React, { Component } from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  height: 2rem;
`

class PaletteFooter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, emoji } = this.props

    return (
      <FooterContainer>
        <Typography style={{ paddingRight: '.5rem' }}>
          {name} {emoji}
        </Typography>
      </FooterContainer>
    )
  }
}

export default PaletteFooter
