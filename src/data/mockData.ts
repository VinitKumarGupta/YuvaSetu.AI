export interface Internship {
  id: string;
  title: string;
  company: string;
  sector: string;
  skills: string[];
  location: string;
  duration: string;
  stipend: string;
  description: string;
  requirements: string[];
  matchScore: number;
  matchReason: {
    skills: string[];
    sector: string;
  };
}

export const mockInternships: Internship[] = [
  {
    id: '1',
    title: 'Digital Marketing Intern',
    company: 'TechCorp India',
    sector: 'Technology',
    skills: ['Digital Marketing', 'Social Media', 'Content Writing'],
    location: 'Mumbai, Maharashtra',
    duration: '3 months',
    stipend: '₹15,000/month',
    description: 'Join our dynamic marketing team to create engaging digital campaigns and grow our online presence.',
    requirements: ['Basic knowledge of social media platforms', 'Good communication skills', 'Creative mindset'],
    matchScore: 92,
    matchReason: {
      skills: ['Digital Marketing', 'Content Writing'],
      sector: 'Technology'
    }
  },
  {
    id: '2',
    title: 'Software Development Intern',
    company: 'InnovateTech Solutions',
    sector: 'Technology',
    skills: ['JavaScript', 'React', 'Node.js'],
    location: 'Bangalore, Karnataka',
    duration: '6 months',
    stipend: '₹20,000/month',
    description: 'Work with our engineering team to build cutting-edge web applications and learn modern development practices.',
    requirements: ['Knowledge of JavaScript', 'Understanding of web development concepts', 'Problem-solving skills'],
    matchScore: 88,
    matchReason: {
      skills: ['JavaScript', 'React'],
      sector: 'Technology'
    }
  },
  {
    id: '3',
    title: 'Graphic Design Intern',
    company: 'Creative Studio Pro',
    sector: 'Design',
    skills: ['Graphic Design', 'Adobe Creative Suite', 'UI/UX Design'],
    location: 'Delhi, Delhi',
    duration: '4 months',
    stipend: '₹12,000/month',
    description: 'Create visually stunning designs for digital and print media while learning from experienced designers.',
    requirements: ['Proficiency in design software', 'Creative portfolio', 'Attention to detail'],
    matchScore: 85,
    matchReason: {
      skills: ['Graphic Design', 'UI/UX Design'],
      sector: 'Design'
    }
  },
  {
    id: '4',
    title: 'Business Analyst Intern',
    company: 'FinanceFirst Consulting',
    sector: 'Finance',
    skills: ['Data Analysis', 'Excel', 'Business Intelligence'],
    location: 'Pune, Maharashtra',
    duration: '3 months',
    stipend: '₹18,000/month',
    description: 'Analyze business processes and help optimize operations through data-driven insights.',
    requirements: ['Strong analytical skills', 'Proficiency in Excel', 'Business acumen'],
    matchScore: 78,
    matchReason: {
      skills: ['Data Analysis', 'Excel'],
      sector: 'Finance'
    }
  },
  {
    id: '5',
    title: 'Content Writing Intern',
    company: 'MediaMagnet Agency',
    sector: 'Media',
    skills: ['Content Writing', 'SEO', 'Research'],
    location: 'Chennai, Tamil Nadu',
    duration: '2 months',
    stipend: '₹10,000/month',
    description: 'Create engaging content for various digital platforms and learn SEO best practices.',
    requirements: ['Excellent writing skills', 'Research abilities', 'Creativity'],
    matchScore: 90,
    matchReason: {
      skills: ['Content Writing', 'SEO'],
      sector: 'Media'
    }
  }
];

export const skillsData = [
  { name: 'JavaScript', icon: '💻' },
  { name: 'Python', icon: '🐍' },
  { name: 'React', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Digital Marketing', icon: '📱' },
  { name: 'Content Writing', icon: '✍️' },
  { name: 'Graphic Design', icon: '🎨' },
  { name: 'Data Analysis', icon: '📊' },
  { name: 'UI/UX Design', icon: '🎯' },
  { name: 'Social Media', icon: '📲' },
  { name: 'SEO', icon: '🔍' },
  { name: 'Excel', icon: '📈' },
  { name: 'Adobe Creative Suite', icon: '🎭' },
  { name: 'Business Intelligence', icon: '💼' },
  { name: 'Research', icon: '🔬' },
];

export const sectorsData = [
  { name: 'Technology', icon: '💻', color: 'bg-blue-500' },
  { name: 'Finance', icon: '💰', color: 'bg-green-500' },
  { name: 'Healthcare', icon: '🏥', color: 'bg-red-500' },
  { name: 'Education', icon: '📚', color: 'bg-purple-500' },
  { name: 'Media', icon: '📺', color: 'bg-pink-500' },
  { name: 'Design', icon: '🎨', color: 'bg-orange-500' },
  { name: 'Marketing', icon: '📢', color: 'bg-yellow-500' },
  { name: 'Manufacturing', icon: '🏭', color: 'bg-gray-500' },
];

export const educationOptions = [
  '10th Pass',
  '12th Pass',
  'Diploma',
  'Graduate',
  'Post Graduate',
  'PhD',
];

export const locationOptions = [
  'Mumbai, Maharashtra',
  'Delhi, Delhi',
  'Bangalore, Karnataka',
  'Hyderabad, Telangana',
  'Chennai, Tamil Nadu',
  'Kolkata, West Bengal',
  'Pune, Maharashtra',
  'Ahmedabad, Gujarat',
  'Surat, Gujarat',
  'Jaipur, Rajasthan',
];

export const learningResources = [
  {
    id: '1',
    title: 'Digital India Portal',
    description: 'Government initiatives and digital literacy programs',
    url: 'https://digitalindia.gov.in',
    category: 'Government',
    icon: '🇮🇳'
  },
  {
    id: '2',
    title: 'Spoken Tutorial',
    description: 'Free tutorials on software and programming',
    url: 'https://spoken-tutorial.org',
    category: 'Technology',
    icon: '🎓'
  },
  {
    id: '3',
    title: 'PM Skill Development',
    description: 'Skill development schemes and training programs',
    url: 'https://pmkvyofficial.org',
    category: 'Skills',
    icon: '🛠️'
  },
  {
    id: '4',
    title: 'Coursera for Campus',
    description: 'Free online courses from top universities',
    url: 'https://coursera.org',
    category: 'Education',
    icon: '🎯'
  },
  {
    id: '5',
    title: 'Khan Academy',
    description: 'Free world-class education for anyone, anywhere',
    url: 'https://khanacademy.org',
    category: 'Education',
    icon: '📚'
  },
  {
    id: '6',
    title: 'GeeksforGeeks',
    description: 'Programming tutorials and interview preparation',
    url: 'https://geeksforgeeks.org',
    category: 'Technology',
    icon: '💻'
  }
];