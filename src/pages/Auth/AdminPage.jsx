import React from 'react'
import { AdminCard } from '../../components/Admin/AdminCard'
import { useHistory } from 'react-router-dom'

const AdminPage = () => {

    const navigation = useHistory()
    return (
        <div className='admin_container'>

            <AdminCard title={'Manage Users'} onClick={() => navigation.push('/orders')} />
            <AdminCard title={'Manage Stores'} />
            <AdminCard title="Manage Orders" />
            <AdminCard title="Manage Applications" />
            <AdminCard />
            <AdminCard />

        </div>
    )
}

export default AdminPage
