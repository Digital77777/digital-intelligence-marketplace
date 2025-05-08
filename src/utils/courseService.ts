
import { supabase } from '@/integrations/supabase/client';

// Type for course data
export interface Course {
  id: number;
  title: string;
  description: string | null;
  content: string | null;
  required_tier: string;
  created_at: string;
  updated_at: string;
  category?: string;
  difficulty?: string;
  duration?: number;
  image_url?: string | null;
  instructor?: string;
  lesson_count?: number;
  certification_available?: boolean;
  prerequisites?: string[];
  tags?: string[];
}

// Type for user progress
export interface UserProgress {
  id: string;
  user_id: string;
  course_id: number;
  completion_percent: number;
  last_accessed: string | null;
}

// Mock courses data for development until proper database is set up
const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Introduction to AI',
    description: 'Learn the basics of artificial intelligence and its applications in today\'s world.',
    content: `
# Introduction to AI

## Section 1: What is Artificial Intelligence?
Artificial Intelligence (AI) refers to systems or machines that mimic human intelligence to perform tasks and can iteratively improve themselves based on the information they collect. AI manifests in a number of forms including:

1. **Narrow or Weak AI**: Systems designed to perform a specific task (like facial recognition)
2. **General or Strong AI**: Systems with generalized human cognitive abilities

## Section 2: Brief History of AI
- **1950s**: Alan Turing develops the Turing Test
- **1956**: The term "Artificial Intelligence" is coined at Dartmouth Conference
- **1960s-70s**: Early AI winter due to limited computing power
- **1980s**: Expert systems gain popularity
- **1990s-2000s**: Machine learning becomes prominent
- **2010s-Present**: Deep learning revolution with neural networks

## Section 3: Core AI Concepts
- **Machine Learning**: Algorithms that allow computers to learn from data
- **Neural Networks**: Computing systems inspired by the human brain
- **Natural Language Processing**: Enabling computers to understand human language
- **Computer Vision**: Allowing machines to "see" and interpret visual information

## Section 4: AI in Everyday Life
AI has become integrated into many aspects of daily life:
- Virtual assistants (Siri, Alexa)
- Recommendation systems (Netflix, Amazon)
- Email filtering and spam detection
- Smart homes and IoT devices
- Autonomous vehicles
    `,
    required_tier: 'freemium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'AI Fundamentals',
    difficulty: 'beginner',
    duration: 60,
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop',
    instructor: 'Dr. Ada Lovelace',
    lesson_count: 4,
    certification_available: true,
    tags: ['AI', 'machine learning', 'beginner']
  },
  {
    id: 2,
    title: 'Machine Learning Fundamentals',
    description: 'Understand core machine learning concepts, algorithms, and implementation strategies.',
    content: `
# Machine Learning Fundamentals

## Section 1: Understanding Machine Learning
Machine Learning (ML) is a subset of AI that focuses on building systems that learn from data. Instead of explicitly programming rules, ML algorithms identify patterns in data and make decisions with minimal human intervention.

Key concepts include:
- Supervised vs. Unsupervised Learning
- Training and Test Data
- Feature Engineering
- Model Evaluation

## Section 2: Supervised Learning Algorithms
Common supervised learning algorithms:
- Linear Regression
- Logistic Regression
- Decision Trees
- Random Forests
- Support Vector Machines (SVMs)
- Neural Networks

## Section 3: Unsupervised Learning
Unsupervised learning techniques:
- Clustering (K-means, hierarchical clustering)
- Dimensionality Reduction (PCA, t-SNE)
- Association Rule Learning
- Anomaly Detection

## Section 4: Practical ML Workflow
A typical machine learning workflow includes:
1. Problem Definition
2. Data Collection and Preparation
3. Feature Selection/Engineering
4. Algorithm Selection
5. Training and Validation
6. Hyperparameter Tuning
7. Evaluation
8. Deployment
    `,
    required_tier: 'basic',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Machine Learning',
    difficulty: 'intermediate',
    duration: 120,
    image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop',
    instructor: 'Prof. Alan Turing',
    lesson_count: 8,
    certification_available: true,
    prerequisites: ['Introduction to AI'],
    tags: ['machine learning', 'algorithms', 'data science']
  },
  {
    id: 3,
    title: 'Advanced AI Solutions',
    description: 'Learn to build and deploy advanced AI systems for complex real-world problems.',
    content: `
# Advanced AI Solutions

## Section 1: Deep Learning Architectures
Advanced neural network architectures:
- Convolutional Neural Networks (CNNs)
- Recurrent Neural Networks (RNNs)
- Long Short-Term Memory (LSTM)
- Transformer models
- Generative Adversarial Networks (GANs)

## Section 2: Natural Language Processing
Advanced NLP techniques:
- Word Embeddings (Word2Vec, GloVe)
- BERT, GPT and other transformer models
- Named Entity Recognition
- Sentiment Analysis
- Machine Translation

## Section 3: Computer Vision Applications
State-of-the-art computer vision:
- Object Detection (YOLO, R-CNN)
- Image Segmentation
- Facial Recognition
- Video Analysis
- 3D Vision

## Section 4: Reinforcement Learning
Reinforcement learning concepts:
- Markov Decision Processes
- Q-Learning
- Deep Q Networks
- Policy Gradient Methods
- Applications in robotics and gaming
    `,
    required_tier: 'pro',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Advanced AI',
    difficulty: 'advanced',
    duration: 180,
    image_url: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1470&auto=format&fit=crop',
    instructor: 'Dr. Geoffrey Hinton',
    lesson_count: 12,
    certification_available: true,
    prerequisites: ['Machine Learning Fundamentals', 'Programming with Python'],
    tags: ['deep learning', 'neural networks', 'advanced']
  },
  {
    id: 4,
    title: 'Prompt Engineering Masterclass',
    description: 'Master the art and science of crafting effective prompts for AI models to get optimal results.',
    content: `
# Prompt Engineering Masterclass

## Section 1: Introduction to Prompt Engineering
Prompt engineering is the process of designing and refining input prompts to get the best possible outputs from AI systems. This section covers:
- What is a prompt?
- Why prompt engineering matters
- The evolution of prompt-based interfaces
- Prompt engineering vs. traditional programming

## Section 2: Prompt Design Patterns
Learn essential patterns for effective prompts:
- Zero-shot, one-shot, and few-shot prompting
- Chain-of-thought prompting
- Self-consistency techniques
- Instruction-based prompts
- Role and persona assignment

## Section 3: Advanced Techniques
Take your prompt skills to the next level:
- Context window optimization
- Parameter efficiency
- Handling biases and limitations
- Multi-step reasoning
- Retrieval-augmented generation

## Section 4: Applied Prompt Engineering
Real-world applications across domains:
- Writing and content creation
- Code generation
- Image generation (DALL-E, Midjourney, Stable Diffusion)
- Business intelligence
- Creative problem-solving
    `,
    required_tier: 'basic',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'AI Applications',
    difficulty: 'intermediate',
    duration: 90,
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop',
    instructor: 'Sarah Chen',
    lesson_count: 6,
    certification_available: true,
    tags: ['prompt engineering', 'generative AI', 'LLMs']
  },
  {
    id: 5,
    title: 'AI Ethics and Responsible Innovation',
    description: 'Explore the ethical implications of AI and learn frameworks for responsible AI development.',
    content: `
# AI Ethics and Responsible Innovation

## Section 1: Understanding AI Ethics
The field of AI ethics examines the moral implications of developing and deploying AI systems:
- Key ethical principles in AI
- Fairness and bias
- Transparency and explainability
- Privacy considerations
- Accountability frameworks

## Section 2: Identifying and Mitigating Bias
Learn to recognize and address bias in AI systems:
- Sources of bias in data and algorithms
- Testing for algorithmic fairness
- Debiasing techniques
- Inclusive design practices
- Case studies of bias in deployed systems

## Section 3: Privacy and Data Governance
Best practices for responsible data usage:
- Data minimization principles
- Anonymization and differential privacy
- Consent frameworks
- Data governance models
- Regulatory considerations (GDPR, CCPA, etc.)

## Section 4: Building Responsible AI Systems
Practical approaches to ethical AI development:
- Ethics by design methodology
- AI impact assessments
- Documentation practices
- Stakeholder engagement
- Monitoring and iterative improvement
    `,
    required_tier: 'freemium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'AI Ethics',
    difficulty: 'beginner',
    duration: 75,
    image_url: 'https://images.unsplash.com/photo-1620063633168-8b971d8bbd0d?q=80&w=1470&auto=format&fit=crop',
    instructor: 'Dr. Timnit Gebru',
    lesson_count: 5,
    certification_available: false,
    tags: ['ethics', 'responsible AI', 'governance']
  },
  {
    id: 6,
    title: 'AI for Business Leaders',
    description: 'Strategic insights on implementing AI solutions to transform business operations and drive growth.',
    content: `
# AI for Business Leaders

## Section 1: AI Strategy Fundamentals
Building an effective AI strategy for your organization:
- AI value proposition and business impact
- Identifying AI opportunities
- Building vs. buying AI solutions
- Resource planning and infrastructure
- Creating an AI roadmap

## Section 2: AI Implementation Framework
A step-by-step approach to successful AI implementation:
- Problem identification and prioritization
- Data readiness assessment
- Talent and capability requirements
- Pilot project selection
- Scaling AI initiatives
- Measuring ROI and success

## Section 3: Change Management and Adoption
Managing the organizational impact of AI:
- Building AI literacy across the organization
- Managing workforce transformation
- Addressing resistance to AI adoption
- Fostering human-AI collaboration
- Creating a culture of innovation

## Section 4: Governance and Risk Management
Establishing proper oversight for AI systems:
- AI governance frameworks
- Regulatory compliance
- Risk assessment methodologies
- Ethical considerations for business
- Future-proofing AI investments
    `,
    required_tier: 'pro',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Business Strategy',
    difficulty: 'advanced',
    duration: 120,
    image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1471&auto=format&fit=crop',
    instructor: 'Emily Richardson',
    lesson_count: 8,
    certification_available: true,
    tags: ['business', 'strategy', 'leadership']
  },
  {
    id: 7,
    title: 'Applied Computer Vision',
    description: 'Practical applications of computer vision technologies across industries with hands-on projects.',
    content: `
# Applied Computer Vision

## Section 1: Computer Vision Fundamentals
Core concepts and building blocks of computer vision systems:
- Image representation and preprocessing
- Feature extraction techniques
- Object detection fundamentals
- Image segmentation basics
- Model evaluation metrics

## Section 2: Deep Learning for Computer Vision
Modern neural network approaches for vision tasks:
- CNN architectures (ResNet, EfficientNet, etc.)
- Transfer learning strategies
- Training techniques and optimization
- Data augmentation methods
- Handling limited training data

## Section 3: Industry Applications
Real-world implementations across sectors:
- Manufacturing quality control
- Medical imaging and diagnostics
- Retail analytics and inventory management
- Autonomous vehicles and navigation
- Security and surveillance systems
- Augmented reality integration

## Section 4: Building End-to-End Solutions
Developing complete computer vision applications:
- Project planning and requirements analysis
- Data collection and annotation
- Model selection and training
- Deployment architectures
- Monitoring and maintenance
- Edge deployment considerations
    `,
    required_tier: 'pro',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Computer Vision',
    difficulty: 'advanced',
    duration: 150,
    image_url: 'https://images.unsplash.com/photo-1650170496638-b05030a94005?q=80&w=1470&auto=format&fit=crop',
    instructor: 'Dr. Fei-Fei Li',
    lesson_count: 10,
    certification_available: true,
    prerequisites: ['Machine Learning Fundamentals'],
    tags: ['computer vision', 'deep learning', 'image processing']
  },
  {
    id: 8,
    title: 'Programming for AI with Python',
    description: 'Learn essential Python programming skills focused on AI and machine learning application development.',
    content: `
# Programming for AI with Python

## Section 1: Python Fundamentals for AI
Essential Python concepts with AI applications in mind:
- Data types and structures
- Control flow and functions
- Object-oriented programming
- File operations and I/O
- Package management and virtual environments

## Section 2: Data Manipulation and Analysis
Working with data using Python libraries:
- NumPy for numerical computing
- Pandas for data manipulation
- Data cleaning and preprocessing
- Exploratory data analysis
- Visualization with Matplotlib and Seaborn

## Section 3: Machine Learning with Python
Building ML systems using popular frameworks:
- Scikit-learn for traditional ML
- TensorFlow and Keras basics
- PyTorch fundamentals
- Model training and evaluation
- Hyperparameter tuning

## Section 4: Practical AI Programming
Applying Python skills to real AI projects:
- Building a recommendation system
- Creating a chatbot
- Implementing an image classifier
- Deployment with Flask/FastAPI
- Best practices for production code
    `,
    required_tier: 'basic',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: 'Programming',
    difficulty: 'intermediate',
    duration: 120,
    image_url: 'https://images.unsplash.com/photo-1649180556628-9ba704115795?q=80&w=1482&auto=format&fit=crop',
    instructor: 'Alex Johnson',
    lesson_count: 8,
    certification_available: true,
    tags: ['python', 'programming', 'data science']
  }
];

