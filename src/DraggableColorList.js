import React from 'react'
import styled from 'styled-components'
import DraggableColorBox from './DraggableColorBox'
import { SortableContainer } from 'react-sortable-hoc'

const ColorBoxes = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  height: 100%;
`

const DraggableColorList = SortableContainer(({ colors, onDelete }) => {
  return (
    <ColorBoxes>
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          key={color.name}
          color={color.color}
          name={color.name}
          onDelete={onDelete}
        />
      ))}
    </ColorBoxes>
  )
})

export default DraggableColorList
