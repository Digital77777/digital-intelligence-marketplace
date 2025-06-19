import React from 'react';
import { Course } from '@/types/learning';

interface CourseDetailsProps {
  course: Course;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course }) => {
  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      {course.modules && course.modules.length > 0 && (
        <div>
          <h3>Modules:</h3>
          <ul>
            {course.modules.map((module, index) => (
              <li key={index}>
                <h4>{module.title}</h4>
                <p>{module.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
