import React from 'react';

interface LearningPathCardProps {
  title: string;
  description: string;
  courses: { title: string }[];
}

const LearningPathCard: React.FC<LearningPathCardProps> = ({ title, description, courses }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-blue-700">{title}</h3>
      <p className="text-gray-600 text-sm mb-2">{description}</p>
      <ul className="list-disc list-inside pl-4">
        {courses.map((course, index) => (
          <li key={index} className="text-gray-700 text-sm">{course.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default LearningPathCard;