// Fetch course by ID - mocked for now
export const fetchCourseById = async (courseId: string): Promise<Course | null> => {
  // For a proper implementation, would query the database
  // const { data, error } = await supabase.from('courses').select('*').eq('id', parseInt(courseId, 10)).single();
  
  // For now, use mock data
  const course = mockCourses.find(c => c.id === parseInt(courseId, 10));
  return course || null;
};

// Get all courses
export const fetchAllCourses = async (): Promise<Course[]> => {
  // For a proper implementation, would query the database
  // const { data, error } = await supabase.from('courses').select('*');
  
  // For now, use mock data
  return [...mockCourses];
};

// Get courses by tier
export const fetchCoursesByTier = async (tier: string): Promise<Course[]> => {
  // For a proper implementation, would query the database
  // const { data, error } = await supabase.from('courses').select('*').eq('required_tier', tier);
  
  // For now, use mock data
  if (tier === 'all') return [...mockCourses];
  return mockCourses.filter(course => course.required_tier === tier);
};

// Get courses by category
export const fetchCoursesByCategory = async (category: string): Promise<Course[]> => {
  // For a proper implementation, would query the database
  // const { data, error } = await supabase.from('courses').select('*').eq('category', category);
  
  // For now, use mock data
  return mockCourses.filter(course => course.category === category);
};

