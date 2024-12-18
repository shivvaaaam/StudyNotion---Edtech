import React, { useState } from 'react'
import { useEffect } from 'react';

const RequirementField = ({name, label, register, errors, setValue, getValues}) => {
   
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    useEffect(()=> {
        register(name, {
            required:true,
            // validate: (value) => value.length > 0
        })
    },[])

    useEffect(()=> {
        setValue(name, requirementList);
    },[requirementList])
    
    const handleAddRequirement = () =>{
        if(requirement){
            setRequirementList([...requirementList, requirement]);
        }
    }

    const handleRemoveRequirement = (index) =>{
        const updatedList = [...requirementList];
        updatedList.splice(index, 1);
        setRequirementList(updatedList);

    }




  return (
    <div>
        <div>
        <label htmlFor={name}>{label} <sup>*</sup></label>
        <input 
        type="text"
        placeholder='Add requirements'
        id={name}
        value={requirement}
        onChange={(e) => setRequirement(e.target.value)}
        
        className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px] pr-12 text-richblack-5"
        />
        <button
        type='button'
        onClick={handleAddRequirement}
        className='font-semibold text-yellow-50 mt-3'>
        
            Add
        </button>
        </div>

        {
            requirementList.length > 0 && (
            <ul>
                {
                    requirementList.map((requirement, index) =>(
                        <li key={index} className='flex items-center text-richblack-5 space-x-3'>
                            <span>{requirement}</span>
                            <button
                            type='button'
                            onClick={() => handleRemoveRequirement(index)}
                            className='text-xs text-pure-greys-300'>
                            
                              Clear
                            </button>
                        </li>
                    ))
                }
            </ul>

            ) 
        }
        {
            errors[name]  && (
               <span>{label} is required</span>
            )
        }
    </div>

  )
}

export default RequirementField
