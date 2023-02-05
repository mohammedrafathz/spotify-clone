import { Box, Divider, Link, LinkBox, LinkOverlay, List, ListIcon, ListItem } from '@chakra-ui/layout';
import { MenuItem } from '@chakra-ui/menu';
import Image from 'next/image';
import NextLink from 'next/link';
import { MdFavorite, MdHome, MdLibraryMusic, MdPlaylistAdd, MdSearch } from 'react-icons/md'

const navMenu = [
  {
    icon: MdHome,
    name: "Home",
    route: "/"
  },
  {
    icon: MdSearch,
    name: "Search",
    route: "/search"
  },
  {
    icon: MdLibraryMusic,
    name: "Your Library",
    route: "/library"
  }
]

const musicMenu = [
  {
    icon: MdPlaylistAdd,
    name: "Create Playlist",
    route: "/playlist"
  },
  {
    icon: MdFavorite,
    name: "Favorites",
    route: "/favorites"
  }
]

const playlist = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`)

const Sidebar = () => {
  return (
    <Box width="100%" height="calc(100vh - 100px)" bg="black" paddingX="5px" color="gray">
      <Box paddingY="20px" height="100%" >
        <Box width="200px" margin='0 auto' marginBottom="20px" paddingX="20px">
          <Image src="/logo.png" alt='logo' height={80} width={300} />
        </Box>
        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenu.map(menu => (
              <ListItem key={menu.name} paddingX="20px" fontSize="16px">
                <LinkBox>
                  <LinkOverlay as={NextLink} href={menu.route} passHref>
                    <ListIcon as={menu.icon} color='white' marginRight="20px" />
                    {menu.name}
                  </LinkOverlay>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box marginBottom="20px">
          <List spacing={2}>
            {musicMenu.map(item => (
              <ListItem key={item.name} paddingX="20px" fontSize="16px">
                <LinkBox>
                  <LinkOverlay as={NextLink} href={item.route} passHref>
                    <ListIcon as={item.icon} color='white' marginRight="20px" />
                    {item.name}
                  </LinkOverlay>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color="gray.800" />
        <Box height="66%" overflowY="auto" paddingY="20px">
          <List spacing={2}>
            {playlist.map(playlist => (
              <ListItem key={playlist} paddingX="20px">
                <LinkBox >
                  <LinkOverlay as={NextLink} href={playlist} passHref>{playlist}</LinkOverlay>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box >
  )
}

export default Sidebar;