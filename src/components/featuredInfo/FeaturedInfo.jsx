import React, { useState, useEffect } from 'react'
import "./featuredInfo.css"
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import useAxiosPrivate from '../../Application/fndbas/hooks/useAxiosPrivate';
import { Link } from 'react-router-dom';

const GET_USERS_URL = 'v1/FndUser/'

export default function FeaturedInfo() {
    const [userCount, setUserCount] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        
        const getUserCount = async () => {
            try {
                const response = await axiosPrivate.get(GET_USERS_URL + "get_user_count",
                    {
                        headers: {
                            signal:controller.signal
                        }
                    }
                );
                console.log(response.data);
                isMounted && setUserCount(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        getUserCount();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [axiosPrivate])

    return (
        <div className='featured'>
            <div className="featuredItem1">
                <span className="featuredTitle">Users</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney"><Link className='nav-link' to="/users">{userCount}</Link></span>
                    <span className="featuredMoneyRate">-11.25%<ArrowDownward className='featuredIcon negative' /></span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem2">
                <span className="featuredTitle">Sales</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$4,500</span>
                    <span className="featuredMoneyRate">33.25%<ArrowUpward className='featuredIcon' /></span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem3">
                <span className="featuredTitle">Cost</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$6,500</span>
                    <span className="featuredMoneyRate">-6.25%<ArrowDownward className='featuredIcon negative' /></span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    );
}
