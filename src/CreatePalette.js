// import React, { Component } from 'react'
// import styled from 'styled-components'
// import Drawer from '@material-ui/core/Drawer'
// import { Button, Divider, IconButton } from '@material-ui/core'
// import seedColors from './seedColors'
// import ColorBox from './ColorBox'
// import QueueIcon from '@material-ui/icons/Queue'
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

// const CreatePaletteContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: 100vh;
//   background-color: white;
// `

// const CreateHeader = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   height: 3.5rem;
//   padding: 0 1rem;
// `

// const CreateText = styled.div`
//   font-weight: 600;
//   margin-left: 1rem;
// `

// const HeaderLeft = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
// `

// const HeaderActionsSection = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   width: 30%;
// `

// const Palettes = styled.div`
//   display: flex;
//   flex-flow: row wrap;
//   height: 100%;
// `

// const PalettePickerContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   align-content: center;
//   justify-content: center;
//   height: 50%;
//   width: 100%;
//   margin: 1rem;
//   border: 2px solid red;
// `

// const PickerActions = styled.div`
//   display: flex;
//   flex-direction: row;
// `

// class CreatePalette extends Component {
//   constructor(props) {
//     super(props)
//     this.state = { drawerOpen: false }
//     this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
//     this.handleDrawerClose = this.handleDrawerClose.bind(this)
//   }

//   handleDrawerOpen() {
//     this.setState({ drawerOpen: true })
//   }

//   handleDrawerClose() {
//     this.setState({ drawerOpen: false })
//   }

//   render() {
//     const test = seedColors[2]
//     const { drawerOpen } = this.state

//     return (
//       <CreatePaletteContainer>
// <CreateHeader>
//   <HeaderLeft>
//     <IconButton onClick={this.handleDrawerOpen}>
//       <QueueIcon />
//     </IconButton>
//     <CreateText>Create A Palette</CreateText>
//   </HeaderLeft>
//   <HeaderActionsSection>
//     <Button
//       style={{ marginRight: '1rem' }}
//       color='secondary'
//       variant='contained'
//     >
//       Go Back
//     </Button>
//     <Button color='primary' variant='contained'>
//       Save Palette
//     </Button>
//   </HeaderActionsSection>
// </CreateHeader>
//         <Divider />
//         <Palettes>
//           {test.colors.map(color => (
//             <ColorBox color={color.color} colorName={color.name} />
//           ))}
//         </Palettes>
//         <Drawer variant='permanent' open={drawerOpen}>
//           <div>
//             <IconButton onClick={this.handleDrawerClose}>
//               <ChevronLeftIcon />
//             </IconButton>
//           </div>
//           <Divider />
//           <Divider />
//         </Drawer>
//         <Drawer variant='persistent' anchor='left' open={drawerOpen}>
//           <div style={{ textAlign: 'right' }}>
//             <IconButton onClick={this.handleDrawerClose}>
//               <ChevronLeftIcon />
//             </IconButton>
//           </div>
// <PalettePickerContainer>
//   <>
//     <div>Design Your Palette</div>
//     <PickerActions>
//       <Button variant='contained' color='secondary'>
//         Clear Palette
//       </Button>
//       <Button variant='contained' color='primary'>
//         Random Color
//       </Button>
//     </PickerActions>
//   </>
// </PalettePickerContainer>
//         </Drawer>
//       </CreatePaletteContainer>
//     )
//   }
// }

// export default CreatePalette

import React, { Component } from 'react'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import QueueIcon from '@material-ui/icons/Queue'
import styled from 'styled-components'
import { Button, Typography } from '@material-ui/core'
import { ChromePicker } from 'react-color'
import seedColors from './seedColors'
import ColorBox from './ColorBox'
import DraggableColorBox from './DraggableColorBox'

const CreatePaletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: white;
`

const CreateHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const CreateText = styled.div`
  font-weight: 600;
  margin-left: 1rem;
`

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const HeaderActionsSection = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 30%;
`

const Palettes = styled.div`
  display: flex;
  flex-flow: row wrap;
  height: 100%;
`

const PalettePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 50%;
  width: 90%;
  margin: 1rem;
  border: 2px solid red;
`

const PickerActions = styled.div`
  display: flex;
  flex-direction: row;
`

const drawerWidth = 400

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
})

class CreatePalette extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      currentColor: 'teal',
      colors: ['purple', '#e15764']
    }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.updateCurrentColor = this.updateCurrentColor.bind(this)
    this.addNewColor = this.addNewColor.bind(this)
  }

  handleDrawerOpen() {
    this.setState({ open: true })
  }

  handleDrawerClose() {
    this.setState({ open: false })
  }

  updateCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex })
  }

  addNewColor() {
    this.setState({ colors: [...this.state.colors, this.state.currentColor] })
  }

  render() {
    const { classes } = this.props
    const { open, currentColor, colors } = this.state

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <CreateHeader>
              <HeaderLeft>
                <IconButton
                  onClick={this.handleDrawerOpen}
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <QueueIcon />
                </IconButton>
                <CreateText>Create A Palette</CreateText>
              </HeaderLeft>
              <HeaderActionsSection>
                <Button
                  style={{ marginRight: '1rem' }}
                  color='secondary'
                  variant='contained'
                >
                  Go Back
                </Button>
                <Button color='primary' variant='contained'>
                  Save Palette
                </Button>
              </HeaderActionsSection>
            </CreateHeader>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <PalettePickerContainer>
            <>
              <Typography variant='h4'>Design Your Palette</Typography>
              <PickerActions>
                <Button variant='contained' color='secondary'>
                  Clear Palette
                </Button>
                <Button variant='contained' color='primary'>
                  Random Color
                </Button>
              </PickerActions>
              <ChromePicker
                color={currentColor}
                onChangeComplete={this.updateCurrentColor}
              />
              <Button
                variant='contained'
                color='primary'
                style={{ backgroundColor: currentColor }}
                onClick={this.addNewColor}
              >
                Add Color
              </Button>
            </>
          </PalettePickerContainer>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          {colors.map(color => (
            <DraggableColorBox color={color} />
          ))}
        </main>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(CreatePalette)
