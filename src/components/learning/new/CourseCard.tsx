import React from 'react';

interface CourseCardProps {
  title: string;
  description: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-blue-700">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default CourseCard;
