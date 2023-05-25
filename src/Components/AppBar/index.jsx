import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import actionsList from '../../Redux/actions'

const pages = [
  { text: 'Commandes', link: '/', role: ['li', 'ad'] },
  { text: 'Produits', link: '/produits', role: ['ad'] },
  { text: 'Catégories', link: '/categories', role: ['ad'] },
  { text: 'Fabrication', link: '/fabrication', role: ['pa', 'ad'] },
]
const settings = [
  { text: 'Modifier Profil', link: '/profil' },
  { text: 'Déconnecter', link: '/logout' },
]

function AppBarComp() {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src="./logo.png"
            width={'100px'}
            height={'60px'}
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(
                (page) =>
                  user &&
                  (user.role === 'ad' ? (
                    <MenuItem
                      key={page}
                      onClick={() => {
                        handleCloseNavMenu()
                        navigate(page.link)
                      }}
                    >
                      <Typography textAlign="center">{page.text}</Typography>
                    </MenuItem>
                  ) : user.role === 'pa' && page.role.includes('pa') ? (
                    <MenuItem
                      key={page}
                      onClick={() => {
                        handleCloseNavMenu()
                        navigate(page.link)
                      }}
                    >
                      <Typography textAlign="center">
                        {page.text} {page.role}
                      </Typography>
                    </MenuItem>
                  ) : (
                    user.role === 'li' &&
                    page.role.includes('li') && (
                      <MenuItem
                        key={page}
                        onClick={() => {
                          handleCloseNavMenu()
                          navigate(page.link)
                        }}
                      >
                        <Typography textAlign="center">
                          {page.text} {page.role}
                        </Typography>
                      </MenuItem>
                    )
                  ))
              )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(
              (page) =>
                user &&
                (user.role === 'ad' ? (
                  <Button
                    key={page.text}
                    onClick={() => {
                      handleCloseNavMenu()
                      navigate(page.link)
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.text}
                  </Button>
                ) : user.role === 'pa' && page.role.includes('pa') ? (
                  <Button
                    key={page.text}
                    onClick={() => {
                      handleCloseNavMenu()
                      navigate(page.link)
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.text}
                  </Button>
                ) : (
                  user.role === 'li' &&
                  page.role.includes('li') && (
                    <Button
                      key={page.text}
                      onClick={() => {
                        handleCloseNavMenu()
                        navigate(page.link)
                      }}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page.text}
                    </Button>
                  )
                ))
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={user ? user.email : ''}
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => {
                      if (setting.link === '/logout') {
                        localStorage.setItem('user', null)
                        dispatch({ type: actionsList.auth, user: null })
                      } else navigate(setting.link)
                    }}
                  >
                    {setting.text}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default AppBarComp
