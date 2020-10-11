import React, { useState, useRef, useEffect, useContext } from 'react'
import './Application.css'

import M from "materialize-css/dist/js/materialize.min.js";
import authContext from '../../context/auth/authContext';
import { db } from '../../services/firebase';
import { Link } from 'react-router-dom';



const Application = (props) => {

    const selectRef = useRef()
    const { user, logout } = useContext(authContext)

    const [store, setStore] = useState({
        name: '',
        street: '',
        city: '',
        state: 'ny',
        zipcode: '',
        phone: '',
        status: 'pending'

    })

    const setValue = e => {
        setStore({ ...store, [e.target.name]: e.target.value })
    }

    const logOut = () => {
        logout()
        props.history.replace('/')
    }


    const handleSubmit = async e => {
        e.preventDefault();
        const newStore = { ...store, userId: user.userId }

        console.log(newStore)

        try {
            const query = (await db.collection('stores').doc(user?.userId).get());
            if (query.exists) {
                //store already found
                const stores = query.data();
                if (stores.length === 0) {

                    const res = await db.collection('stores').doc(user?.userId).add(newStore)
                    if (res.id) {
                        props.history.replace('/submitted')
                    }
                } else if (stores.length > 0) {
                    alert('You already submitted an application')
                    return;
                } else {
                    console.log('error')
                }

            }





        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        M.FormSelect.init(selectRef.current)
    }, [])

    return (

        <div className="section">

            <div className="main">
                <h4 className="center title">Submit Application for your business</h4>
                <button onClick={logOut} className="btn secondary sec" to="/">EXIT</button>
            </div>
            <div className="form row">
                <form onSubmit={handleSubmit} className="col s12">
                    <div className="row">
                        <div className="col s12 input-field">
                            <input placeholder="Business Name" name="name" id="name" value={store.name} required onChange={setValue} className="validate capitalize" type="text" />
                            <label htmlFor="name" className="active">Business Name</label>
                        </div>
                        <div className="col s12 input-field">
                            <input placeholder="Street Name" name="street" id="street" required value={store.street} onChange={setValue} className="validate capitalize" type="text" />
                            <label htmlFor="street" className="active">Business Address</label>
                        </div>
                        <div className="col s12 input-field">
                            <input placeholder="Enter City. Ex. Bronx, New York" name="city" id="city" required value={store.city} onChange={setValue} className="validate capitalize" type="text" />
                            <label htmlFor="city" className="active">City</label>
                        </div>
                        <div className="col s12 input-field">
                            <select ref={selectRef} name="state" required id="state" value={store.state} onChange={setValue}>
                                <option value="" disabled>Choose your state</option>
                                <option value="ny">New York</option>
                                <option value="ct">Connecticut</option>
                                <option value="nj">New Jersey</option>
                            </select>
                            <label htmlFor="state">City where your business will operate</label>
                        </div>
                        <div className="col s12 input-field">
                            <input placeholder="Enter Zip Code" name="zipcode" id="zipcode" required value={store.zipcode} onChange={setValue} className="validate capitalize" type="text" />
                            <label htmlFor="zipcode" className="active">Zip Code</label>
                        </div>
                        <div className="col s12 input-field">
                            <input placeholder="Enter Business Phone Number (555-555-5555)" minLength="10" maxLength="12" required name="phone" id="phone" value={store.phone} onChange={setValue} className="validate capitalize" type="text" />
                            <label htmlFor="phone" className="active">Phone Number</label>
                        </div>

                        <div className="col s12">
                            <button type="submit" className="btn secondary">Submit Application</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Application
