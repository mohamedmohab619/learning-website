import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Play, ArrowRight, CheckCircle, Star } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Courses',
      description: 'Learn React through hands-on projects and real-world examples',
    },
    {
      icon: Play,
      title: 'Video Lessons',
      description: 'High-quality video content with custom player controls',
    },
    {
      icon: Award,
      title: 'Certificates',
      description: 'Earn certificates upon course completion',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join thousands of learners in our supportive community',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Frontend Developer',
      content:
        "This platform helped me master React in just 3 months. The interactive lessons are amazing!",
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Mike Chen',
      role: 'Software Engineer',
      content:
        "The best React learning experience I've had. Highly recommended for beginners and advanced developers.",
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Full-Stack Developer',
      content:
        "The project-based approach made learning React so much easier. I landed my dream job!",
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Students' },
    { number: '150+', label: 'Courses' },
    { number: '25K+', label: 'Certificates' },
    { number: '4.9', label: 'Rating' },
  ];

  return (
    <div className="min-h-screen">
      <section className="py-25 bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 items-center relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-white">
                Master React Development with
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Interactive Learning</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Join thousands of developers learning React through our comprehensive,
                project-based courses. From beginner to advanced, we've got you covered
                with hands-on lessons, real-world projects, and expert guidance.
              </p>
              <div className="flex gap-4 mb-12 flex-wrap">
                <Link to="/home" className="px-8 py-4 rounded-lg font-semibold text-lg bg-white text-indigo-600 hover:bg-gray-50 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2">
                  Start Learning Free
                  <ArrowRight size={20} />
                </Link>
                <button className="px-8 py-4 rounded-lg font-semibold text-lg bg-white/20 text-white border-2 border-white hover:bg-white hover:text-indigo-600 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2">
                  <Play size={20} />
                  Watch Demo
                </button>
              </div>
              <div className="flex gap-8 flex-wrap">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <span className="block text-3xl font-bold text-white mb-1">{stat.number}</span>
                    <span className="text-sm text-white/80 font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center items-center relative">
              <div className="relative w-96 h-96 md:w-[400px] md:h-[400px]">
                <div className="absolute top-5 left-5 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 text-center animate-[float_3s_ease-in-out_infinite]">
                  <div className="text-4xl mb-3">⚛️</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">React Fundamentals</h4>
                    <p className="text-white/80 text-sm">Start your journey</p>
                  </div>
                </div>
                <div className="absolute top-30 right-5 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 text-center animate-[float_3s_ease-in-out_infinite] [animation-delay:1s]">
                  <div className="text-4xl mb-3">🎯</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Interactive Projects</h4>
                    <p className="text-white/80 text-sm">Build real apps</p>
                  </div>
                </div>
                <div className="absolute bottom-5 left-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 text-center animate-[float_3s_ease-in-out_infinite] [animation-delay:2s]">
                  <div className="text-4xl mb-3">🏆</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Get Certified</h4>
                    <p className="text-white/80 text-sm">Earn certificates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-25 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Why Choose Our Platform?</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              We provide the most comprehensive and interactive React learning experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-md transition-transform hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-5 text-white">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-25 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">What Our Students Say</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Join thousands of successful developers who learned React with us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-8 transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-15 h-15 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-slate-800 mb-1">{testimonial.name}</h4>
                    <p className="text-slate-500 text-sm mb-2">{testimonial.role}</p>
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-500 leading-relaxed italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-25 bg-gradient-to-br from-slate-800 to-slate-700 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your React Journey?</h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Join our community of developers and start building amazing React applications today
            </p>
            <div className="flex gap-4 justify-center mb-8 flex-wrap">
              <Link to="/home" className="px-8 py-4 rounded-lg font-semibold text-lg bg-white text-indigo-600 hover:bg-gray-50 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2">
                Get Started Now
                <ArrowRight size={20} />
              </Link>
              <Link to="/home" className="px-8 py-4 rounded-lg font-semibold text-lg bg-white/20 text-white border-2 border-white hover:bg-white hover:text-indigo-600 transition-all transform hover:-translate-y-0.5">
                Browse Courses
              </Link>
            </div>
            <div className="flex gap-6 justify-center flex-wrap">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle size={20} />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle size={20} />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle size={20} />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

