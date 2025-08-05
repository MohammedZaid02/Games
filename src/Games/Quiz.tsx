import React, { useState, useEffect, useCallback } from 'react';

// Types
interface Question {
  question: string;
  options: string[];
  correct: number;
  reference: string;
  category: string;
  source: string;
  date: string;
}

interface NewsArticle {
  title: string;
  author: string;
  publishedAt: string;
  source: string;
  content: string;
  urlToImage: string;
  url: string;
}

// Mock news data - expanded with more questions for dynamic rotation
const mockNewsData: Question[] = [
  {
    question: "What major AI policy initiative did the Trump administration announce in July 2025?",
    options: ["Complete AI ban", "Removal of red tape for AI development", "AI tax increases", "Mandatory AI audits"],
    correct: 1,
    reference: "https://www.cnn.com/2025/07/23/tech/ai-action-plan-trump",
    category: "Technology",
    source: "CNN Business",
    date: "2025-07-23"
  },
  {
    question: "According to 2025 reports, what percentage of global greenhouse gas emissions could AI help mitigate by 2030?",
    options: ["1-2%", "5-10%", "15-20%", "25-30%"],
    correct: 1,
    reference: "https://caad.info/analysis/reports/generating-ai-crisis-big-tech-breaking-climate-commitments-to-chase-ai-hype/",
    category: "Environment",
    source: "Climate Action Against Disinformation",
    date: "2025-07-15"
  },
  {
    question: "How much is Apple planning to spend on US manufacturing and data centers over the next four years?",
    options: ["$100 billion", "$250 billion", "$500 billion", "$750 billion"],
    correct: 2,
    reference: "https://www.technologyreview.com/2025/05/20/1116327/ai-energy-usage-climate-footprint-big-tech/",
    category: "Technology",
    source: "MIT Technology Review",
    date: "2025-05-20"
  },
  {
    question: "By what percentage did climate tech funding fall in 2024 as investors moved to AI?",
    options: ["20%", "30%", "40%", "50%"],
    correct: 2,
    reference: "https://www.bloomberg.com/news/articles/2025-01-30/investors-rushed-to-ai-as-climate-tech-funding-fell-40-in-2024",
    category: "Finance",
    source: "Bloomberg",
    date: "2025-01-30"
  },
  {
    question: "What breakthrough cooling technology was developed using AI in July 2025?",
    options: ["Super-cooling chips", "Solar radiation reflecting paint", "Smart air conditioning", "Quantum cooling systems"],
    correct: 1,
    reference: "https://www.crescendo.ai/news/latest-ai-news-and-updates",
    category: "Innovation",
    source: "Crescendo AI",
    date: "2025-07-02"
  },
  {
    question: "How much does Google expect to spend on AI infrastructure alone in 2025?",
    options: ["$25 billion", "$50 billion", "$75 billion", "$100 billion"],
    correct: 2,
    reference: "https://www.technologyreview.com/2025/05/20/1116327/ai-energy-usage-climate-footprint-big-tech/",
    category: "Technology",
    source: "MIT Technology Review",
    date: "2025-05-20"
  },
  {
    question: "Which company received a Responsible AI Impact Award at London Climate Action Week 2025?",
    options: ["Google", "Microsoft", "SAP", "Amazon"],
    correct: 2,
    reference: "https://news.sap.com/2025/07/sap-responsible-ai-impact-award-london-climate-week/",
    category: "Environment",
    source: "SAP News",
    date: "2025-07-10"
  },
  {
    question: "According to 2025 trends, what is the new focus of financial inclusion beyond bank accounts?",
    options: ["Mobile payments only", "Cryptocurrency adoption", "Full spectrum financial services interaction", "Digital wallets"],
    correct: 2,
    reference: "https://www.weforum.org/stories/2025/06/emerging-markets-future-of-finance-ai/",
    category: "Finance",
    source: "World Economic Forum",
    date: "2025-06-15"
  },
  {
    question: "By how much can AI-powered cooling paint reduce energy consumption in hot climates?",
    options: ["15%", "20%", "30%", "45%"],
    correct: 2,
    reference: "https://www.crescendo.ai/news/latest-ai-news-and-updates",
    category: "Innovation",
    source: "Crescendo AI",
    date: "2025-07-02"
  },
  {
    question: "What major infrastructure changes is the Trump administration planning for AI development?",
    options: ["New AI universities", "Streamlined permits for data centers", "AI research grants", "Public AI networks"],
    correct: 1,
    reference: "https://www.npr.org/2025/07/23/nx-s1-5213904/trump-ai-regulations",
    category: "Technology",
    source: "NPR",
    date: "2025-07-23"
  },
  // Additional questions for better rotation
  {
    question: "What is the expected energy consumption percentage of AI data centers by 2030?",
    options: ["1-2%", "3-8%", "10-15%", "20-25%"],
    correct: 1,
    reference: "https://www.technologyreview.com/2025/05/20/ai-energy-consumption",
    category: "Technology",
    source: "MIT Technology Review",
    date: "2025-05-20"
  },
  {
    question: "Which sector showed the highest adoption rate of AI solutions in 2025?",
    options: ["Healthcare", "Finance", "Manufacturing", "Agriculture"],
    correct: 1,
    reference: "https://www.forbes.com/2025/06/ai-adoption-sectors",
    category: "Business",
    source: "Forbes",
    date: "2025-06-10"
  },
  {
    question: "What is the projected market value of AI-powered climate solutions by 2030?",
    options: ["$50 billion", "$150 billion", "$300 billion", "$500 billion"],
    correct: 2,
    reference: "https://www.climatetechreview.com/2025/market-forecast",
    category: "Environment",
    source: "Climate Tech Review",
    date: "2025-07-05"
  },
  {
    question: "Which country announced the largest AI research investment program in 2025?",
    options: ["United States", "China", "European Union", "United Kingdom"],
    correct: 0,
    reference: "https://www.techcrunch.com/2025/07/ai-investment-global",
    category: "Technology",
    source: "TechCrunch",
    date: "2025-07-18"
  },
  {
    question: "What percentage of Fortune 500 companies have implemented AI governance frameworks by 2025?",
    options: ["35%", "55%", "75%", "90%"],
    correct: 2,
    reference: "https://www.mckinsey.com/2025/ai-governance-report",
    category: "Business",
    source: "McKinsey",
    date: "2025-06-25"
  }
];

