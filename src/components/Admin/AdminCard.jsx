import React from 'react'

import './AdminCard.css'

export const AdminCard = ({ title, onClick }) => {
    return (
        <div onClick={onClick} className="admin_card">
            <div className="admin_card_body">
                <h4 className="center capitalize">{title}</h4>
            </div>
            <div className="admin_card_footer"></div>

        </div>
    )
}
