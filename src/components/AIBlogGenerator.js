'use client';

import { useState } from 'react';
import { FiZap, FiLoader, FiX } from 'react-icons/fi';

const blogPrompts = [
  'Write about latest technology trends in 2025',
  'Share travel tips for solo travelers',
  'Healthy lifestyle habits for busy professionals',
  'Best food recipes for weight loss',
  'Fitness and workout routines for beginners',
  'Business startup guide for entrepreneurs',
  'Personal development and productivity tips',
  'Photography tips and camera settings',
];

const generateDetailedBlog = (topic, category) => {
  const titles = {
    'technology': `${topic}: A Comprehensive Guide to Modern Technology Trends`,
    'lifestyle': `Transform Your Life: ${topic} - Complete Guide`,
    'travel': `Ultimate ${topic} Guide: Everything You Need to Know`,
    'food': `Delicious ${topic}: Recipes, Tips, and Cooking Secrets`,
    'health': `${topic}: Your Complete Guide to Better Health`,
    'business': `${topic}: Strategic Insights for Business Success`,
    'entertainment': `${topic}: The Ultimate Entertainment Guide`,
    'education': `Master ${topic}: Complete Educational Resource`,
    'sports': `${topic}: Training, Tips, and Performance Guide`,
  };

  const excerpts = {
    'technology': `Discover the latest insights about ${topic}. This comprehensive guide covers everything from basics to advanced concepts, helping you stay ahead in the rapidly evolving tech landscape.`,
    'lifestyle': `Transform your daily routine with ${topic}. Learn practical strategies, proven techniques, and expert advice to enhance your lifestyle and achieve your goals.`,
    'travel': `Planning your next adventure? This detailed guide on ${topic} covers destinations, tips, budget planning, and insider secrets to make your journey unforgettable.`,
    'food': `Explore the world of ${topic} with our comprehensive guide. From recipes to cooking techniques, nutritional information to presentation tips, become a culinary expert.`,
    'health': `Your health matters. This in-depth guide on ${topic} provides evidence-based information, practical tips, and actionable strategies for optimal wellness.`,
    'business': `Navigate the business world with confidence. This comprehensive analysis of ${topic} offers strategic insights, real-world examples, and actionable advice for success.`,
    'entertainment': `Dive deep into ${topic}. From reviews to recommendations, trends to classics, this guide covers everything entertainment enthusiasts need to know.`,
    'education': `Unlock your learning potential with ${topic}. This comprehensive educational resource provides structured lessons, practical examples, and expert guidance.`,
    'sports': `Elevate your game with ${topic}. From training techniques to performance optimization, this guide covers everything athletes and sports enthusiasts need.`,
  };

  const defaultTitle = `${topic}: The Ultimate Complete Guide`;
  const defaultExcerpt = `Explore everything you need to know about ${topic}. This comprehensive guide provides in-depth insights, practical tips, and expert advice to help you succeed.`;

  const title = titles[category.toLowerCase()] || defaultTitle;
  const excerpt = excerpts[category.toLowerCase()] || defaultExcerpt;

  const content = `
    <h2>Introduction to ${topic}</h2>
    <p>Welcome to this comprehensive guide on <strong>${topic}</strong>. In today's fast-paced world, understanding this topic is more important than ever. Whether you're a beginner or looking to deepen your knowledge, this guide will provide you with valuable insights and practical applications.</p>

    <p>Throughout this article, we'll explore the fundamental concepts, dive into advanced techniques, and share expert tips that you can apply immediately. By the end, you'll have a thorough understanding of ${topic} and how to leverage it for your benefit.</p>

    <h2>Why ${topic} Matters</h2>
    <p>In recent years, <strong>${topic}</strong> has become increasingly significant for several reasons:</p>
    <ul>
      <li><strong>Relevance:</strong> This topic directly impacts various aspects of our daily lives and professional endeavors.</li>
      <li><strong>Growth Potential:</strong> Understanding this area opens up numerous opportunities for personal and professional development.</li>
      <li><strong>Future Trends:</strong> Staying informed about ${topic} helps you anticipate and prepare for upcoming changes.</li>
      <li><strong>Competitive Advantage:</strong> Knowledge in this field gives you an edge in your respective domain.</li>
    </ul>

    <h2>Understanding the Fundamentals</h2>
    <p>Before diving into advanced concepts, let's establish a solid foundation. The basics of <strong>${topic}</strong> include several key components that work together to create a comprehensive understanding.</p>

    <h3>Core Concepts</h3>
    <p>The fundamental principles that govern ${topic} are essential to grasp. These concepts form the building blocks of more advanced applications and help you develop a deeper appreciation for the subject matter.</p>

    <blockquote>
      "True expertise comes from understanding the fundamentals and consistently applying them in practice." - Industry Expert
    </blockquote>

    <h2>Key Components and Elements</h2>
    <p>Let's break down the main elements that make up <strong>${topic}</strong>:</p>

    <h3>1. Primary Aspects</h3>
    <p>The first major component involves understanding the primary mechanisms and how they function. This includes recognizing patterns, identifying key indicators, and knowing when to apply specific strategies.</p>

    <h3>2. Secondary Considerations</h3>
    <p>Beyond the basics, there are important secondary factors to consider. These elements often make the difference between good and excellent results, and they require careful attention and practice to master.</p>

    <h3>3. Advanced Techniques</h3>
    <p>Once you've mastered the fundamentals, you can explore more sophisticated approaches. These advanced techniques allow you to optimize outcomes and achieve superior results consistently.</p>

    <h2>Practical Applications</h2>
    <p>Theory is important, but practical application is where real learning happens. Here are some ways to apply <strong>${topic}</strong> in real-world scenarios:</p>

    <ol>
      <li><strong>Daily Practice:</strong> Incorporate these principles into your daily routine for consistent improvement.</li>
      <li><strong>Problem-Solving:</strong> Use these concepts to address common challenges effectively.</li>
      <li><strong>Innovation:</strong> Apply creative thinking to develop new approaches and solutions.</li>
      <li><strong>Continuous Learning:</strong> Stay updated with latest developments and refine your understanding.</li>
      <li><strong>Knowledge Sharing:</strong> Teach others to reinforce your own learning and contribute to the community.</li>
    </ol>

    <h2>Common Mistakes to Avoid</h2>
    <p>Even experienced practitioners can fall into these common traps. Being aware of them helps you avoid unnecessary setbacks:</p>

    <ul>
      <li><strong>Rushing the Process:</strong> Taking shortcuts often leads to incomplete understanding and poor results.</li>
      <li><strong>Ignoring Fundamentals:</strong> Skipping basics in favor of advanced techniques creates gaps in knowledge.</li>
      <li><strong>Lack of Consistency:</strong> Irregular practice prevents skill development and mastery.</li>
      <li><strong>Not Seeking Feedback:</strong> Learning in isolation limits perspective and growth opportunities.</li>
      <li><strong>Fear of Experimentation:</strong> Playing it too safe prevents innovation and discovery of better methods.</li>
    </ul>

    <h2>Best Practices and Expert Tips</h2>
    <p>Based on extensive research and practical experience, here are proven strategies for success with <strong>${topic}</strong>:</p>

    <h3>For Beginners</h3>
    <p>Start with a structured approach. Focus on understanding core concepts before moving to advanced topics. Practice regularly and don't be afraid to make mistakes – they're valuable learning opportunities.</p>

    <h3>For Intermediate Users</h3>
    <p>Build on your foundation by exploring different perspectives and methodologies. Experiment with various approaches to find what works best for your specific situation. Connect with others in the field to exchange ideas and experiences.</p>

    <h3>For Advanced Practitioners</h3>
    <p>Push boundaries and challenge conventional thinking. Contribute to the field by sharing insights and mentoring others. Stay curious and continue learning – there's always something new to discover.</p>

    <h2>Tools and Resources</h2>
    <p>To support your journey with <strong>${topic}</strong>, consider utilizing these resources:</p>

    <ul>
      <li><strong>Educational Platforms:</strong> Online courses and tutorials provide structured learning paths.</li>
      <li><strong>Community Forums:</strong> Connect with peers to share experiences and get advice.</li>
      <li><strong>Professional Networks:</strong> Build relationships with experts and mentors in the field.</li>
      <li><strong>Reference Materials:</strong> Books, articles, and documentation offer in-depth information.</li>
      <li><strong>Practical Tools:</strong> Software, apps, and platforms that facilitate hands-on practice.</li>
    </ul>

    <h2>Real-World Success Stories</h2>
    <p>Many individuals and organizations have achieved remarkable results by mastering <strong>${topic}</strong>. Their experiences demonstrate the transformative potential of dedicated learning and consistent application.</p>

    <p>One notable example involves a professional who transformed their career trajectory by deeply understanding these principles. Through persistent effort and strategic application, they achieved outcomes that exceeded their initial expectations.</p>

    <h2>Future Trends and Developments</h2>
    <p>The landscape of <strong>${topic}</strong> is constantly evolving. Staying informed about emerging trends helps you maintain relevance and capitalize on new opportunities:</p>

    <ul>
      <li><strong>Technological Advancements:</strong> New tools and technologies are reshaping how we approach this field.</li>
      <li><strong>Changing Best Practices:</strong> Industry standards evolve based on research and practical insights.</li>
      <li><strong>Global Perspectives:</strong> International developments bring fresh ideas and methodologies.</li>
      <li><strong>Integration Opportunities:</strong> Cross-disciplinary applications create innovative solutions.</li>
    </ul>

    <h2>Measuring Success and Progress</h2>
    <p>To ensure you're making meaningful progress with <strong>${topic}</strong>, establish clear metrics and regularly assess your development:</p>

    <ol>
      <li><strong>Set Specific Goals:</strong> Define what success looks like for your situation.</li>
      <li><strong>Track Key Indicators:</strong> Monitor relevant metrics that reflect your progress.</li>
      <li><strong>Regular Reviews:</strong> Periodically evaluate your performance and adjust strategies.</li>
      <li><strong>Celebrate Milestones:</strong> Acknowledge achievements to maintain motivation.</li>
      <li><strong>Continuous Improvement:</strong> Always look for ways to enhance your approach.</li>
    </ol>

    <h2>Building a Long-Term Strategy</h2>
    <p>Sustainable success with <strong>${topic}</strong> requires a well-planned, long-term approach. Consider these strategic elements:</p>

    <p><strong>Vision and Goals:</strong> Develop a clear vision of where you want to be and create actionable goals to get there. Break large objectives into manageable milestones that provide direction and motivation.</p>

    <p><strong>Resource Allocation:</strong> Invest time, energy, and resources wisely. Prioritize activities that offer the highest return on investment and align with your overall objectives.</p>

    <p><strong>Adaptability:</strong> Remain flexible and ready to adjust your approach as circumstances change. The ability to pivot when necessary is crucial for long-term success.</p>

    <h2>Overcoming Challenges</h2>
    <p>Every journey involves obstacles. Here's how to navigate common challenges related to <strong>${topic}</strong>:</p>

    <h3>Time Constraints</h3>
    <p>Many people struggle to find time for learning and practice. The solution lies in effective time management and prioritization. Even small, consistent efforts compound over time to produce significant results.</p>

    <h3>Information Overload</h3>
    <p>With abundant information available, it's easy to feel overwhelmed. Focus on quality over quantity – select reliable sources and create a structured learning plan that prevents confusion.</p>

    <h3>Motivation and Consistency</h3>
    <p>Maintaining motivation over extended periods can be challenging. Connect your efforts to larger personal or professional goals, find accountability partners, and celebrate small wins along the way.</p>

    <h2>Creating Your Action Plan</h2>
    <p>Now that we've covered the comprehensive landscape of <strong>${topic}</strong>, it's time to create your personalized action plan:</p>

    <ul>
      <li><strong>Assess Current Level:</strong> Honestly evaluate your current understanding and skills.</li>
      <li><strong>Identify Goals:</strong> Determine what you want to achieve in the short and long term.</li>
      <li><strong>Choose Resources:</strong> Select appropriate tools and materials for your learning journey.</li>
      <li><strong>Schedule Practice:</strong> Allocate specific time slots for regular practice and review.</li>
      <li><strong>Find Support:</strong> Connect with mentors, peers, or communities that can guide and motivate you.</li>
      <li><strong>Monitor Progress:</strong> Regularly assess your development and adjust plans as needed.</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Understanding and mastering <strong>${topic}</strong> is a rewarding journey that offers numerous benefits. From enhanced knowledge and skills to improved outcomes and opportunities, the investment in learning this subject pays dividends across multiple dimensions of life.</p>

    <p>Remember that expertise is built through consistent effort, continuous learning, and practical application. Don't be discouraged by challenges – they're natural parts of the growth process. Stay curious, remain persistent, and embrace the learning journey.</p>

    <p>Whether you're just beginning or looking to deepen your existing knowledge, the principles and strategies outlined in this guide provide a solid framework for success. Apply these insights consistently, adapt them to your specific context, and watch as your understanding and capabilities grow.</p>

    <p><strong>The journey of mastering ${topic} begins with a single step. Take that step today, and commit to continuous improvement. Your future self will thank you for the investment you make now.</strong></p>

    <blockquote>
      "Excellence is not a destination; it is a continuous journey that never ends." - Success Philosophy
    </blockquote>

    <h3>Next Steps</h3>
    <p>Ready to move forward? Here are your immediate action items:</p>
    <ol>
      <li>Review this guide and highlight key concepts that resonate with you</li>
      <li>Create a dedicated notebook or digital space for tracking your progress</li>
      <li>Identify one small action you can take today to begin your journey</li>
      <li>Share your commitment with a friend or colleague for accountability</li>
      <li>Schedule regular check-ins with yourself to assess progress and adjust course</li>
    </ol>

    <p><em>Remember: This AI-generated content is a starting point. Personalize it with your unique experiences, insights, and voice to create truly engaging and authentic content that resonates with your audience.</em></p>
  `;

  return { title, excerpt, content };
};

