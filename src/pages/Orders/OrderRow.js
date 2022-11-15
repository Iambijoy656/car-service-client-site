import React, { useEffect, useState } from 'react';

const OrderRow = ({ order, handleDelete, handleStatusUpdate }) => {
    const { _id, serviceName, price, email, phone, customer, service, status } = order;
    const [orderService, setOrderService] = useState({});




    useEffect(() => {
        fetch(`https://genius-car-server-liart-eight.vercel.app/services/${service}`)
            .then(res => res.json())
            .then(data => setOrderService(data))

        // ekhane service means service_id


    }, [service])




    return (
        <tr>
            <th>
                <button onClick={() => handleDelete(_id)} className='btn btn-ghost'>X</button>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded w-24 h-24">
                            {
                                orderService?.img &&
                                <img src={orderService.img} alt="Avatar Tailwind CSS Component" />
                            }
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{customer}</div>
                        <div className="text-sm opacity-50">{phone}</div>
                    </div>
                </div>
            </td>
            <td>
                {serviceName}
                <br />
                <span className="badge badge-ghost badge-sm">{price}</span>
            </td>
            <td>Purple</td>
            <th>
                <button
                    onClick={() => handleStatusUpdate(_id)}
                    className="btn btn-ghost btn-xs">
                    {status ? <p className='text-green-600 text-bold'>{status}</p>
                        :
                        'pending'}
                </button>
            </th>
        </tr>
    );
};

export default OrderRow;