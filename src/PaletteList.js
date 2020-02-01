import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import MiniPalette from './MiniPalette'

const Page = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`

const PalettesPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 66%;
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

export default class PaletteList extends Component {
  render() {
    const { palettes } = this.props
    return (
      <Page>
        <PalettesPageContainer>
          <PalettesHeader>
            <AppName>React Colors</AppName>
            <CreateLink>Create Palette</CreateLink>
          </PalettesHeader>
          <PalettesContainer>
            {/* {palettes.map(palette => (
          <p>
            <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
          </p>
        ))} */}
            {palettes.map(palette => (
              <MiniPalette palette={palette} />
            ))}
          </PalettesContainer>
        </PalettesPageContainer>
      </Page>
    )
  }
}