export default function AIBlogGenerator({ onGenerateContent, onGenerateTitle, onGenerateExcerpt, category }) {
  const [showModal, setShowModal] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setGenerating(true);

    // Simulate AI generation (2 second delay)
    setTimeout(() => {
      const { title, excerpt, content } = generateDetailedBlog(prompt, category || 'Other');

      // Pass generated content to parent form
      if (onGenerateContent) onGenerateContent(content);
      if (onGenerateTitle) onGenerateTitle(title);
      if (onGenerateExcerpt) onGenerateExcerpt(excerpt);

      setShowModal(false);
      setPrompt('');
      setGenerating(false);
    }, 2000);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg transition-all hover:scale-105"
      >
        <FiZap className="animate-pulse" size={18} />
        <span className="font-semibold">AI Generate</span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white p-8 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                    <FiZap size={32} className="animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">AI Blog Generator</h2>
                    <p className="text-purple-100 text-sm mt-1">Generate complete blog with title, excerpt & content</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition"
                >
                  <FiX size={28} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="mb-6">
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  What topic do you want to write about?
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., Benefits of morning exercise, How to start a business, Travel tips for Europe..."
                  rows={4}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none text-gray-900"
                />
                <p className="text-sm text-gray-700 mt-2">Be specific for better results!</p>
              </div>

              {/* Quick Prompts */}
              <div className="mb-8">
                <p className="text-sm font-bold text-gray-700 mb-3">📌 Quick Topic Ideas:</p>
                <div className="grid grid-cols-2 gap-3">
                  {blogPrompts.map((p, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setPrompt(p)}
                      className="text-left text-sm bg-gradient-to-r from-gray-50 to-gray-100 hover:from-purple-50 hover:to-pink-50 border-2 border-gray-200 hover:border-purple-300 text-gray-700 hover:text-purple-700 px-4 py-3 rounded-xl transition-all hover:shadow-md"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-purple-200 rounded-2xl p-6 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="text-3xl">✨</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">AI Will Generate:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center space-x-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Complete Title</strong> - Engaging and SEO-friendly</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Excerpt/Summary</strong> - Perfect for previews</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Detailed Content</strong> - 2000+ words, fully formatted</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Structured Sections</strong> - Headings, lists, quotes</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Action Steps</strong> - Practical takeaways</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5 mb-8">
                <div className="flex space-x-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="font-bold text-amber-900 mb-2">Pro Tips:</h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• The more specific your topic, the better the content</li>
                      <li>• You can edit everything after generation</li>
                      <li>• Add your personal experiences to make it unique</li>
                      <li>• Use this as a foundation, not final content</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || generating}
                  className="flex-1 flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-8 py-5 rounded-2xl text-lg font-bold hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                >
                  {generating ? (
                    <>
                      <FiLoader className="animate-spin" size={24} />
                      <span>Generating Magic...</span>
                    </>
                  ) : (
                    <>
                      <FiZap size={24} />
                      <span>Generate Complete Blog</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-8 py-5 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
