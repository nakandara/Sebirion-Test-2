import React from 'react'
import "./pageContainer.css"

export default function PageContainer() {
    return (
        <div className='pageContainer'>
            <Topbar />
            <div className='container'>
                <Sidebar />
            </div>
        </div>
    )
}
