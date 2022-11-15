import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services, setServices] = useState([])
    const [isAsc, setIsAsc] = useState(true)
    const [search, setSearch] = useState('')
    const searchRef = useRef();

    useEffect(() => {
        fetch(`https://genius-car-server-liart-eight.vercel.app/services?search=${search}&order=${isAsc ? 'asc' : 'desc'}`)
            .then(res => res.json())
            .then(data => setServices(data))
    }, [isAsc, search])



    const handleSearch = () => {
        setSearch(searchRef.current.value);
    }





    return (
        <div>
            <div className='text-center mb-4'>
                <p className="text-2xl font-bold text-orange-600 ">Services</p>
                <h2 className='text-5xl font-semibold my-5'>Our Service Area</h2>
                <p className='text-gray-500'>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable. </p>

                <button className='btn bg-orange-600 my-4' onClick={() => setIsAsc(!isAsc)}>Price: {isAsc ? "High to low" : "Low to High"}</button>
                <br />

                <input ref={searchRef} type="text" name="" id="" className='input input-warning w-full max-w-xs mr-3' /> <button onClick={handleSearch} className='btn bg-orange-500 mx-2'>Search</button>

            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}

                    ></ServiceCard>)
                }

            </div>
            <div className='text-center my-5'>
                <button className="btn btn-outline btn-error">More Services</button>
            </div>



        </div>
    );
};

export default Services;