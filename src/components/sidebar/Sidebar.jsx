import React from 'react'
import "./sidebar.css"
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import RowingOutlinedIcon from '@mui/icons-material/RowingOutlined';
import { Link } from 'react-router-dom';
import { ColorizeOutlined, HomeOutlined, PersonAddOutlined, RequestQuoteOutlined, SettingsOutlined, Timelapse, TrendingUp, WorkOffOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';

export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">
                        Dashboard
                    </h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <HomeOutlined className='sidebarIcon' />
                            <Link className='nav-link' to='/'> Home</Link>
                        </li>
                        <li className="sidebarListItem">                            
                            <Typography> ---------------------------------------------------</Typography>
                        </li>
                        <li className="sidebarListItem">
                            <SettingsOutlined className='sidebarIcon' />
                            <Typography fontSize={18}> Settings</Typography>
                        </li>
                        <li className="sidebarListItem">
                            <WorkOffOutlined className='sidebarIcon' />
                            <Link className='nav-link' to='/user_role'> - User Role</Link>
                        </li>
                        <li className="sidebarListItem">
                            <WorkOffOutlined className='sidebarIcon' />
                            <Link className='nav-link' to='/user_roles'> - User Roles</Link>
                        </li>
                        <li className="sidebarListItem">
                            <PersonAddOutlined className='sidebarIcon' />
                            <Link className='nav-link' to='/user'> - User</Link>
                        </li>
                        <li className="sidebarListItem">
                            <PersonAddOutlined className='sidebarIcon' />
                            <Link className='nav-link' to='/users'> - Users</Link>
                        </li>
                        <li className="sidebarListItem">
                            <Timelapse className='sidebarIcon' />
                            <Link className='nav-link' to='/additional_charges'> - Add. Charges</Link>
                        </li>
                        <li className="sidebarListItem">
                            <Timelapse className='sidebarIcon' />
                            <Link className='nav-link' to='/item_types'> - Item Types</Link>
                        </li>
                        <li className="sidebarListItem">
                            
                            <Typography> ---------------------------------------------------</Typography>
                        </li>
                        <li className="sidebarListItem">
                            <ColorizeOutlined className='sidebarIcon' />
                            <Typography fontSize={18}> Inventory</Typography>
                        </li>
                        <li className="sidebarListItem">
                            <RowingOutlinedIcon className='sidebarIcon' />
                            <Link className='nav-link' to='/inventory_item/null'> - Inventory Item</Link>
                        </li>
                        <li className="sidebarListItem">
                            <RowingOutlinedIcon className='sidebarIcon' />
                            <Link className='nav-link' to='/customer_prospects'> - Customer Prospects</Link>
                        </li>
                        {/* <li className="sidebarListItem">
                            <LocalActivityOutlinedIcon className='sidebarIcon' />
                            <Link className='nav-link' to='/project'> Project</Link>
                        </li>
                        <li className="sidebarListItem">
                            <LocalActivityOutlinedIcon className='sidebarIcon' />
                            <Link className='nav-link' to='/covering_types'> Covering Types</Link>
                        </li>
                        <li className="sidebarListItem">
                            <LocalActivityOutlinedIcon className='sidebarIcon' />
                            <Link className='nav-link' to='/material'> Material</Link>
                        </li>
                        <li className="sidebarListItem">
                            <LocalActivityOutlinedIcon className='sidebarIcon' />
                            <Link className='nav-link' to='/material_groups'> Material Groups</Link>
                        </li>
                        <li className="sidebarListItem">
                            <LocalActivityOutlinedIcon className='sidebarIcon' />
                            <Link className='nav-link' to='/material_group_function'> Material Group Function</Link>
                        </li>
                        <li className="sidebarListItem">
                            <LocalActivityOutlinedIcon className='sidebarIcon' />
                            <Link className='nav-link' to='/unit_measure'> Unit of Measure</Link>
                        </li> */}
                        <li className="sidebarListItem">
                            <LocalActivityOutlinedIcon className='sidebarIcon' />
                            <Link className='nav-link' to='/inquiry/null'> - Inquiry</Link>
                        </li>
                        <li className="sidebarListItem">
                            <LocalActivityOutlinedIcon className='sidebarIcon' />
                            <Link className='nav-link' to='/inquiries'> - Inquiries</Link>
                        </li>
                        <li className="sidebarListItem">
                            <RequestQuoteOutlined className='sidebarIcon' />
                            <Link className='nav-link' to='/quotation/null'> - Price Summery</Link>
                        </li>
                        <li className="sidebarListItem">
                            <RequestQuoteOutlined className='sidebarIcon' />
                            <Link className='nav-link' to='/quotations'> - Price Summeries</Link>
                        </li>



                    </ul>
                </div>
            </div>
        </div>
    );
}
