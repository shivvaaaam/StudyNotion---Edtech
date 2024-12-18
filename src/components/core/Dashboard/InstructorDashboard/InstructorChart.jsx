import React, { useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);

export const InstructorChart = ({ courses }) => {
  const [currChart, setCurrChart] = useState('students');

  // Function to generate random colors
  const getRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  // Chart data for students
  const chartDataForStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  // Chart data for income
  const chartDataForIncome = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  // Options for chart (can be customized)
  const options = {};

  return (
    <div className="flex flex-row justify-between gap-x-6 rounded-md bg-richblack-800 p-6">
      {/* Buttons on the left */}
      <div className="flex flex-col gap-y-4">
        <p className="text-lg font-bold text-richblack-5">Visualize</p>
        <div className="space-x-4 font-semibold">
          {/* Button to switch to the "students" chart */}
          <button
            onClick={() => setCurrChart('students')}
            className={`rounded-sm p-1 px-3 transition-all duration-200 ${
              currChart === 'students'
                ? 'bg-richblack-700 text-yellow-50'
                : 'text-yellow-400'
            }`}
          >
            Students
          </button>
          {/* Button to switch to the "income" chart */}
          <button
            onClick={() => setCurrChart('income')}
            className={`rounded-sm p-1 px-3 transition-all duration-200 ${
              currChart === 'income'
                ? 'bg-richblack-700 text-yellow-50'
                : 'text-yellow-400'
            }`}
          >
            Income
          </button>
        </div>
      </div>

      {/* Pie chart on the right */}
      <div className="relative mx-auto aspect-square h-full w-[50%]">
        {/* Render the Pie chart based on the selected chart */}
        <Pie data={currChart === 'students' ? chartDataForStudents : chartDataForIncome} options={options} className='flex' />
      </div>
    </div>
  );
};
