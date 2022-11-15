import React, { useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Checkout = () => {
    const service = useLoaderData();
    const navigate = useNavigate()
    const { _id, title, price } = service;
    const { user } = useContext(AuthContext)

    const handlePlaceOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;



        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message

        }


        if (phone.length !== 11) {
            toast.warning('Please enter a valid number');
            return;
        }

        fetch('https://genius-car-server-liart-eight.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success('Order place Successfully')
                    form.reset();
                    navigate('/orders')
                }
            })
            .catch(error => console.error(error))




    }



    return (
        <div className='my-5'>
            <form onSubmit={handlePlaceOrder}>
                <h2 className='text-4xl text-center text-orange-600 font-semibold'>You are about to order: {title}</h2>
                <h4 className='text-3xl my-5 text-center text-orange-600'>Price: ${price}</h4>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <input name="firstName" type="text" placeholder="First Name" className="input input-bordered w-full  input-warning" />
                    <input name="lastName" type="text" placeholder="Last Name" className="input input-bordered w-full input-warning" />
                    <input name="phone" type="text" placeholder="Your phone" className="input input-bordered w-full  input-warning" required />
                    <input name="email" type="text" placeholder="Your Email" defaultValue={user?.email} className="input input-bordered w-full input-warning" readOnly />
                </div>
                <textarea name='message' className="textarea  textarea-warning h-24 w-full my-5" placeholder="Your message" required></textarea>

                <div className='flex items-center justify-center'>
                    <input className='btn btn-error ' type="submit" value="Place Your Order" />
                </div>

            </form>
        </div>
    );
};

export default Checkout;