const Quiz: React.FC = () => {
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<NewsArticle | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Dynamic question selection - ensures different questions on each refresh
  const fetchNewsQuestions = useCallback(async (): Promise<Question[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Shuffle the entire question pool and select 5 random questions
        const shuffled = [...mockNewsData].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 5);
        // Further randomize the order
        const randomized = selected.sort(() => Math.random() - 0.5);
        resolve(randomized);
      }, 1500);
    });
  }, []);

  const loadQuiz = useCallback(async () => {
    setIsLoading(true);
    setShowResults(false);
    setQuizSubmitted(false);
    setSelectedAnswers({});
    setScore(0);
    
    try {
      const questions = await fetchNewsQuestions();
      setCurrentQuestions(questions);
    } catch (error) {
      console.error('Error loading quiz:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchNewsQuestions]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadQuiz();
    }, 1000);
    return () => clearTimeout(timer);
  }, [loadQuiz]);

  const selectAnswer = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const submitQuiz = async () => {
    if (quizSubmitted) return;
    
    setQuizSubmitted(true);
    
    let correctCount = 0;
    currentQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correctCount++;
      }
    });
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setScore(correctCount);
    setShowResults(true);
  };

  const refreshQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setShowResults(false);
    loadQuiz();
  };

  const showReference = async (category: string, questionIndex: number) => {
    setShowModal(true);
    setModalLoading(true);
    
    try {
      const newsData = await fetchNewsArticle(category, questionIndex);
      setModalContent(newsData);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setModalLoading(false);
    }
  };

  const fetchNewsArticle = async (category: string, questionIndex: number): Promise<NewsArticle> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockArticles: {[key: string]: NewsArticle} = {
          "Technology": {
            title: "Trump Administration Unveils AI Action Plan to Cement US Leadership",
            author: "Tech Reporter Sarah Kim",
            publishedAt: "2025-07-23T15:30:00Z",
            source: "CNN Business",
            content: "The Trump administration on Wednesday unveiled its comprehensive AI action plan, a groundbreaking package of initiatives and policy recommendations designed to cement the United States' position as the undisputed global leader in artificial intelligence technology.\n\nThe plan centers on removing regulatory barriers that administration officials argue have hindered Silicon Valley's AI development efforts. 'We're going to cut the red tape and unleash American innovation,' President Trump declared during the announcement ceremony at the White House.\n\nKey provisions include streamlined permits for data centers and semiconductor plants, along with the energy infrastructure needed to power them. The administration will also roll back certain Biden-era regulations, particularly those related to diversity, equity, and inclusion requirements for semiconductor plant subsidies.\n\n'This isn't just about winning the AI race—it's about defining the future of human civilization,' said newly appointed AI Czar Dr. Jennifer Martinez. The plan includes $50 billion in federal investment over five years, focusing on research partnerships between government and private sector.\n\nThe initiative has drawn praise from tech leaders but criticism from environmental groups concerned about the energy demands of large-scale AI operations. Industry experts predict this could accelerate AI development timelines by 2-3 years.\n\nMajor tech companies have already signaled strong support, with several announcing plans to expand US operations in response to the more favorable regulatory environment.",
            urlToImage: "https://example.com/ai-action-plan.jpg",
            url: "https://www.cnn.com/2025/07/23/tech/ai-action-plan-trump"
          },
          "Environment": {
            title: "AI Could Help Mitigate 10% of Global Emissions by 2030, New Report Reveals",
            author: "Climate Specialist Dr. Maria Santos",
            publishedAt: "2025-07-15T11:45:00Z",
            source: "Climate Action Against Disinformation",
            content: "Artificial intelligence has the potential to help mitigate between 5% and 10% of global greenhouse gas emissions by 2030, according to a comprehensive new analysis released this week by leading climate researchers.\n\nThe report, compiled by the Climate Action Against Disinformation coalition, examines how AI applications across multiple sectors could significantly accelerate decarbonization efforts. Key areas include smart grid optimization, precision agriculture, and automated building energy management.\n\n'AI isn't just transforming how we live and work—it's becoming our most powerful tool in the fight against climate change,' said lead researcher Dr. Elena Rodriguez. The analysis shows AI could optimize energy consumption in buildings by up to 40% and reduce agricultural emissions through precision farming techniques.\n\nHowever, the report also warns about the growing energy footprint of AI systems themselves. Data centers powering AI applications are projected to consume 3-8% of global electricity by 2030, creating a significant challenge for the technology's net climate impact.\n\nThe study recommends immediate action to ensure AI development prioritizes energy efficiency and renewable power sources. Several tech giants have already committed to powering their AI operations entirely through clean energy by 2027.\n\n'The next five years will determine whether AI becomes climate change's solution or exacerbates the problem,' the report concludes.",
            urlToImage: "https://example.com/ai-climate-impact.jpg",
            url: "https://caad.info/analysis/reports/generating-ai-crisis-big-tech-breaking-climate-commitments-to-chase-ai-hype/"
          },
          "Innovation": {
            title: "AI-Designed Paint Could Revolutionize Building Cooling, Cut Energy Use by 30%",
            author: "Science Writer Dr. James Chen",
            publishedAt: "2025-07-02T14:20:00Z",
            source: "Crescendo AI",
            content: "Scientists have successfully used artificial intelligence to develop a revolutionary paint formula that can keep buildings significantly cooler by reflecting solar radiation, potentially reducing energy consumption in hot climates by up to 30%.\n\nThe breakthrough, announced by researchers at Stanford University, represents a major advancement in passive cooling technology. The AI system analyzed thousands of material combinations to identify the optimal formula for maximum solar reflectance while maintaining durability and cost-effectiveness.\n\n'Traditional cooling solutions require enormous amounts of energy,' explained lead researcher Dr. Lisa Wang. 'This paint literally turns buildings into passive cooling systems that work 24/7 without any electricity.'\n\nThe AI-designed coating reflects 98.1% of sunlight while simultaneously radiating heat into space, creating a cooling effect even in direct sunlight. Field tests in Phoenix, Arizona, showed surface temperature reductions of up to 15°C compared to conventional paint.\n\nCommercial applications are expected to begin within 18 months, with major paint manufacturers already licensing the technology. The innovation could be particularly transformative in developing countries where air conditioning is often unaffordable or unavailable.\n\nEnvironmental impact assessments suggest widespread adoption could reduce global cooling-related emissions by 5% while improving living conditions for billions of people in hot climates.",
            urlToImage: "https://example.com/cooling-paint.jpg",
            url: "https://www.crescendo.ai/news/latest-ai-news-and-updates"
          },
          "Finance": {
            title: "Climate Tech Funding Plummets 40% as Investors Rush to AI Opportunities",
            author: "Financial Analyst Michael Thompson",
            publishedAt: "2025-01-30T09:15:00Z",
            source: "Bloomberg",
            content: "Equity financing for climate technologies plummeted by 40% in 2024 as investors pivoted dramatically toward artificial intelligence opportunities, creating significant challenges for emerging decarbonization efforts worldwide.\n\nThe shift represents one of the most dramatic reallocations of venture capital in recent history, with AI startups raising $180 billion globally while climate tech companies secured just $12 billion in equity funding—down from $20 billion in 2023.\n\n'We're seeing an unprecedented flight to AI investments,' said venture capital analyst Dr. Rebecca Martinez. 'Investors are betting that AI will generate returns faster than climate solutions, but this could create serious long-term consequences for decarbonization goals.'\n\nThe funding drought has forced several promising climate startups to delay commercialization plans or seek alternative financing. Solar manufacturing innovations, carbon capture technologies, and green hydrogen projects have been particularly affected.\n\nHowever, some investors argue the trend could be temporary. 'AI and climate tech aren't mutually exclusive,' noted GreenTech Ventures partner David Chen. 'Many of the most promising climate solutions now incorporate AI capabilities.'\n\nGovernment intervention appears likely, with the EU and several US states considering dedicated climate tech funding programs to bridge the investment gap. The Biden administration's climate initiatives provided some support, but private sector funding remains crucial for scaling innovative solutions.",
            urlToImage: "https://example.com/climate-funding.jpg",
            url: "https://www.bloomberg.com/news/articles/2025-01-30/investors-rushed-to-ai-as-climate-tech-funding-fell-40-in-2024"
          },
          "Business": {
            title: "Fortune 500 Companies Accelerate AI Governance Implementation",
            author: "Business Analyst Jennifer Wu",
            publishedAt: "2025-06-25T13:20:00Z",
            source: "McKinsey",
            content: "A comprehensive new study reveals that 75% of Fortune 500 companies have now implemented formal AI governance frameworks, marking a significant acceleration in corporate AI responsibility practices throughout 2025.\n\nThe research, conducted by McKinsey & Company, shows a dramatic increase from just 35% in early 2024, driven by regulatory pressures, stakeholder demands, and high-profile AI incidents that highlighted the need for better oversight.\n\n'We're witnessing a fundamental shift in how enterprises approach AI deployment,' said study lead Dr. Amanda Foster. 'Companies are moving beyond simple compliance to create comprehensive governance structures that enable innovation while managing risks.'\n\nThe most comprehensive frameworks include ethics committees, algorithmic auditing processes, and dedicated AI risk management teams. Leading companies are investing an average of $2.3 million annually in AI governance infrastructure.\n\nSectors showing the highest governance adoption rates include healthcare (89%), financial services (84%), and telecommunications (78%). Manufacturing companies lag behind at 62%, though this represents significant improvement from 28% in 2024.\n\nThe study also reveals that companies with robust AI governance frameworks report 23% fewer AI-related incidents and 31% higher stakeholder trust scores compared to those with minimal oversight structures.",
            urlToImage: "https://example.com/ai-governance.jpg",
            url: "https://www.mckinsey.com/2025/ai-governance-report"
          }
        };

        const categoryKeys = Object.keys(mockArticles);
        const selectedCategory = categoryKeys.find(cat => cat === category) || categoryKeys[questionIndex % categoryKeys.length];
        resolve(mockArticles[selectedCategory]);
      }, 1500);
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
    setModalLoading(false);
  };

  const shareArticle = (title: string, url: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${title} - ${url}`).then(() => {
        alert('Article link copied to clipboard!');
      }).catch(() => {
        alert(`Share this article: ${title} - ${url}`);
      });
    }
  };

  const isSubmitDisabled = Object.keys(selectedAnswers).length !== currentQuestions.length || quizSubmitted;
  const percentage = currentQuestions.length > 0 ? Math.round((score / currentQuestions.length) * 100) : 0;

  let resultMessage = "";
  let resultEmoji = "";
  if (percentage >= 80) {
    resultMessage = "Outstanding! You're well-informed about current events!";
    resultEmoji = "🏆";
  } else if (percentage >= 60) {
    resultMessage = "Good job! You have a solid grasp of recent news.";
    resultEmoji = "👏";
  } else if (percentage >= 40) {
    resultMessage = "Not bad! Consider reading more news to stay updated.";
    resultEmoji = "📚";
  } else {
    resultMessage = "Keep learning! Stay curious about world events.";
    resultEmoji = "💪";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-700 flex items-center justify-center overflow-x-hidden p-4">
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        
        @keyframes titlePulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes popIn {
          0% { transform: scale(0) rotate(180deg); }
          50% { transform: scale(1.2) rotate(90deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes correctPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes incorrectShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes resultsFadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes scoreCount {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes modalSlideIn {
          from { transform: scale(0.8); }
          to { transform: scale(1); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .shimmer::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: rotate(45deg);
          animation: shimmer 3s infinite;
        }
        
        .title-pulse {
          animation: titlePulse 2s ease-in-out infinite alternate;
        }
        
        .fade-in-up {
          opacity: 0;
          animation: fadeInUp 1s ease-out 0.5s forwards;
        }
        
        .pop-in {
          transform: scale(0);
          animation: popIn 0.5s ease-out forwards;
        }
        
        .slide-in-left {
          opacity: 0;
          transform: translateX(-50px);
          animation: slideInLeft 0.6s ease-out forwards;
        }
        
        .slide-in-right {
          opacity: 0;
          transform: translateX(50px);
          animation: slideInRight 0.6s ease-out forwards;
        }
        
        .rotate {
          animation: rotate 2s linear infinite;
        }
        
        .correct-pulse {
          animation: correctPulse 0.6s ease-in-out;
        }
        
        .incorrect-shake {
          animation: incorrectShake 0.6s ease-in-out;
        }
        
        .results-fade-in {
          opacity: 0;
          transform: scale(0.8);
          animation: resultsFadeIn 0.8s ease-out forwards;
        }
        
        .score-count {
          animation: scoreCount 2s ease-out;
        }
        
        .modal-fade-in {
          opacity: 0;
          animation: modalFadeIn 0.3s ease-out forwards;
        }
        
        .modal-slide-in {
          transform: scale(0.8);
          animation: modalSlideIn 0.3s ease-out 0.1s forwards;
        }
        
        .hover-effect {
          transition: all 0.3s ease;
        }
        
        .hover-effect:hover {
          transform: scale(1.05);
        }
        
        .option-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
          transition: left 0.5s;
        }
        
        .option-hover:hover::before {
          left: 100%;
        }
        
        .btn-shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s;
        }
        
        .btn-shimmer:hover::before {
          left: 100%;
        }
      `}</style>
      
      <div className="max-w-4xl w-full bg-white/95 rounded-3xl shadow-2xl backdrop-blur-lg p-8 relative overflow-hidden shimmer">
        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 title-pulse">
            📰 News Quiz Challenge
          </h1>
          <p className="text-gray-600 text-xl fade-in-up">
            Test your knowledge of current events!
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex justify-center mb-8">
          <button
            onClick={refreshQuiz}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-bold uppercase tracking-wider hover-effect btn-shimmer relative overflow-hidden pop-in"
            style={{ animationDelay: '0.8s' }}
          >
            🔄 Load Fresh News
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-12 text-indigo-600">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg">Loading fresh news questions...</p>
          </div>
        )}

        {/* Quiz Container */}
        {!isLoading && !showResults && currentQuestions.length > 0 && (
          <div className="space-y-6 relative z-10">
            {currentQuestions.map((question, questionIndex) => (
              <div
                key={`${question.question}-${questionIndex}`}
                className={`bg-white rounded-2xl p-6 shadow-lg border-l-4 border-indigo-500 relative overflow-hidden ${
                  questionIndex % 2 === 0 ? 'slide-in-left' : 'slide-in-right'
                }`}
                style={{ animationDelay: `${questionIndex * 0.1 + 0.1}s` }}
              >
                {/* Question Header */}
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold rotate">
                    {questionIndex + 1}
                  </div>
                  <div className="text-center text-sm text-gray-600 mx-4">
                    <div>{question.source}</div>
                    <div>{new Date(question.date).toLocaleDateString()}</div>
                  </div>
                  <button
                    onClick={() => showReference(question.category, questionIndex)}
                    className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover-effect relative overflow-hidden btn-shimmer"
                  >
                    📖 Read Article
                  </button>
                </div>

                {/* Question Text */}
                <div className="text-lg font-semibold text-gray-800 mb-4 leading-relaxed">
                  {question.question}
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = selectedAnswers[questionIndex] === optionIndex;
                    const isCorrect = quizSubmitted && optionIndex === question.correct;
                    const isIncorrect = quizSubmitted && isSelected && optionIndex !== question.correct;
                    
                    let optionClasses = "bg-gray-50 border-2 border-transparent rounded-xl p-4 cursor-pointer transition-all duration-300 relative overflow-hidden option-hover";
                    
                    if (isSelected && !quizSubmitted) {
                      optionClasses = "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-600 rounded-xl p-4 cursor-pointer transform scale-105";
                    } else if (isCorrect) {
                      optionClasses = "bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-4 transform scale-105 correct-pulse";
                    } else if (isIncorrect) {
                      optionClasses = "bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-4 transform scale-95 incorrect-shake";
                    } else if (quizSubmitted) {
                      optionClasses = "bg-gray-50 border-2 border-transparent rounded-xl p-4 cursor-not-allowed opacity-60";
                    }

                    return (
                      <div
                        key={optionIndex}
                        className={optionClasses}
                        onClick={() => selectAnswer(questionIndex, optionIndex)}
                        style={{ pointerEvents: quizSubmitted ? 'none' : 'auto' }}
                      >
                        {String.fromCharCode(65 + optionIndex)}. {option}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Controls */}
        {!isLoading && !showResults && currentQuestions.length > 0 && (
          <div className="flex justify-center gap-4 mt-8 fade-in-up" style={{ animationDelay: '2s' }}>
            <button
              onClick={refreshQuiz}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-bold uppercase tracking-wider hover-effect btn-shimmer relative overflow-hidden pop-in"
              style={{ animationDelay: '1s' }}
            >
              🔄 Load Fresh News
            </button>
            <button
              onClick={submitQuiz}
              disabled={isSubmitDisabled}
              className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider hover-effect btn-shimmer relative overflow-hidden pop-in ${
                isSubmitDisabled
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg'
              }`}
              style={{ 
                animationDelay: '1.2s',
                animation: !isSubmitDisabled && !quizSubmitted ? 'correctPulse 0.5s ease-in-out infinite' : undefined,
                boxShadow: !isSubmitDisabled && !quizSubmitted ? '0 0 20px rgba(78, 205, 196, 0.6)' : undefined
              }}
            >
              {quizSubmitted ? '⏳ Analyzing Answers...' : '✅ Submit Quiz'}
            </button>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div className="text-center p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl mt-8 results-fade-in">
            <div className="text-5xl font-bold mb-4 score-count">
              {resultEmoji} {score}/{currentQuestions.length}
            </div>
            <h3 className="text-2xl font-bold mb-2">Your Score: {percentage}%</h3>
            <p className="text-lg mb-6">{resultMessage}</p>
            <button
              onClick={refreshQuiz}
              className="px-6 py-3 bg-white text-indigo-600 rounded-full font-bold hover-effect"
            >
              🔄 Try Again
            </button>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 modal-fade-in"
            onClick={closeModal}
          >
            <div 
              className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto modal-slide-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-800">
                  {modalLoading ? '📰 Loading Article...' : `📰 ${modalContent?.source || 'News Article'}`}
                </h3>
                <button
                  onClick={closeModal}
                  className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg hover:bg-red-600 hover:rotate-90 transition-all duration-300"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              {modalLoading ? (
                <div className="text-center py-12 text-indigo-600">
                  <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-lg">Fetching latest news content...</p>
                </div>
              ) : modalContent ? (
                <div className="space-y-6">
                  {/* Article Meta */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                      {modalContent.title}
                    </h2>
                    <div className="flex justify-between items-center flex-wrap gap-2 text-sm text-gray-600">
                      <span><strong>Author:</strong> {modalContent.author}</span>
                      <span><strong>Published:</strong> {new Date(modalContent.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="mt-2">
                      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs">
                        {modalContent.source}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="prose max-w-none">
                    {modalContent.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Article Footer */}
                  <div className="pt-4 border-t-2 border-gray-200 flex gap-4">
                    <a
                      href={modalContent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full text-decoration-none hover-effect"
                    >
                      🔗 Read Full Article
                    </a>
                    <button
                      onClick={() => shareArticle(modalContent.title, modalContent.url)}
                      className="bg-green-500 text-white px-6 py-3 rounded-full hover-effect"
                    >
                      📤 Share Article
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-red-500">
                  <div className="text-4xl mb-4">❌</div>
                  <h3 className="text-xl font-bold">Unable to Load Article</h3>
                  <p>Please try again later.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;