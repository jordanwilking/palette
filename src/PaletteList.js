import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import MiniPalette from './MiniPalette'
import mediaSizes from './mediaSizes'

const Page = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  z-index: 1;
`

const PalettesPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 66%;

  @media (max-width: ${mediaSizes.xl}) {
    width: 80%;
  }

  @media (max-width: ${mediaSizes.xs}) {
    width: 70%;
  }
`

const PalettesHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
`

const AppName = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
`

const CreateLink = styled(Link)`
  color: rgba(255, 255, 255, 0.5);
`

const PalettesContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: flex-start;
  height: 100%;
  width: 100%;
`

// TODO: can't do justify-content flex-start and space-between at the same time
class PaletteList extends Component {
  constructor(props) {
    super(props)
    this.goToPalette = this.goToPalette.bind(this)
  }

  goToPalette(id) {
    this.props.history.push(`palette/${id}`)
  }

  render() {
    const { deletePalette, palettes } = this.props

    return (
      <Page>
        <PalettesPageContainer>
          <PalettesHeader>
            <AppName>React Colors</AppName>
            <CreateLink to='/palette/new'>Create Palette</CreateLink>
          </PalettesHeader>
          <PalettesContainer>
            {palettes.map(palette => (
              <MiniPalette
                key={palette.id}
                id={palette.id}
                palette={palette}
                onClick={this.goToPalette}
                onDelete={deletePalette}
              />
            ))}
          </PalettesContainer>
        </PalettesPageContainer>
      </Page>
    )
  }
}

export default PaletteList
