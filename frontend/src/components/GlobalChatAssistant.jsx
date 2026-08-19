import React, { useState, useEffect, useRef } from 'react';
import { adress, phone, email } from '../data/contact';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, X, ArrowRight, Home, BookOpen, Phone, Info, ChevronRight, RotateCcw } from 'lucide-react';

const MESSAGES = {
  greeting: "👋 Hi there! I'm your Skillora assistant. How can I help you today?",
  mainOptions: "I can help you with:",
  courseHelp: "Great! Let's find the perfect course for you. What are you interested in learning?",
  contactHelp: "Here's how you can reach us:",
  navigationHelp: "Where would you like to go?",
  thanks: "Thank you for chatting with us! Is there anything else I can help you with?",
  default: "I'm not sure I understand. Could you please select one of the options?"
};

// Option to return to main menu
const BACK_OPTION = 'Back to main menu';

const INTERESTS = [
  'UI/UX Design',
  'Graphic Design',
  'Fashion Design',
  'Interior Design',
  'Animation & VFX',
  'VFX & Video Editing',
  'Game Design & Development',
  'Motion Graphics Pro'
];

// Map interests to URL slugs for curriculum links
const INTEREST_TO_SLUG = {
  'ui/ux design': 'ui-ux-design',
  'graphic design': 'graphic-design',
  'fashion design': 'fashion-design',
  'interior design': 'interior-design',
  'animation & vfx': 'animation-vfx',
  'vfx & video editing': 'vfx-video-editing',
  'game design & development': 'game-design',
  'motion graphics pro': 'motion-graphics',
  'ui/ux & web design': 'ui-ux-design',
  '3d animation': 'animation-vfx',
  'game development': 'game-design',
  'video editing': 'vfx-video-editing',
  'motion graphics': 'motion-graphics',
  'digital marketing': 'digital-marketing'
};

const TIME_COMMITMENTS = [
  'Less than 1 month',
  '1-3 months',
  '3-6 months',
  '6-12 months',
  'More than 1 year'
];

const NAVIGATION_OPTIONS = [
  { id: 'home', label: 'Home', icon: <Home size={16} className="mr-2" /> },
  { id: 'courses', label: 'All Courses', icon: <BookOpen size={16} className="mr-2" /> },
  { id: 'events', label: 'Events', icon: <Info size={16} className="mr-2" /> },
  { id: 'contact', label: 'Contact', icon: <Phone size={16} className="mr-2" /> }
];

const CONTACT_INFO = [
  { type: 'Email', value: email, icon: '✉️' },
  { type: 'Phone', value: phone, icon: '📞' },
  { type: 'Address', value: adress, icon: '📍' },
  { type: 'Hours', value: 'Mon-Fri: 9AM - 6PM', icon: '🕒' }
];

const GlobalChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: MESSAGES.greeting, sender: 'bot' }]);
  const [inputValue, setInputValue] = useState('');
  const [chatState, setChatState] = useState('greeting');
  const [userSelections, setUserSelections] = useState({});
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text, sender = 'bot', options = null) => {
    // Automatically append the back option for submenu choices
    let finalOptions = options;
    if (Array.isArray(options) && !options.includes(BACK_OPTION)) {
      finalOptions = [...options, BACK_OPTION];
    }
    setMessages(prev => [...prev, { text, sender, options: finalOptions }]);

    // If bot just said thanks, follow up with main menu options
    if (sender === 'bot' && text === MESSAGES.thanks) {
      setMessages(prev => [...prev, { text: MESSAGES.mainOptions, sender: 'bot', options: [
        'Explore Courses',
        'Contact Information',
        'Website Navigation'
      ] }]);
    }
  };

  const handleSendMessage = (userText = '') => {
    const rawInput = userText || inputValue.trim();
    if (!rawInput) return;

    // Add user message
    addMessage(rawInput, 'user');
    const userInput = rawInput.toLowerCase();
    if(!userText) setInputValue('');

    // Global "back" handler
    if (userInput.includes('back')) {
      setChatState('greeting');
      addMessage(MESSAGES.mainOptions, 'bot', [
        'Explore Courses',
        'Contact Information',
        'Website Navigation'
      ]);
      return;
    }

    // Process bot response
    setTimeout(() => {
      if (chatState === 'greeting') {
        if (userInput.includes('course') || userInput.includes('learn')) {
          setChatState('course_interest');
          addMessage(MESSAGES.courseHelp, 'bot', INTERESTS);
        } else if (userInput.includes('contact') || userInput.includes('reach')) {
          setChatState('contact');
          showContactInfo();
        } else if (userInput.includes('navigate') || userInput.includes('go to') || userInput.includes('website navigation')) {
          setChatState('navigation');
          addMessage(MESSAGES.navigationHelp, 'bot', NAVIGATION_OPTIONS);
        } else {
          addMessage(MESSAGES.default, 'bot', [
            'Explore Courses',
            'Contact Information',
            'Website Navigation'
          ]);
        }
      } else if (chatState === 'course_interest') {
        setUserSelections({ ...userSelections, interest: rawInput });
        setChatState('course_time');
        addMessage("Great choice! How much time can you dedicate to learning?", 'bot', TIME_COMMITMENTS);
      } else if (chatState === 'course_time') {
        const timeCommitment = userInput;
        const interest = userSelections.interest || 'UI/UX & Web Design';
        const recommendedCourse = getRecommendedCourse(interest, timeCommitment);
        
        addMessage(`Based on your interest in ${interest} and ${timeCommitment.toLowerCase()} time commitment, I recommend:`, 'bot');
        addMessage(`🎓 ${recommendedCourse}\n\nWould you like more information about this course or help with enrollment?`, 'bot', [
          'Yes, tell me more',
          'Help me enroll',
          'Show other options'
        ]);
        setChatState('course_recommendation');
      } else if (chatState === 'course_recommendation') {
        if (userInput.includes('enroll')) {
          addMessage("Great! Taking you to the enrollment page...", 'bot');
          setIsOpen(false);
          navigate('/enrollment');
          setChatState('greeting');
        } else if (userInput.includes('curriculum')) {
          const interestName = (userSelections.interest || 'UI/UX & Web Design').toLowerCase();
          const slug = INTEREST_TO_SLUG[interestName] || 'ui-ux-design';
          addMessage("Sure! Opening the course details page for you...", 'bot');
          setIsOpen(false);
          navigate(`/courses/${slug}`);
        } else if (userInput.includes('more')) {
          addMessage("This comprehensive course covers all the essential skills and tools you'll need to succeed. Our expert instructors provide hands-on training and personalized feedback. Would you like to see the detailed curriculum?", 'bot', [
            'Yes, show curriculum',
            'Help me enroll',
            'Back to main menu'
          ]);
        } else {
          setChatState('course_interest');
          addMessage(MESSAGES.courseHelp, 'bot', INTERESTS);
        }
      } else if (chatState === 'contact') {
        if (userInput.includes('yes')) {
          addMessage('Redirecting you to our contact page...', 'bot');
          navigateTo('contact');
          setChatState('greeting');
        } else {
          setChatState('greeting');
          addMessage(MESSAGES.thanks, 'bot');
        }
      } else if (chatState === 'navigation') {
        // direct id match from NAVIGATION_OPTIONS

        navigateTo(userInput);
      }
    }, 500);
  };

  const handleOptionSelect = (option) => {
    // Directly process the selected option in a single click
    handleSendMessage(typeof option === 'object' ? option.label || option.id : option);
  };

  const getRecommendedCourse = (interest, timeCommitment) => {
    // This is a simplified example - in a real app, you'd fetch this from an API
    const courses = {
      'UI/UX & Web Design': {
        'Less than 1 month': 'Web Design Fundamentals (4 Weeks)',
        '1-3 months': 'UI/UX Essentials (8 Weeks)',
        '3-6 months': 'Advanced UX Design (4 Months)',
        '6-12 months': 'UI/UX Design Professional (8 Months)',
        'More than 1 year': 'Full-Stack Design (1 Year)'
      },
      'Graphic Design': {
        'Less than 1 month': 'Graphic Design Basics (4 Weeks)',
        '1-3 months': 'Digital Illustration (8 Weeks)',
        '3-6 months': 'Brand Identity Design (4 Months)',
        '6-12 months': 'Motion Graphics (8 Months)',
        'More than 1 year': 'Creative Direction (1 Year)'
      },
      '3D Animation': {
        'Less than 1 month': '3D Modeling Basics (4 Weeks)',
        '1-3 months': 'Character Design (8 Weeks)',
        '3-6 months': '3D Animation (4 Months)',
        '6-12 months': 'Visual Effects (8 Months)',
        'More than 1 year': '3D Animation Mastery (1 Year)'
      },
      'Game Development': {
        'Less than 1 month': 'Game Design Fundamentals (4 Weeks)',
        '1-3 months': 'Game Development with Unity (8 Weeks)',
        '3-6 months': 'Advanced Game Programming (4 Months)',
        '6-12 months': 'Game Development Professional (8 Months)',
        'More than 1 year': 'Game Development Mastery (1 Year)'
      },
      'Video Editing': {
        'Less than 1 month': 'Video Editing Basics (4 Weeks)',
        '1-3 months': 'Advanced Video Editing (8 Weeks)',
        '3-6 months': 'Motion Graphics (4 Months)',
        '6-12 months': 'Professional Video Production (8 Months)',
        'More than 1 year': 'Film & Video Mastery (1 Year)'
      },
      'Digital Marketing': {
        'Less than 1 month': 'Digital Marketing Fundamentals (4 Weeks)',
        '1-3 months': 'Social Media Marketing (8 Weeks)',
        '3-6 months': 'Content Marketing (4 Months)',
        '6-12 months': 'Digital Strategy (8 Months)',
        'More than 1 year': 'Digital Marketing Leadership (1 Year)'
      }
    };

    return courses[interest]?.[timeCommitment] || 'UI/UX Design Professional (8 Months)';
  };

  const showContactInfo = () => {
    addMessage("Here's how you can reach us:", 'bot');
    CONTACT_INFO.forEach(contact => {
      addMessage(`${contact.icon} ${contact.type}: ${contact.value}`, 'bot');
    });
    addMessage("Would you like to send us a message directly?", 'bot', [
      'Yes, send a message',
      'No, thanks'
    ]);
  };

  const navigateTo = (destination) => {
    // Close chat before navigating
    setIsOpen(false);
    const path = destination === 'home' ? '/' : `/${destination}`;
    navigate(path);
  };

  const resetChat = () => {
    setMessages([
      { text: MESSAGES.greeting, sender: 'bot' },
      { text: MESSAGES.mainOptions, sender: 'bot', options: [
        'Explore Courses',
        'Contact Information',
        'Website Navigation'
      ] }
    ]);
    setChatState('greeting');
    setUserSelections({});
};

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      resetChat();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={toggleChat}
        />
      )}
      
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 text-sm sm:text-base">
      {isOpen ? (
        <div className="relative">
          <div className="absolute bottom-0 right-0 w-72 sm:w-80 md:w-[500px] max-h-[80vh] h-[480px] sm:h-[600px] bg-white rounded-t-xl shadow-2xl overflow-hidden flex flex-col">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 flex justify-between items-center">
              <h3 className="font-semibold text-base sm:text-lg">Skillora Assistant</h3>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={resetChat}
                  className="p-1 rounded-full hover:bg-orange-400 transition-colors"
                  title="Start over"
                >
                  <RotateCcw size={18} />
                </button>
                <button 
                  onClick={toggleChat}
                  className="p-1 rounded-full hover:bg-orange-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[90%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user' 
                        ? 'bg-orange-500 text-white rounded-br-none' 
                        : 'bg-white border border-gray-200 rounded-bl-none shadow-md'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                    
                    {/* Options */}
                    {message.options && (
                      <div className="mt-2 space-y-2">
                        {message.options.map((option, i) => (
                          <button
                            key={i}
                            onClick={() => handleOptionSelect(typeof option === 'object' ? option.id : option)}
                            className="block w-full text-left p-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors flex items-center"
                          >
                            {typeof option === 'object' ? (
                              <>
                                {option.icon}
                                <span>{option.label}</span>
                              </>
                            ) : (
                              <span>{option}</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            

          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full p-4 shadow-md hover:shadow-md transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
          aria-label="Chat with Skillora assistant"
        >
          <MessageSquare size={24} />
        </button>
      )}
      </div>
    </>
  );
};

export default GlobalChatAssistant;