// Get or initialize user progress
export const getOrInitUserProgress = async (userId: string, courseId: number): Promise<UserProgress | null> => {
  if (!userId) return null;
  
  try {
    // Check if progress entry exists
    const { data: existing, error: queryError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .maybeSingle();
      
    if (queryError) throw queryError;
    
    if (existing) {
      return existing as UserProgress;
    } else {
      // Create new progress entry
      const newProgress: Omit<UserProgress, 'id'> = {
        user_id: userId,
        course_id: courseId,
        completion_percent: 0,
        last_accessed: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('user_progress')
        .insert(newProgress)
        .select()
        .single();
        
      if (error) throw error;
      return data as UserProgress;
    }
  } catch (error) {
    console.error("Error with user progress:", error);
    return null;
  }
};

// Update user progress
export const updateUserProgress = async (
  userId: string, 
  courseId: number, 
  progress: number
): Promise<boolean> => {
  if (!userId) return false;
  
  try {
    const { error } = await supabase
      .from('user_progress')
      .update({ 
        completion_percent: progress,
        last_accessed: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('course_id', courseId);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating progress:", error);
    return false;
  }
};

// Get course categories
export const getCourseCategories = (): string[] => {
  const categories = new Set(mockCourses.map(course => course.category || ''));
  return Array.from(categories).filter(Boolean);
};

// Get course difficulty levels
export const getCourseDifficulties = (): string[] => {
  const difficulties = new Set(mockCourses.map(course => course.difficulty || ''));
  return Array.from(difficulties).filter(Boolean);
};

// Search courses
export const searchCourses = (query: string): Course[] => {
  const lowerQuery = query.toLowerCase();
  return mockCourses.filter(course => 
    course.title.toLowerCase().includes(lowerQuery) ||
    (course.description && course.description.toLowerCase().includes(lowerQuery)) ||
    (course.category && course.category.toLowerCase().includes(lowerQuery)) ||
    (course.tags && course.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
  );
};
