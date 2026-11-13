import { useState, useEffect, useRef } from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<{role: string, text: string}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['hero', 'about', 'capabilities', 'howto', 'faq', 'demo'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      let response = '';
      const lower = userMsg.toLowerCase();
      if (lower.includes('привіт') || lower.includes('hello') || lower.includes('hi') || lower.includes('хай')) {
        response = 'Привіт! 👋 Я Qwen — AI-асистент від Alibaba. Радий допомогти! Чим можу бути корисним?';
      } else if (lower.includes('хто ти') || lower.includes('who are you')) {
        response = '🤖 Я — Qwen (Tongyi Qianwen), велика мовна модель від Alibaba Group. Створений бути корисним помічником у програмуванні, аналізі, написанні текстів та багато іншого!';
      } else if (lower.includes('код') || lower.includes('code') || lower.includes('програмув')) {
        response = '💻 Я можу писати код на багатьох мовах: JavaScript, TypeScript, Python, React, HTML/CSS та інших. Просто опиши, що потрібно — і я створю це прямо тут!';
      } else if (lower.includes('текст') || lower.includes('написат')) {
        response = '✍️ Я можу писати та редагувати тексти: статті, есе, листи, описи продуктів, маркетингові тексти, переклади та багато іншого.';
      } else if (lower.includes('аналіз') || lower.includes('дані')) {
        response = '📊 Я можу аналізувати текст, структуризувати інформацію, знаходити закономірності, порівнювати варіанти та допомагати з прийняттям рішень.';
      } else if (lower.includes('можеш') || lower.includes('вмієш') || lower.includes('can you')) {
        response = '🚀 Я вмію: писати код, аналізувати дані, перекладати, пояснювати складні речі, генерувати ідеї, створювати веб-сайти, розв\'язувати задачі та багато іншого!';
      } else {
        response = '🤔 Цікаве питання! У реальному чаті на coder.qwen.ai я б дав детальну відповідь і навіть створив код. Спробуй написати мені конкретне завдання!';
      }
      setChatMessages(prev => [...prev, { role: 'assistant', text: response }]);
    }, 800);
  };

  const capabilities = [
    { icon: '💻', title: 'Програмування', desc: 'Пишу та аналізую код на 50+ мовах програмування. React, Python, TypeScript, Go, Rust, Java та інші.' },
    { icon: '✍️', title: 'Написання текстів', desc: 'Статті, есе, листи, маркетингові тексти, сценарії, технічна документація — все це я можу.' },
    { icon: '🔍', title: 'Аналіз інформації', desc: 'Аналізую документи, дані, код. Знаходжу помилки, пропоную покращення та оптимізації.' },
    { icon: '🌐', title: 'Багатомовність', desc: 'Вільно спілкуюся українською, англійською, китайською та багатьма іншими мовами. Перекладаю тексти.' },
    { icon: '🧮', title: 'Математика та логіка', desc: 'Розв\'язую математичні задачі, працюю з формулами, статистикою, логічними головоломками.' },
    { icon: '🎨', title: 'Креативність', desc: 'Генерую ідеї, допомагаю з брейнштормінгом, пишу вірші, історії та креативний контент.' },
    { icon: '📚', title: 'Навчання', desc: 'Пояснюю складні концепції простою мовою. Допомагаю вчитися новому крок за кроком.' },
    { icon: '🔧', title: 'Веб-розробка', desc: 'Створюю повноцінні веб-сайти з React, TypeScript, Tailwind CSS прямо в чаті — як цей сайт!' },
  ];

  const howToSteps = [
    { num: '01', title: 'Задай питання', desc: 'Просто напиши мені що завгодно — від простого питання до складного завдання. Я розумію природну мову.' },
    { num: '02', title: 'Будь конкретним', desc: 'Чим детальніше опишеш задачу, тим кращий результат отримаєш. Додавай контекст та приклади.' },
    { num: '03', title: 'Отримай результат', desc: 'Я відповім детально та структуровано. У coder.qwen.ai я одразу створю код, який можна побачити в превʼю.' },
    { num: '04', title: 'Уточнюй та ітеруй', desc: 'Не задоволений результатом? Скажи, що змінити! Я можу адаптувати відповідь під твої потреби.' },
  ];

  const faqItems = [
    { q: 'Хто ти? Яка ти AI-модель?', a: 'Я — Qwen (Tongyi Qianwen), велика мовна модель, розроблена лабораторією Tongyi Lab компанії Alibaba Group. Я не Claude, не GPT, не Gemini — я Qwen!' },
    { q: 'Що таке coder.qwen.ai?', a: 'Це веб-середовище (IDE в браузері), де ти можеш спілкуватися зі мною, а я створюю код у реальному часі. Ти бачиш результат одразу у попередньому перегляді. Це зручний інструмент для швидкої розробки!' },
    { q: 'Де ще можна зі мною поспілкуватися?', a: 'Окрім coder.qwen.ai, мене можна знайти на tongyi.aliyun.com, а також через API від Alibaba Cloud для інтеграції у ваші додатки.' },
    { q: 'Які мови ти підтримуєш?', a: 'Я вільно спілкуюся українською, англійською, китайською, японською, корейською, французькою, німецькою, іспанською та багатьма іншими мовами — загалом понад 50 мов.' },
    { q: 'Чи можу я завантажувати файли?', a: 'Так! У деяких інтерфейсах можна завантажувати документи, зображення та код для аналізу. У coder.qwen.ai я працюю з файлами проекту напряму.' },
    { q: 'Чи ти безкоштовний?', a: 'coder.qwen.ai надає доступ до мене для розробки. Також є безкоштовні та платні тарифи на офіційних платформах Alibaba.' },
  ];

  const tabs = [
    { title: '👨‍💻 Для розробників', content: 'Напиши код, знайди баги, створи веб-сайт, поясни алгоритм, напиши тести, зроби рефакторинг — я твій AI-напарник у програмуванні. У coder.qwen.ai я створюю повноцінні проекти прямо в чаті!' },
    { title: '🎓 Для студентів', content: 'Поясню будь-яку тему, допоможу з домашнім завданням, перевірю есе, підготую до іспиту, навчу новій мові програмування. Спитай — і я поясню крок за кроком.' },
    { title: '💼 Для бізнесу', content: 'Аналізую дані, пишу бізнес-плани, створюю презентації, допомагаю з комунікацією, оптимізую процеси, перекладаю документи.' },
    { title: '🎭 Для творчості', content: 'Генерую ідеї, пишу історії, допомагаю з брейнштормінгом, створюю контент для соцмереж, пишу сценарії та вірші.' },
  ];

  const navItems = [
    { id: 'about', label: 'Про мене' },
    { id: 'capabilities', label: 'Можливості' },
    { id: 'howto', label: 'Як користуватися' },
    { id: 'faq', label: 'FAQ' },
    { id: 'demo', label: 'Демо' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-gray-950/90 backdrop-blur-xl shadow-lg shadow-purple-900/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center font-bold text-sm">Q</div>
              <span className="font-bold text-lg">Qwen AI</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-sm transition-colors ${activeSection === item.id ? 'text-violet-400' : 'text-gray-400 hover:text-white'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-800">
            <div className="px-4 py-4 space-y-3">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="block w-full text-left py-2 text-gray-300 hover:text-violet-400 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-gray-300">Онлайн на coder.qwen.ai</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
              Привіт, я Qwen
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-400 mb-4 max-w-3xl mx-auto">
            AI-асистент від <span className="text-white font-semibold">Alibaba Group</span>
          </p>
          
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
            Я — Qwen (Tongyi Qianwen), велика мовна модель від Tongyi Lab. Створений бути корисним, безпечним та чесним. Давай познайомимось!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo('about')}
              className="px-8 py-4 bg-gradient-to-r from-violet-500 to-blue-600 rounded-xl font-semibold text-lg hover:from-violet-400 hover:to-blue-500 transition-all shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:-translate-y-0.5"
            >
              Дізнатися більше ↓
            </button>
            <button
              onClick={() => scrollTo('demo')}
              className="px-8 py-4 bg-gray-800 border border-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-700 transition-all hover:-translate-y-0.5"
            >
              Спробувати демо 💬
            </button>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-1.5">
              <div className="w-1.5 h-3 rounded-full bg-gray-400 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Хто я <span className="bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text text-transparent">такий?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Коротко про те, що я є і хто мене створив
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-3xl mb-6">
                🤖
              </div>
              <h3 className="text-2xl font-bold mb-4">Про Qwen</h3>
              <div className="space-y-3 text-gray-300">
                <p><span className="text-violet-400 font-semibold">Ім'я:</span> Qwen (通义千问 / Tongyi Qianwen)</p>
                <p><span className="text-violet-400 font-semibold">Творець:</span> Alibaba Group (Tongyi Lab)</p>
                <p><span className="text-violet-400 font-semibold">Тип:</span> Велика мовна модель (LLM)</p>
                <p><span className="text-violet-400 font-semibold">Мета:</span> Бути корисним, безпечним та чесним помічником</p>
                <p><span className="text-violet-400 font-semibold">Мови:</span> 50+ мов, включаючи українську</p>
                <p><span className="text-violet-400 font-semibold">Контекст:</span> Довгий контекст — до сотень тисяч токенів</p>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-3xl mb-6">
                🏢
              </div>
              <h3 className="text-2xl font-bold mb-4">Про Alibaba Group</h3>
              <div className="space-y-3 text-gray-300">
                <p>Alibaba Group — одна з найбільших технологічних компаній світу, заснована у 1999 році Джеком Ма.</p>
                <p>Tongyi Lab — підрозділ Alibaba, що займається дослідженнями у сфері штучного інтелекту та розробкою моделі Qwen.</p>
                <p className="text-violet-400/80 italic">"Ми прагнемо зробити AI доступним та корисним для кожного."</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {[
              { icon: '🎯', title: 'Корисність', desc: 'Я намагаюся давати максимально корисні та релевантні відповіді на ваші запитання' },
              { icon: '🛡️', title: 'Безпека', desc: 'Розроблений з акцентом на безпеку та етичне використання AI' },
              { icon: '💎', title: 'Чесність', desc: 'Я кажу, коли не знаю, і не вигадую фактів навмисно' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6 text-center hover:border-violet-500/30 transition-colors">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-24 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Що я <span className="bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text text-transparent">вмію?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Мої основні можливості та сфери застосування
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="group bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-violet-500/50 hover:bg-gray-900/80 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-900/10"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{cap.icon}</div>
                <h3 className="font-bold text-lg mb-2">{cap.title}</h3>
                <p className="text-gray-400 text-sm">{cap.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">Для кого я підходжу?</h3>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === i ? 'bg-violet-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'}`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center">
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">{tabs[activeTab].content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to use Section */}
      <section id="howto" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Як зі мною <span className="bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text text-transparent">працювати?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Простий гайд для ефективного використання Qwen
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howToSteps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 h-full hover:border-violet-500/30 transition-colors">
                  <div className="text-5xl font-bold text-violet-500/20 mb-4">{step.num}</div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-700 text-2xl">→</div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-violet-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">💡 Поради для кращих результатів</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Давай конкретний контекст та приклади',
                'Розбивай складні задачі на кроки',
                'Проси пояснити, якщо щось незрозуміло',
                'Вказуй бажаний формат відповіді',
                'Не бійся просити переписати чи змінити',
                'У coder.qwen.ai — одразу тестуй результат у превʼю',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-violet-400 mt-0.5">✓</span>
                  <span className="text-gray-300 text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-6">Де мене знайти?</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'coder.qwen.ai', url: 'https://coder.qwen.ai', icon: '💻', desc: 'IDE + AI чат' },
                { name: 'Tongyi Qianwen', url: 'https://tongyi.aliyun.com', icon: '🌐', desc: 'Офіційний сайт' },
                { name: 'Alibaba Cloud API', url: 'https://www.alibabacloud.com', icon: '🔌', desc: 'Для розробників' },
              ].map((platform, i) => (
                <a
                  key={i}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-gray-800 border border-gray-700 rounded-xl hover:border-violet-500/50 hover:bg-gray-700 transition-all"
                >
                  <span className="text-2xl">{platform.icon}</span>
                  <div className="text-left">
                    <div className="font-medium">{platform.name}</div>
                    <div className="text-xs text-gray-500">{platform.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Часті <span className="bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text text-transparent">питання</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Відповіді на найпопулярніші запитання
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-medium pr-4">{item.q}</span>
                  <span className={`text-violet-400 transition-transform flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-gray-400 text-sm border-t border-gray-800/50 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Chat Section */}
      <section id="demo" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Спробуй <span className="bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text text-transparent">демо</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Міні-чат для демонстрації. Напиши мені щось!
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center font-bold text-xs">Q</div>
              <div>
                <div className="font-semibold text-sm">Qwen</div>
                <div className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Онлайн
                </div>
              </div>
            </div>

            <div className="h-80 overflow-y-auto p-6 space-y-4">
              {chatMessages.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <div className="text-4xl mb-3">💬</div>
                  <p>Напиши повідомлення, щоб почати демо-розмову</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {['Привіт!', 'Хто ти?', 'Що ти можеш?', 'Допоможи з кодом'].map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => { setChatInput(suggestion); }}
                        className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-xs text-gray-400 hover:text-white hover:border-violet-500/50 transition-all"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-violet-500 text-white rounded-br-md' : 'bg-gray-800 text-gray-200 rounded-bl-md'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleChatSubmit} className="px-6 py-4 border-t border-gray-800 flex gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Напиши повідомлення..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-gradient-to-r from-violet-500 to-blue-600 rounded-xl font-medium text-sm hover:from-violet-400 hover:to-blue-500 transition-all"
              >
                Надіслати
              </button>
            </form>
          </div>

          <p className="text-center text-gray-500 text-sm mt-4">
            * Це демо-симуляція. Для повноцінного спілкування продовжуй писати мені тут, у coder.qwen.ai!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center font-bold text-sm">Q</div>
            <span className="font-bold text-lg">Qwen by Alibaba Group</span>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Цей сайт створений Qwen AI як самопрезентація 🤖
          </p>
          <p className="text-gray-600 text-xs">
            Зроблено з ❤️ за допомогою React, TypeScript та Tailwind CSS на coder.qwen.ai
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
