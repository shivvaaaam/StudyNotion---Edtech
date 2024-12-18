import React, { useEffect, useState } from 'react'
import IconBtn from './IconBtn'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Confirmationmodal = ({modalData}) => {
  const navigate = useNavigate();
  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    if (!modalData && !toastShown) {
      toast.error("Please login before buying course",{
        autoClose: 2000
      })
      setToastShown(true);
      navigate('/login');
    }
  }, []);

  if (!modalData) {
    return null; 
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">{modalData.text1}</p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">{modalData.text2}</p>
        <div className='flex gap-4 mt-5 items-center'>
            <IconBtn
             onClick={modalData?.btn1Handler}
             text={modalData?.btn1Text}
            />

            <button onClick={modalData?.btn2Handler}
             className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900"
            >
              {modalData?.btn2Text}
            
            </button>
        </div>
      </div>
    </div>
  )
}

export default Confirmationmodal
