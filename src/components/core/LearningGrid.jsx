import React from 'react'
import HighlightText from './Homepage/HighlightText'
import Button from './Homepage/Button'

const learningData = [
   
    {
        order: -1,
        heading: "World-Class Learning for ",
        HighlightText: "Anyone, Anywhere",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        btnText: "Learn More",
        btnLink: "/"
    },

    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },

    {
        order: 2,
        heading: "Our Learning Methods",
        description: "The learning process uses the namely online and offline."
    },

    {
        order: 3,
        heading: "Certification",
        description: "You will get a certificate that can be used as a certification during job hunting."
    },

    {
        order: 4,
        heading: "Rating Auto-grading",
        description: "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."
    },

    {
        order: 5,
        heading: "Ready to Work",
        description: "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."
    }

 ]

const LearningGrid = () => {
  return (
    <div className='grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 bg-richblack-900'>
        {
             learningData.map((card, index) =>{
                return(
                    <div key={index}
                    className={`${index === 0 && "lg:col-span-2 lg:h-[250px]"}
                  ${
                    card.order % 2 === 1 ? "bg-richblack-700 lg:h-[280px] p-5" : "bg-richblack-800 lg:h-[280px] p-5"
                  }
                  ${card.order === 3 && "lg:col-start-2"}
                  ${card.order === -1 && "bg-transparent"}
                `}
                 >
                    {
                        card.order < 0 ? (
                            <div className='lg:w-[100%] flex flex-col pb-3 gap-3 bg-transparent'>
                                <div className='text-4xl font-semibold'>
                                    <h1>{card.heading}</h1>
                                    <HighlightText text={card.HighlightText}/>
                                </div>
                                <p className='font-medium'>{card.description}</p>

                                <div className='w-fit mt-4'>
                                    <Button active={true} linkto={card.btnLink}>
                                        {card.btnText}
                                    </Button>
                                </div>
                            </div>
                        ) : 
                        (
                            <div className='flex flex-col items-start gap-8 p-7'>
                                <h1 className='text-richblack-5 text-lg'>{card.heading}</h1>
                                <p className='text-richblack-300 font-medium'>{card.description}</p>
                            </div>
                        )
                    }

                    </div>

                )
             })

        }
       
    </div>
  )
}

export default LearningGrid
