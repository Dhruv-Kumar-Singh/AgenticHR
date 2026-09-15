import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';
import Background from '../components/Background';

// ─── Mock Session Data ────────────────────────────────────────────────────────
export const profSessions = [
  {
    id: 'sess-1',
    title: 'Senior Software Engineer — Backend Systems',
    role: 'Senior Software Engineer',
    department: 'Engineering',
    date: 'Sep 12, 2026',
    duration: '45 mins',
    totalCandidates: 38,
    clearedCandidates: 14,
    criteriaScore: 75,
    topScore: 96,
    status: 'Completed',
    candidates: [
      { id: 'c1', name: 'Rohan Mehta', initials: 'RM', score: 96, verdict: 'Strong Hire', location: 'Bangalore, India', email: 'rohan.mehta@example.com', headline: 'Backend Engineer · 5 YoE', bio: 'Experienced in distributed systems, Go microservices and Kafka. Led backend infra at a Series-B fintech. Strong fundamentals in consensus protocols and sharding.', competencies: [{ skill: 'Communication', score: 90 }, { skill: 'Technical Depth', score: 96 }, { skill: 'Problem Solving', score: 95 }, { skill: 'Confidence', score: 88 }, { skill: 'Clarity', score: 92 }], pros: ['Exceptional depth on Raft consensus internals', 'Quantified all trade-offs with real latency numbers', 'Concise and structured answers throughout'], cons: ['Slight hesitation on database partitioning', 'Could expand on observability tooling'] },
      { id: 'c2', name: 'Priya Sharma', initials: 'PS', score: 93, verdict: 'Strong Hire', location: 'Hyderabad, India', email: 'priya.sharma@example.com', headline: 'Platform Engineer · 6 YoE', bio: 'Full-stack platform engineer with deep expertise in Kubernetes, gRPC and multi-tenant SaaS. Contributed to OSS projects in cloud networking.', competencies: [{ skill: 'Communication', score: 94 }, { skill: 'Technical Depth', score: 91 }, { skill: 'Problem Solving', score: 93 }, { skill: 'Confidence', score: 95 }, { skill: 'Clarity', score: 90 }], pros: ['Exceptionally clear communication style', 'Strong systems-thinking under constraints', 'Great use of concrete examples'], cons: ['Minor gaps in low-level memory management', 'Rate limiting design lacked edge cases'] },
      { id: 'c3', name: 'Arjun Nair', initials: 'AN', score: 91, verdict: 'Hire', location: 'Chennai, India', email: 'arjun.nair@example.com', headline: 'Software Engineer · 4 YoE', bio: 'Python and Rust engineer specialising in data pipelines and stream processing. Worked at a high-frequency trading firm on latency-sensitive infra.', competencies: [{ skill: 'Communication', score: 88 }, { skill: 'Technical Depth', score: 93 }, { skill: 'Problem Solving', score: 90 }, { skill: 'Confidence', score: 85 }, { skill: 'Clarity', score: 88 }], pros: ['Deep understanding of lock-free data structures', 'Clean algorithm derivation under time pressure', 'Good test coverage reasoning'], cons: ['Slightly verbose in behavioral responses', 'Needs stronger system design framing'] },
      { id: 'c4', name: 'Sneha Patel', initials: 'SP', score: 88, verdict: 'Hire', location: 'Mumbai, India', email: 'sneha.patel@example.com', headline: 'Engineering Lead · 7 YoE', bio: 'Engineering manager transitioning to IC. Strong in API design, microservice architecture and cross-functional leadership.', competencies: [{ skill: 'Communication', score: 95 }, { skill: 'Technical Depth', score: 84 }, { skill: 'Problem Solving', score: 88 }, { skill: 'Confidence', score: 92 }, { skill: 'Clarity', score: 91 }], pros: ['Strongest communicator of the batch', 'Excellent stakeholder reasoning', 'Led nuanced trade-off discussion well'], cons: ['Technical depth below bar on low-level coding', 'Distributed systems breadth needs improvement'] },
      { id: 'c5', name: 'Karan Singh', initials: 'KS', score: 86, verdict: 'Hire', location: 'Pune, India', email: 'karan.singh@example.com', headline: 'Backend Developer · 3 YoE', bio: 'Node.js and TypeScript specialist with strong REST and GraphQL API experience. Built real-time collaboration tools for a productivity SaaS.', competencies: [{ skill: 'Communication', score: 85 }, { skill: 'Technical Depth', score: 87 }, { skill: 'Problem Solving', score: 88 }, { skill: 'Confidence', score: 82 }, { skill: 'Clarity', score: 86 }], pros: ['Solid async programming patterns', 'Clean API design instincts', 'Responsive to hints and feedback'], cons: ['Gaps in distributed consistency models', 'System design lacked scalability reasoning'] },
      { id: 'c6', name: 'Divya Krishnan', initials: 'DK', score: 84, verdict: 'Lean Hire', location: 'Coimbatore, India', email: 'divya.krishnan@example.com', headline: 'Software Engineer · 3 YoE', bio: 'Java and Spring Boot developer with experience in enterprise integration patterns. Currently transitioning to cloud-native architectures.', competencies: [{ skill: 'Communication', score: 82 }, { skill: 'Technical Depth', score: 84 }, { skill: 'Problem Solving', score: 83 }, { skill: 'Confidence', score: 80 }, { skill: 'Clarity', score: 85 }], pros: ['Good grasp of OOP and design patterns', 'Methodical problem decomposition'], cons: ['Limited cloud infrastructure exposure', 'Confidence dipped under follow-up probing', 'Lacked familiarity with NoSQL trade-offs'] },
      { id: 'c7', name: 'Aditya Verma', initials: 'AV', score: 82, verdict: 'Lean Hire', location: 'Delhi, India', email: 'aditya.verma@example.com', headline: 'Full Stack Engineer · 4 YoE', bio: 'React and Go developer. Built fintech dashboards and payment reconciliation engines. Good product sense and user-facing systems knowledge.', competencies: [{ skill: 'Communication', score: 86 }, { skill: 'Technical Depth', score: 80 }, { skill: 'Problem Solving', score: 82 }, { skill: 'Confidence', score: 84 }, { skill: 'Clarity', score: 80 }], pros: ['Product-minded approach to system design', 'Good at balancing user needs vs tech constraints'], cons: ['Backend depth insufficient for senior role', 'Vague on database indexing strategy', 'Needs more rigour in capacity estimation'] },
      { id: 'c8', name: 'Meera Iyer', initials: 'MI', score: 80, verdict: 'Lean Hire', location: 'Mysore, India', email: 'meera.iyer@example.com', headline: 'Software Engineer · 2 YoE', bio: 'Python and FastAPI developer. Strong academic background in algorithms. First industry role showed rapid ramp-up and good learning agility.', competencies: [{ skill: 'Communication', score: 78 }, { skill: 'Technical Depth', score: 82 }, { skill: 'Problem Solving', score: 80 }, { skill: 'Confidence', score: 76 }, { skill: 'Clarity', score: 82 }], pros: ['Strong algorithmic thinking from competitive programming', 'Keen to learn, picked up hints quickly'], cons: ['Lack of production systems experience', 'Confidence needs development', 'System design knowledge is academic-level only'] },
      { id: 'c9', name: 'Raj Desai', initials: 'RD', score: 78, verdict: 'Lean Hire', location: 'Ahmedabad, India', email: 'raj.desai@example.com', headline: 'Backend Developer · 2 YoE', bio: 'PHP and Laravel developer with small-scale production deployments. Eager to move into distributed systems engineering.', competencies: [{ skill: 'Communication', score: 76 }, { skill: 'Technical Depth', score: 78 }, { skill: 'Problem Solving', score: 78 }, { skill: 'Confidence', score: 74 }, { skill: 'Clarity', score: 80 }], pros: ['Clear code reasoning for simpler problems', 'Good enthusiasm and engagement'], cons: ['Limited distributed systems knowledge', 'Struggles with concurrency primitives', 'Architecture designs lack depth'] },
      { id: 'c10', name: 'Anjali Rao', initials: 'AR', score: 76, verdict: 'Lean Hire', location: 'Visakhapatnam, India', email: 'anjali.rao@example.com', headline: 'Junior Engineer · 1 YoE', bio: 'Recent CS graduate with strong fundamentals. Interned at a mid-size SaaS company. Showed promise in coding rounds but lacks production experience.', competencies: [{ skill: 'Communication', score: 75 }, { skill: 'Technical Depth', score: 76 }, { skill: 'Problem Solving', score: 77 }, { skill: 'Confidence', score: 72 }, { skill: 'Clarity', score: 78 }], pros: ['Very strong algorithm and DS fundamentals', 'Methodical and calm under pressure'], cons: ['No production systems experience at all', 'Distributed concepts are purely theoretical', 'System design lacked practical awareness'] },
      { id: 'c11', name: 'Varun Khanna', initials: 'VK', score: 75, verdict: 'Lean Hire', location: 'Jaipur, India', email: 'varun.khanna@example.com', headline: 'Software Developer · 2 YoE', bio: 'Android developer seeking backend transition. Strong in mobile performance optimisation. Learning server-side Java and Spring.', competencies: [{ skill: 'Communication', score: 80 }, { skill: 'Technical Depth', score: 73 }, { skill: 'Problem Solving', score: 75 }, { skill: 'Confidence', score: 78 }, { skill: 'Clarity', score: 76 }], pros: ['Articulate and confident delivery', 'Mobile perf knowledge translates to client-side'], cons: ['Backend fundamentals need significant work', 'Distributed systems entirely unfamiliar', 'Database design answers were incomplete'] },
      { id: 'c12', name: 'Fatima Malik', initials: 'FM', score: 75, verdict: 'Lean Hire', location: 'Bangalore, India', email: 'fatima.malik@example.com', headline: 'Data Engineer · 3 YoE', bio: 'PySpark and Airflow specialist. Expert in batch data pipelines, ETL design and data lake architecture. Transitioning to real-time stream processing.', competencies: [{ skill: 'Communication', score: 82 }, { skill: 'Technical Depth', score: 74 }, { skill: 'Problem Solving', score: 76 }, { skill: 'Confidence', score: 78 }, { skill: 'Clarity', score: 74 }], pros: ['Strong data pipeline instincts', 'Good cross-team collaboration examples'], cons: ['Limited real-time / streaming experience', 'API design knowledge is weak', 'Backend coding round below par'] },
      { id: 'c13', name: 'Saurabh Joshi', initials: 'SJ', score: 75, verdict: 'Lean Hire', location: 'Nagpur, India', email: 'saurabh.joshi@example.com', headline: 'Backend Engineer · 3 YoE', bio: 'Ruby on Rails developer with e-commerce and marketplace experience. Good at rapid prototyping and product engineering under tight deadlines.', competencies: [{ skill: 'Communication', score: 79 }, { skill: 'Technical Depth', score: 73 }, { skill: 'Problem Solving', score: 74 }, { skill: 'Confidence', score: 77 }, { skill: 'Clarity', score: 75 }], pros: ['Product-oriented mindset is a plus', 'Quick learner, adapts to feedback in-session'], cons: ['Rails-centric thinking limits systems thinking', 'Performance engineering knowledge is shallow', 'Weak on concurrency and async patterns'] },
      { id: 'c14', name: 'Neha Gupta', initials: 'NG', score: 75, verdict: 'Lean Hire', location: 'Bhopal, India', email: 'neha.gupta@example.com', headline: 'Software Engineer · 2 YoE', bio: 'JavaScript and Node.js developer. Built several microservices for a logistics company. Good problem solver but limited in low-level knowledge.', competencies: [{ skill: 'Communication', score: 80 }, { skill: 'Technical Depth', score: 72 }, { skill: 'Problem Solving', score: 76 }, { skill: 'Confidence', score: 75 }, { skill: 'Clarity', score: 77 }], pros: ['Strong JavaScript async model understanding', 'Clean API design in JS ecosystem'], cons: ['Low-level systems knowledge is very limited', 'No familiarity with compiled languages', 'Database locking and transaction concepts unclear'] },
    ],
  },
  {
    id: 'sess-2',
    title: 'Product Manager — Growth & Monetisation',
    role: 'Product Manager',
    department: 'Product',
    date: 'Sep 08, 2026',
    duration: '35 mins',
    totalCandidates: 22,
    clearedCandidates: 8,
    criteriaScore: 80,
    topScore: 94,
    status: 'Completed',
    candidates: [
      { id: 'p1', name: 'Ananya Bose', initials: 'AB', score: 94, verdict: 'Strong Hire', location: 'Kolkata, India', email: 'ananya.bose@example.com', headline: 'Senior PM · 5 YoE', bio: 'Growth PM with deep experience in funnel optimisation, A/B testing at scale, and revenue expansion strategies. Led a 3x MRR growth initiative.', competencies: [{ skill: 'Communication', score: 96 }, { skill: 'Technical Depth', score: 88 }, { skill: 'Problem Solving', score: 94 }, { skill: 'Confidence', score: 95 }, { skill: 'Clarity', score: 97 }], pros: ['Best communicator in the batch', 'Data-driven decision making throughout', 'Impressive monetisation case study walk-through'], cons: ['Technical depth could be stronger', 'Slightly over-indexed on metrics vs user empathy'] },
      { id: 'p2', name: 'Vivek Sharma', initials: 'VS', score: 91, verdict: 'Strong Hire', location: 'Gurugram, India', email: 'vivek.sharma@example.com', headline: 'PM · 4 YoE', bio: 'Product manager at a B2B SaaS company. Strong in pricing strategy, cohort analysis and GTM execution. MBA from IIM-A.', competencies: [{ skill: 'Communication', score: 92 }, { skill: 'Technical Depth', score: 86 }, { skill: 'Problem Solving', score: 92 }, { skill: 'Confidence', score: 91 }, { skill: 'Clarity', score: 90 }], pros: ['Strong analytical framing', 'Good market sizing instincts', 'Clear CIRCLES framework usage'], cons: ['Monetisation depth needs more creativity', 'Edge cases in pricing models not addressed'] },
      { id: 'p3', name: 'Ritika Jain', initials: 'RJ', score: 89, verdict: 'Hire', location: 'Bangalore, India', email: 'ritika.jain@example.com', headline: 'APM · 3 YoE', bio: 'Associate PM with strong engineering background. Built and launched two consumer features from 0-to-1. Good at bridging tech and product.', competencies: [{ skill: 'Communication', score: 88 }, { skill: 'Technical Depth', score: 91 }, { skill: 'Problem Solving', score: 89 }, { skill: 'Confidence', score: 86 }, { skill: 'Clarity', score: 87 }], pros: ['Engineering background is a strong asset', 'Structured roadmap prioritisation', 'Good at trade-off reasoning'], cons: ['Growth levers discussion lacked breadth', 'Confidence wavers under follow-up pressure'] },
      { id: 'p4', name: 'Harsh Modi', initials: 'HM', score: 87, verdict: 'Hire', location: 'Surat, India', email: 'harsh.modi@example.com', headline: 'PM · 4 YoE', bio: 'Fintech PM with expertise in payment product design and regulatory compliance. Strong at cross-functional leadership.', competencies: [{ skill: 'Communication', score: 89 }, { skill: 'Technical Depth', score: 83 }, { skill: 'Problem Solving', score: 88 }, { skill: 'Confidence', score: 90 }, { skill: 'Clarity', score: 85 }], pros: ['Excellent stakeholder management examples', 'Clear regulatory awareness in product decisions'], cons: ['Growth monetisation is not a core strength', 'Analytical depth on metrics was surface-level'] },
      { id: 'p5', name: 'Sonal Kapoor', initials: 'SK', score: 85, verdict: 'Hire', location: 'Indore, India', email: 'sonal.kapoor@example.com', headline: 'Product Lead · 6 YoE', bio: 'Veteran PM now focusing on individual contribution. Deep expertise in consumer UX research, NPS analysis and retention frameworks.', competencies: [{ skill: 'Communication', score: 90 }, { skill: 'Technical Depth', score: 80 }, { skill: 'Problem Solving', score: 85 }, { skill: 'Confidence', score: 88 }, { skill: 'Clarity', score: 86 }], pros: ['Rich experience in user research methodologies', 'Strong retention strategy articulation'], cons: ['Growth / acquisition knowledge is dated', 'Monetisation models not well explored'] },
      { id: 'p6', name: 'Deepak Nambiar', initials: 'DN', score: 83, verdict: 'Lean Hire', location: 'Thrissur, India', email: 'deepak.nambiar@example.com', headline: 'PM · 3 YoE', bio: 'E-commerce product manager with catalogue and inventory management experience. Solid at operational product thinking.', competencies: [{ skill: 'Communication', score: 82 }, { skill: 'Technical Depth', score: 82 }, { skill: 'Problem Solving', score: 83 }, { skill: 'Confidence', score: 80 }, { skill: 'Clarity', score: 84 }], pros: ['Good operational product instincts', 'Reasonable data analysis walk-through'], cons: ['Growth experience is thin', 'Monetisation frameworks not well articulated', 'Needs exposure to PLG / self-serve models'] },
      { id: 'p7', name: 'Tanya Bhatia', initials: 'TB', score: 81, verdict: 'Lean Hire', location: 'Chandigarh, India', email: 'tanya.bhatia@example.com', headline: 'APM · 2 YoE', bio: 'Early-career PM with strong design thinking. Interned at a top-tier design consultancy and a fast-growing consumer app.', competencies: [{ skill: 'Communication', score: 85 }, { skill: 'Technical Depth', score: 76 }, { skill: 'Problem Solving', score: 82 }, { skill: 'Confidence', score: 83 }, { skill: 'Clarity', score: 84 }], pros: ['Strong design and empathy-first approach', 'Creative problem framing'], cons: ['Monetisation and business model knowledge lacking', 'Technical depth insufficient', 'Analytics depth surface-level'] },
      { id: 'p8', name: 'Nikhil Agarwal', initials: 'NA', score: 80, verdict: 'Lean Hire', location: 'Lucknow, India', email: 'nikhil.agarwal@example.com', headline: 'PM · 3 YoE', bio: 'EdTech PM with subscription monetisation experience. Good at content product strategy but limited in analytical tooling.', competencies: [{ skill: 'Communication', score: 80 }, { skill: 'Technical Depth', score: 78 }, { skill: 'Problem Solving', score: 81 }, { skill: 'Confidence', score: 78 }, { skill: 'Clarity', score: 80 }], pros: ['Subscription model knowledge is solid', 'Good at content and learning product thinking'], cons: ['Data analysis tooling knowledge is weak', 'Growth loops not clearly understood', 'Confidence issues evident in follow-up rounds'] },
    ],
  },
  {
    id: 'sess-3',
    title: 'UX Designer — Mobile & Web Platforms',
    role: 'Senior UX Designer',
    department: 'Design',
    date: 'Sep 03, 2026',
    duration: '40 mins',
    totalCandidates: 15,
    clearedCandidates: 5,
    criteriaScore: 78,
    topScore: 95,
    status: 'Completed',
    candidates: [
      { id: 'd1', name: 'Ishita Das', initials: 'ID', score: 95, verdict: 'Strong Hire', location: 'Bangalore, India', email: 'ishita.das@example.com', headline: 'UX Lead · 6 YoE', bio: 'Design systems expert and research-driven UX lead. Built the design system for a 2M-user mobile app from scratch. Deep expertise in accessibility and inclusive design.', competencies: [{ skill: 'Communication', score: 96 }, { skill: 'Technical Depth', score: 90 }, { skill: 'Problem Solving', score: 95 }, { skill: 'Confidence', score: 94 }, { skill: 'Clarity', score: 97 }], pros: ['Portfolio showcased exceptional user research rigour', 'Led complex design system at scale', 'Accessibility advocacy stood out strongly'], cons: ['Animation and motion design portfolio is thin', 'Could expand on B2B design experience'] },
      { id: 'd2', name: 'Rahul Bose', initials: 'RB', score: 88, verdict: 'Hire', location: 'Kolkata, India', email: 'rahul.bose@example.com', headline: 'UX Designer · 4 YoE', bio: 'Mobile-first designer with strong interaction design background. Worked on consumer fintech products with millions of DAU.', competencies: [{ skill: 'Communication', score: 88 }, { skill: 'Technical Depth', score: 87 }, { skill: 'Problem Solving', score: 89 }, { skill: 'Confidence', score: 86 }, { skill: 'Clarity', score: 88 }], pros: ['Strong mobile interaction patterns knowledge', 'User testing methodology solid'], cons: ['Design system contribution experience limited', 'Web platform design depth needs work'] },
      { id: 'd3', name: 'Pallavi Nair', initials: 'PN', score: 85, verdict: 'Hire', location: 'Trivandrum, India', email: 'pallavi.nair@example.com', headline: 'UI/UX Designer · 5 YoE', bio: 'UI-heavy designer with strong visual craft. Built landing pages and marketing funnels for D2C brands. Now transitioning to product UX.', competencies: [{ skill: 'Communication', score: 84 }, { skill: 'Technical Depth', score: 84 }, { skill: 'Problem Solving', score: 85 }, { skill: 'Confidence', score: 82 }, { skill: 'Clarity', score: 86 }], pros: ['Visual design quality is outstanding', 'Strong at conveying user journeys visually'], cons: ['Research methodology knowledge needs strengthening', 'Product decision reasoning is underdeveloped'] },
      { id: 'd4', name: 'Rohan Das', initials: 'RD', score: 81, verdict: 'Lean Hire', location: 'Bhubaneswar, India', email: 'rohan.das@example.com', headline: 'UX Designer · 3 YoE', bio: 'SaaS product designer with B2B enterprise tool experience. Strong at workflow mapping and complex information architecture.', competencies: [{ skill: 'Communication', score: 80 }, { skill: 'Technical Depth', score: 82 }, { skill: 'Problem Solving', score: 81 }, { skill: 'Confidence', score: 78 }, { skill: 'Clarity', score: 82 }], pros: ['Good at complex navigation patterns', 'Enterprise workflow intuition is solid'], cons: ['Mobile design experience is limited', 'Prototyping fidelity could be higher', 'Research documentation not thorough'] },
      { id: 'd5', name: 'Kavya Reddy', initials: 'KR', score: 78, verdict: 'Lean Hire', location: 'Hyderabad, India', email: 'kavya.reddy@example.com', headline: 'Junior Designer · 2 YoE', bio: 'Recent NID graduate with strong academic portfolio. Internship at a startup gave first exposure to product design. Great potential, needs mentorship.', competencies: [{ skill: 'Communication', score: 82 }, { skill: 'Technical Depth', score: 76 }, { skill: 'Problem Solving', score: 78 }, { skill: 'Confidence', score: 74 }, { skill: 'Clarity', score: 80 }], pros: ['Excellent foundational design craft from NID', 'Creative and fresh perspective on problems'], cons: ['Limited production design experience', 'Needs significant mentorship on product design process', 'Confidence under critique needs building'] },
    ],
  },
  {
    id: 'sess-4',
    title: 'Data Scientist — ML & Predictive Analytics',
    role: 'Data Scientist',
    department: 'Data',
    date: 'Oct 10, 2026',
    duration: '50 mins',
    totalCandidates: 0,
    clearedCandidates: 0,
    criteriaScore: 80,
    topScore: null,
    status: 'Upcoming',
    candidates: [],
  },
  {
    id: 'sess-5',
    title: 'DevOps Engineer — Cloud & Infrastructure',
    role: 'DevOps Engineer',
    department: 'Infrastructure',
    date: 'Oct 05, 2026',
    duration: '40 mins',
    totalCandidates: 12,
    clearedCandidates: 0,
    criteriaScore: 78,
    topScore: null,
    status: 'Active',
    candidates: [],
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProHomeView({ companyName = 'TechCorp', onViewSession }) {
  const [topicInput, setTopicInput] = useState('');
  const greetingRef = useRef(null);
  const hooklineRef = useRef(null);
  const composerRef = useRef(null);
  const scrollCueRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(
      [greetingRef.current, hooklineRef.current, composerRef.current, scrollCueRef.current],
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );
    document.querySelectorAll('.fade-up, .scale-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const passRate = (s) => s.totalCandidates > 0 ? Math.round((s.clearedCandidates / s.totalCandidates) * 100) : 0;

  const statusStyle = (s) =>
    s.status === 'Completed' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
    : s.status === 'Active'  ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
    : 'bg-amber-500/10 border-amber-500/30 text-amber-300';

  return (
    <div className="min-h-screen text-neutral-200 antialiased selection:bg-white/20 selection:text-white relative bg-black">
      <Background />

      {/* ── 1. Hero / Composer ── */}
      <section className="h-screen min-h-[640px] flex flex-col items-center justify-center px-6 pt-24 pb-12 relative select-none">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
          <h1
            ref={greetingRef}
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-3 opacity-0"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}
          >
            Hi, {companyName}
          </h1>
          <p
            ref={hooklineRef}
            className="text-base sm:text-lg text-neutral-400 font-light mb-8 max-w-xl leading-relaxed opacity-0"
          >
            Create and manage your hiring interview sessions.
          </p>
          <div
            ref={composerRef}
            className="w-full rounded-2xl sm:rounded-3xl p-3 sm:p-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 transition-all duration-300 focus-within:border-white/25 focus-within:shadow-[0_0_30px_rgba(255,255,255,0.12)] glass-panel opacity-0 text-left"
          >
            <textarea
              rows={2}
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="Describe the role, required skills, or paste a job description to create a new interview session..."
              className="w-full bg-transparent text-neutral-100 placeholder-neutral-500 text-sm sm:text-base font-normal outline-none resize-none px-2 py-1 leading-relaxed"
            />
            <div className="flex items-center justify-between pt-2 px-1 border-t border-white/[0.04]">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
                <Icon icon="solar:buildings-3-linear" className="text-xs text-neutral-400" />
                <span className="text-[11px] font-mono text-neutral-400">Professional Plan</span>
              </div>
              <button
                type="button"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  topicInput.trim()
                    ? 'bg-white text-black hover:bg-neutral-200 shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                    : 'bg-white/10 text-neutral-500 hover:text-neutral-400'
                }`}
                title="Create session"
              >
                <Icon icon="solar:arrow-up-linear" className="text-base stroke-2" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollCueRef}
          onClick={() => document.getElementById('prof-sessions')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer group opacity-0"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll to interview sessions</span>
          <Icon icon="solar:alt-arrow-down-linear" className="text-xs group-hover:translate-y-1 transition-transform" />
        </div>
      </section>

      {/* ── 2. Sessions List ── */}
      <section id="prof-sessions" className="relative z-10 py-24 md:py-32 bg-black border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col items-start mb-16 fade-up">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-white">
              Interview Sessions
            </h2>
            <p className="text-base text-neutral-400 max-w-xl font-light leading-relaxed">
              View candidate participation, pass rates, and detailed reports for every session you've hosted.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profSessions.map((session) => (
              <div
                key={session.id}
                onClick={() => session.status === 'Completed' && onViewSession && onViewSession(session)}
                className={`rounded-3xl border border-white/10 bg-[#050505] p-7 md:p-8 relative overflow-hidden group hover:border-white/20 transition-all duration-500 fade-up shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between ${session.status === 'Completed' ? 'cursor-pointer hover:-translate-y-1' : 'cursor-default'}`}
              >
                <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none group-hover:opacity-[0.1] transition-opacity" />
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6 relative z-10">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold border uppercase tracking-widest ${statusStyle(session)}`}>
                      <span className={`w-1 h-1 rounded-full bg-current ${session.status === 'Active' ? 'animate-pulse' : ''}`} />
                      {session.status}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{session.date}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight group-hover:text-neutral-100 transition-colors mb-1.5 relative z-10">
                    {session.title}
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono mb-6 relative z-10">{session.department} · {session.duration}</p>

                  <div className="grid grid-cols-3 gap-3 mb-4 relative z-10">
                    {[
                      { label: 'Total', value: session.totalCandidates || '—', icon: 'solar:users-group-two-rounded-linear' },
                      { label: 'Cleared', value: session.status === 'Completed' ? session.clearedCandidates : '—', icon: 'solar:check-circle-linear' },
                      { label: 'Pass Rate', value: session.status === 'Completed' ? `${passRate(session)}%` : '—', icon: 'solar:chart-square-linear' },
                    ].map(({ label, value, icon }) => (
                      <div key={label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 flex flex-col gap-1">
                        <Icon icon={icon} className="text-neutral-500 text-sm" />
                        <div className="text-lg font-mono font-bold text-white">{value}</div>
                        <div className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">{label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 relative z-10">
                    <Icon icon="solar:medal-ribbons-star-linear" className={`text-sm ${session.topScore ? 'text-amber-400' : 'text-neutral-600'}`} />
                    <span className={`text-xs font-mono ${session.topScore ? 'text-amber-300' : 'text-neutral-600'}`}>
                      {session.topScore ? `Top Score: ${session.topScore}/100` : 'No results yet'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/[0.05] text-xs font-mono text-neutral-500 group-hover:text-white transition-colors relative z-10">
                  <span>Criteria ≥ {session.criteriaScore}%</span>
                  {session.status === 'Completed' && (
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      VIEW SESSION →
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
