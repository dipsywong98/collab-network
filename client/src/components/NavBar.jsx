/** @jsx jsx */
import { mdiCircleSlice4 } from '@mdi/js'
import { Flex } from '@theme-ui/components'
import Button from './Button'
import Icon from './Icon'
import { jsx, useColorMode } from 'theme-ui'

const NavBar = () => {
  const [colorMode, setColorMode] = useColorMode()

  const toggleDarkMode = () => setColorMode(colorMode === 'default' ? 'dark' : 'default')

  return (
    <Flex
      py={2}
      px={[3]}
      pl={[4, null, 1]}
      sx={{
        alignItems: 'center',
        gridArea: 'navbar',
        position: 'relative',
        '::before': {
          content: '""',
          position: 'absolute',
          backgroundColor: 'bgs.2',
          width: '100vw',
          height: '100%',
          right: 0,
          top: 0,
          zIndex: -1
        }
      }}>
      <Flex ml='auto' sx={{ alignItems: 'center', visibility: ['hidden', null, 'unset'], width: [0, null, 'unset'] }}>
        <Button
          onClick={toggleDarkMode}
          mr={2}
          title='Toggle Dark Mode'>
          <Icon path={mdiCircleSlice4}/>
        </Button>
      </Flex>
    </Flex>
  )
}

export default NavBar
