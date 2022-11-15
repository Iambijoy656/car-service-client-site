import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    const { _id, img, price, title } = service;
    return (
        <div className="card card-compact bg-base-100 shadow-xl my-5">
            <figure ><img className='max-h-56' src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>

                <div className="card-actions flex justify-between items-center">
                    <p className='text-2xl font-semibold text-orange-600'>Price: ${price}</p>
                    <Link to={`/checkout/${_id}`}>

                        <button className="btn bg-white border-0 text-orange-600"><FaArrowRight></FaArrowRight></button>

                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;