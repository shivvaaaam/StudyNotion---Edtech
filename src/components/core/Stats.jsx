import React from 'react'

 const staticData = [
    {
        count: "5K",
        label: "Active Students",
    },

    {
        count: "10+",
        label: "Mentors",
    },

    {
        count: "200+",
        label: "Courses",
    },

    {
        count: "50+",
        label: "Awards",
    }
 ]
const Stats = () => {
  return (
    <section>
      <div className='bg-richblack-800 mt-20 mb-20'>
          <div className='flex gap-x-5 items-center mx-auto justify-evenly h-[254px]'>
            {
             staticData.map((data,index) => {
                return(
                    <div key={index} className='flex flex-col items-center'>
                       <h1 className='text-richblack-5 text-[30px] font-semibold'>{data.count}</h1>
                       <h2 className='text-richblack-300 text-[16px]'>{data.label}</h2>
                    </div>
                )
             })
            }
          </div>
      </div>
    </section>
  )
}

export default Stats
