import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import logo from '../../assets/logo.svg'
import  routes from "../../routes/routes.jsx"
import {Navigate, Route, Routes, Link, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {FinancialContext} from "../Context/ExpencesTrackerContext.jsx";
import {useContext} from "react";
import BudgetDetail from "../BudgetDetail/BudgetDetail.jsx";
const drawerWidth = 240;


function Main(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const navigate = useNavigate();
    const { logOut } = useContext(FinancialContext); // Get the logOut function from context

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };


    const drawer = (
        <div>
            <Toolbar />
            <Box sx={{marginTop:'-50px',padding:'15px'}}>
                <img src={logo} alt={''}/>
            </Box>
            <Divider />
            <List>
                {routes.map((val, index) => (
                    <Link to={val.path} key={val.key}>
                        <ListItem key={val.key} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 3 === 0 ? <DashboardIcon /> : index % 3 === 1 ? <AddCardOutlinedIcon /> :  <ListAltOutlinedIcon /> }
                                </ListItemIcon>
                                <ListItemText primary={val.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                ))}
            </List>
        </div>
    );
    const getRoutes=(rout)=>
        rout.map((val)=>
            <Route path={val.path} key={val.key}  element={val.element} />
        )

    const handleLogOut = () => {
        logOut();
    };

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    boxShadow:'none',
                    height:'85px'
                }}
            >
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ ml: 'auto' ,marginTop:'20px'}}>
                        <Button sx={{marginLeft:4,color:'white',width:'auto',backgroundColor:'red'}} variant="contained" fullWidth onClick={()=>handleLogOut()}>LOGOUT</Button>
                    </Box>

                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Routes>
                    {getRoutes(routes)}
                    <Route path="budget/:id" element={<BudgetDetail/>} />
                    <Route path="*" element={<Navigate to="main/dashboard" />} />
                </Routes>
            </Box>
        </Box>
    );
}

// Main.propTypes = {
//     /**
//      * Injected by the documentation to work in an iframe.
//      * Remove this when copying and pasting into your project.
//      */
//     window: PropTypes.func,
// };

export default Main;