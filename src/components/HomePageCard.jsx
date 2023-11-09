import React from 'react'
import ImgMediaCard from './CardBook'

const HomePageCard = () => {
    return (
        <>
            <div className='container'>
                <div className='d-flex justify-content-between w-100 mt-4'>
                    <div>
                        <h3 style={{ color: "#FFFFFF" }}>You’ve got <span style={{ color: "#6200EE" }}>7 book </span> </h3>
                        <h6 className='text-secondary fs-5'>Your task today</h6>
                    </div>
                    <div className='d-flex w-50 gap-3'>
                        <div className='w-75'>
                            <input type="text" className='form-control py-2' placeholder='Enter your name' />
                        </div>
                        <div>
                            <button className="btn text-white py-2" style={{ backgroundColor: "#6200EE", width: "182px" }}>+ Create a book</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row g-3  w-100 mt-5 container'>
                <div className='col-md-4'>
                    <ImgMediaCard />
                </div>
                <div className='col-md-4'>
                    <ImgMediaCard />
                </div>
                <div className='col-md-4'>
                    <ImgMediaCard />
                </div>
                <div className='col-md-4'>
                    <ImgMediaCard />
                </div>
            </div>
        </>
    )
}

export default HomePageCard
