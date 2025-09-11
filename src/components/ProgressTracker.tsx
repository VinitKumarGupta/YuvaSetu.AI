import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Target, TrendingUp, Award, BookOpen } from 'lucide-react';

interface ProgressData {
  applicationsSubmitted: number;
  interviewsScheduled: number;
  offersReceived: number;
  skillsLearned: number;
  profileCompleteness: number;
  streak: number;
}

const ProgressTracker: React.FC = () => {
  const [progress, setProgress] = useState<ProgressData>({
    applicationsSubmitted: 0,
    interviewsScheduled: 0,
    offersReceived: 0,
    skillsLearned: 0,
    profileCompleteness: 0,
    streak: 0
  });

  const [animatedProgress, setAnimatedProgress] = useState<ProgressData>({
    applicationsSubmitted: 0,
    interviewsScheduled: 0,
    offersReceived: 0,
    skillsLearned: 0,
    profileCompleteness: 0,
    streak: 0
  });

  useEffect(() => {
    // Simulate loading progress data
    const targetProgress: ProgressData = {
      applicationsSubmitted: 12,
      interviewsScheduled: 4,
      offersReceived: 2,
      skillsLearned: 8,
      profileCompleteness: 85,
      streak: 15
    };

    setProgress(targetProgress);

    // Animate progress bars
    const animateProgress = () => {
      const interval = setInterval(() => {
        setAnimatedProgress(prev => {
          const newProgress = { ...prev };
          let allComplete = true;

          Object.keys(targetProgress).forEach(key => {
            const target = targetProgress[key as keyof ProgressData];
            const current = prev[key as keyof ProgressData];
            
            if (current < target) {
              newProgress[key as keyof ProgressData] = Math.min(current + 1, target);
              allComplete = false;
            }
          });

          if (allComplete) {
            clearInterval(interval);
          }

          return newProgress;
        });
      }, 50);

      return () => clearInterval(interval);
    };

    const cleanup = animateProgress();
    return cleanup;
  }, []);

  const achievements = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "First Application",
      description: "Submitted your first internship application",
      unlocked: progress.applicationsSubmitted >= 1,
      color: "text-green-600 bg-green-100"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Interview Ready",
      description: "Scheduled your first interview",
      unlocked: progress.interviewsScheduled >= 1,
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Offer Received",
      description: "Got your first internship offer",
      unlocked: progress.offersReceived >= 1,
      color: "text-purple-600 bg-purple-100"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Skill Builder",
      description: "Learned 5 new skills",
      unlocked: progress.skillsLearned >= 5,
      color: "text-orange-600 bg-orange-100"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-8 h-8 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
        </div>
        <div className="text-sm text-gray-500">
          Keep up the great work! 🔥
        </div>
      </div>

      {/* Streak Counter */}
      <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Daily Streak</h3>
            <p className="text-gray-600">Days of consistent activity</p>
          </div>
          <div className="text-4xl font-bold text-orange-600">
            {animatedProgress.streak}
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((animatedProgress.streak / 30) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {30 - animatedProgress.streak} days to reach 30-day milestone
          </p>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {animatedProgress.applicationsSubmitted}
          </div>
          <div className="text-sm text-gray-600">Applications</div>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {animatedProgress.interviewsScheduled}
          </div>
          <div className="text-sm text-gray-600">Interviews</div>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Award className="w-8 h-8 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {animatedProgress.offersReceived}
          </div>
          <div className="text-sm text-gray-600">Offers</div>
        </div>
      </div>

      {/* Profile Completeness */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Profile Completeness</h3>
          <span className="text-sm font-medium text-gray-600">
            {animatedProgress.profileCompleteness}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${animatedProgress.profileCompleteness}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Complete your profile to get better recommendations
        </p>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className={`p-4 rounded-xl border-2 transition-all ${
                achievement.unlocked 
                  ? `${achievement.color} border-current` 
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  achievement.unlocked ? achievement.color : 'bg-gray-200 text-gray-400'
                }`}>
                  {achievement.icon}
                </div>
                <div>
                  <h4 className={`font-semibold ${
                    achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${
                    achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;