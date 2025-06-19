import React from 'react';
import TierHeader from '@/components/learning/new/TierHeader';
import CourseCard from '@/components/learning/new/CourseCard';
import LearningPathCard from '@/components/learning/new/LearningPathCard';

const LearningHub: React.FC = () => {
  // Mock data for courses and learning paths
  const courses = [
    { tier: 'Freemium', title: 'Introduction to AI', description: 'A comprehensive introduction to the field of AI.' },
    { tier: 'Basic', title: 'Intermediate Prompt Engineering', description: 'Learn intermediate prompt engineering techniques.' },
    { tier: 'Pro', title: 'Advanced Prompt Engineering & Automation', description: 'Master advanced prompt engineering and automation techniques.' },
  ];

  const learningPaths = [
    { tier: 'Freemium', title: 'AI Awareness for Everyone', description: 'A path to understand the basics of AI.', courses: [{ title: 'Introduction to AI' }, { title: 'History & Ethics of AI' }] },
    { tier: 'Basic', title: 'AI Content Creator Toolkit', description: 'A path to create AI content.', courses: [{ title: 'Intermediate Prompt Engineering' }, { title: 'Creating with AI Art & Image Generators' }] },
    { tier: 'Pro', title: 'AI Startup Founder Path', description: 'A path to build an AI startup.', courses: [{ title: 'AI Product Management for Startups' }, { title: 'Go-to-Market for AI Startups' }] },
  ];

  // Filter courses and learning paths by tier
  const freemiumCourses = courses.filter(course => course.tier === 'Freemium');
  const basicCourses = courses.filter(course => course.tier === 'Basic');
  const proCourses = courses.filter(course => course.tier === 'Pro');

  const freemiumLearningPaths = learningPaths.filter(path => path.tier === 'Freemium');
  const basicLearningPaths = learningPaths.filter(path => path.tier === 'Basic');
  const proLearningPaths = learningPaths.filter(path => path.tier === 'Pro');

  return (
    <div className="container mx-auto py-8">
      <TierHeader tier="Freemium" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {freemiumCourses.map(course => (
          <CourseCard key={course.title} title={course.title} description={course.description} />
        ))}
        {freemiumLearningPaths.map(path => (
          <LearningPathCard key={path.title} title={path.title} description={path.description} courses={path.courses} />
        ))}
      </div>

      <TierHeader tier="Basic" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {basicCourses.map(course => (
          <CourseCard key={course.title} title={course.title} description={course.description} />
        ))}
        {basicLearningPaths.map(path => (
          <LearningPathCard key={path.title} title={path.title} description={path.description} courses={path.courses} />
        ))}
      </div>

      <TierHeader tier="Pro" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {proCourses.map(course => (
          <CourseCard key={course.title} title={course.title} description={course.description} />
        ))}
        {proLearningPaths.map(path => (
          <LearningPathCard key={path.title} title={path.title} description={path.description} courses={path.courses} />
        ))}
      </div>
    </div>
  );
};

export default LearningHub;
