import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {

    const { user, logOut } = useContext(AuthContext)
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()



    useEffect(() => {
        fetch(`https://genius-car-server-liart-eight.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {

                    return setOrders([])
                    // return logOut();
                }
                return res.json();
            })
            .then(data => setOrders(data))
    }, [user?.email])



    const handleDelete = id => {
        const proceed = window.confirm("Are You sure, You want to cancel this order ");
        if (proceed) {
            fetch(`https://genius-car-server-liart-eight.vercel.app/orders/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${localStorage.getItem('genius-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        toast.error("Deleted Successfully")
                        const remaining = orders.filter(odr => odr._id !== id)
                        setOrders(remaining)
                    }
                })
        }

    }



    const handleStatusUpdate = id => {
        fetch(`https://genius-car-server-liart-eight.vercel.app/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify({ status: 'Approved' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    const remaining = orders.filter(odr => odr._id !== id)

                    const approving = orders.find(odr => odr._id === id)

                    approving.status = "Approved"

                    const newOrders = [approving, ...remaining]
                    setOrders(newOrders)
                }
            })

    }


    return (
        <div className='mb-10'>
            <h2 className="text-3xl text-center font-bold text-orange-600 mb-5">You have {orders?.length} Orders</h2>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map(order => <OrderRow
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                                handleStatusUpdate={handleStatusUpdate}
                            ></OrderRow>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;