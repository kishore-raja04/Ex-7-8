import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showCalorieApp, setShowCalorieApp] = useState(false);
  const [showResumeBuilder, setShowResumeBuilder] = useState(false);
  
  // Calorie Tracker States
  const [name, setName] = useState('');
  const [dailyGoal, setDailyGoal] = useState('');
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const [snacks, setSnacks] = useState('');
  const [result, setResult] = useState(null);

  // Resume Builder States
  const [portfolios, setPortfolios] = useState([]);
  const [currentView, setCurrentView] = useState('form');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [stats, setStats] = useState(null);

  // Fetch portfolios from MongoDB
  const fetchPortfolios = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/portfolios`);
      const data = await response.json();
      
      if (data.success) {
        setPortfolios(data.data);
        setMessage({ type: 'info', text: `📖 Loaded ${data.count} portfolio(s) from MongoDB` });
        setCurrentView('list');
      } else {
        setMessage({ type: 'danger', text: '❌ Failed to fetch portfolios' });
      }
    } catch (error) {
      setMessage({ type: 'danger', text: `❌ Error: ${error.message}` });
    }
    setLoading(false);
    setTimeout(() => setMessage(null), 3000);
  };

  // Create or Update portfolio in MongoDB
  const createPortfolio = async () => {
    if (!fullName || !email || !title) {
      setMessage({ type: 'danger', text: 'Please fill in required fields (Name, Email, Title)!' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: 'danger', text: 'Please enter a valid email address!' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setLoading(true);
    const portfolioData = {
      fullName, email, phone, title, summary, skills, 
      experience, education, linkedin, github
    };

    try {
      let response;
      if (editingId) {
        response = await fetch(`${API_URL}/portfolios/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(portfolioData)
        });
      } else {
        response = await fetch(`${API_URL}/portfolios`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(portfolioData)
        });
      }

      const data = await response.json();
      
      if (data.success) {
        setMessage({ 
          type: 'success', 
          text: editingId ? '✅ Portfolio updated in MongoDB!' : '✅ Portfolio saved to MongoDB!' 
        });
        clearForm();
        fetchPortfolios();
      } else {
        setMessage({ type: 'danger', text: `❌ ${data.message}` });
      }
    } catch (error) {
      setMessage({ type: 'danger', text: `❌ Error: ${error.message}` });
    }
    
    setLoading(false);
    setTimeout(() => setMessage(null), 3000);
  };

  // Delete portfolio from MongoDB
  const deletePortfolio = async (id) => {
    if (!window.confirm('Are you sure you want to delete this portfolio from MongoDB?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/portfolios/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'warning', text: '🗑️ Portfolio deleted from MongoDB!' });
        fetchPortfolios();
      } else {
        setMessage({ type: 'danger', text: '❌ Failed to delete portfolio' });
      }
    } catch (error) {
      setMessage({ type: 'danger', text: `❌ Error: ${error.message}` });
    }
    
    setLoading(false);
    setTimeout(() => setMessage(null), 3000);
  };

  // Edit portfolio
  const editPortfolio = (portfolio) => {
    setFullName(portfolio.fullName);
    setEmail(portfolio.email);
    setPhone(portfolio.phone || '');
    setTitle(portfolio.title);
    setSummary(portfolio.summary || '');
    setSkills(portfolio.skills || '');
    setExperience(portfolio.experience || '');
    setEducation(portfolio.education || '');
    setLinkedin(portfolio.linkedin || '');
    setGithub(portfolio.github || '');
    setEditingId(portfolio._id);
    setCurrentView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear form
  const clearForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setTitle('');
    setSummary('');
    setSkills('');
    setExperience('');
    setEducation('');
    setLinkedin('');
    setGithub('');
    setEditingId(null);
  };

  // View portfolio detail
  const viewPortfolioDetail = (portfolio) => {
    const detailWindow = window.open('', '_blank');
    detailWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${portfolio.fullName} - Portfolio</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
          body { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; }
          .resume-container { max-width: 900px; margin: 0 auto; background: white; padding: 50px; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
          .header { text-align: center; border-bottom: 3px solid #667eea; padding-bottom: 30px; margin-bottom: 30px; }
          .section { margin-bottom: 30px; }
          .section-title { color: #667eea; font-weight: bold; font-size: 1.4rem; margin-bottom: 15px; border-left: 4px solid #764ba2; padding-left: 15px; }
          .contact-info { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-top: 15px; }
          .contact-item { background: #f8f9fa; padding: 8px 15px; border-radius: 8px; font-size: 0.9rem; }
        </style>
      </head>
      <body>
        <div class="resume-container">
          <div class="header">
            <h1 style="color: #667eea; font-size: 2.5rem; margin-bottom: 10px;">${portfolio.fullName}</h1>
            <h4 style="color: #764ba2;">${portfolio.title}</h4>
            <div class="contact-info">
              <div class="contact-item">📧 ${portfolio.email}</div>
              ${portfolio.phone ? `<div class="contact-item">📱 ${portfolio.phone}</div>` : ''}
              ${portfolio.linkedin ? `<div class="contact-item">🔗 LinkedIn</div>` : ''}
              ${portfolio.github ? `<div class="contact-item">💻 GitHub</div>` : ''}
            </div>
          </div>
          
          ${portfolio.summary ? `
          <div class="section">
            <div class="section-title">📝 Professional Summary</div>
            <p style="line-height: 1.8; color: #555;">${portfolio.summary}</p>
          </div>
          ` : ''}
          
          ${portfolio.skills ? `
          <div class="section">
            <div class="section-title">🎯 Skills & Expertise</div>
            <p style="line-height: 1.8; color: #555;">${portfolio.skills}</p>
          </div>
          ` : ''}
          
          ${portfolio.experience ? `
          <div class="section">
            <div class="section-title">💼 Work Experience</div>
            <p style="line-height: 1.8; color: #555; white-space: pre-line;">${portfolio.experience}</p>
          </div>
          ` : ''}
          
          ${portfolio.education ? `
          <div class="section">
            <div class="section-title">🎓 Education</div>
            <p style="line-height: 1.8; color: #555; white-space: pre-line;">${portfolio.education}</p>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #eee;">
            <small style="color: #999;">Generated on ${new Date().toLocaleString()}</small>
          </div>
        </div>
      </body>
      </html>
    `);
  };

  // Calorie Tracker Functions
  const calculateCalories = () => {
    if (!name || !dailyGoal || !breakfast || !lunch || !dinner || !snacks) {
      alert('Please fill in all fields!');
      return;
    }

    const goal = parseFloat(dailyGoal);
    const breakfastCal = parseFloat(breakfast);
    const lunchCal = parseFloat(lunch);
    const dinnerCal = parseFloat(dinner);
    const snacksCal = parseFloat(snacks);

    if (goal <= 0 || breakfastCal < 0 || lunchCal < 0 || dinnerCal < 0 || snacksCal < 0) {
      alert('Please enter valid positive numbers!');
      return;
    }

    const totalConsumed = breakfastCal + lunchCal + dinnerCal + snacksCal;
    const remaining = goal - totalConsumed;

    setResult({ name, dailyGoal: goal, totalConsumed, remaining });
  };

  const resetForm = () => {
    setName('');
    setDailyGoal('');
    setBreakfast('');
    setLunch('');
    setDinner('');
    setSnacks('');
    setResult(null);
  };

  // Load portfolios on mount
  useEffect(() => {
    if (showResumeBuilder) {
      fetchPortfolios();
    }
  }, [showResumeBuilder]);

  if (showResumeBuilder) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div style={{ background: 'white', padding: '1rem 0', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h4 style={{ color: '#667eea', margin: 0 }}>
              Ex. 8 | Node.js Server with MongoDB - Digital Portfolio & Resume Builder
            </h4>
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <button
              onClick={() => {
                setShowResumeBuilder(false);
                setPortfolios([]);
                clearForm();
                setCurrentView('form');
              }}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              ← Back to Portfolio
            </button>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setCurrentView('form')}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: currentView === 'form' ? '#667eea' : 'white',
                  color: currentView === 'form' ? 'white' : '#667eea',
                  border: '2px solid #667eea',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                📝 Create Resume
              </button>
              <button
                onClick={fetchPortfolios}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: currentView === 'list' ? '#667eea' : 'white',
                  color: currentView === 'list' ? 'white' : '#667eea',
                  border: '2px solid #667eea',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                📚 View All ({portfolios.length})
              </button>
            </div>
          </div>

          {message && (
            <div style={{
              padding: '1rem',
              marginBottom: '1.5rem',
              background: message.type === 'success' ? '#d4edda' : message.type === 'danger' ? '#f8d7da' : '#d1ecf1',
              border: `1px solid ${message.type === 'success' ? '#c3e6cb' : message.type === 'danger' ? '#f5c6cb' : '#bee5eb'}`,
              borderRadius: '8px',
              color: message.type === 'success' ? '#155724' : message.type === 'danger' ? '#721c24' : '#0c5460'
            }}>
              <strong>{message.text}</strong>
            </div>
          )}

          {currentView === 'form' ? (
            <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '2rem',
                borderRadius: '16px 16px 0 0',
                textAlign: 'center',
                color: 'white'
              }}>
                <h2 style={{ margin: '0 0 0.5rem 0' }}>
                  {editingId ? '✏️ Edit Portfolio' : '📝 Create Your Digital Portfolio'}
                </h2>
                <p style={{ margin: 0, opacity: 0.9 }}>Build your professional resume with MongoDB database</p>
              </div>

              <div style={{ padding: '2rem' }}>
                <h5 style={{ color: '#667eea', marginBottom: '1.5rem' }}>👤 Personal Information</h5>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>
                      Full Name <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>
                      Professional Title <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Full Stack Developer"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>
                      Email Address <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem' }}
                    />
                  </div>
                </div>

                <hr style={{ margin: '2rem 0', border: 'none', borderTop: '2px solid #e0e0e0' }} />
                <h5 style={{ color: '#667eea', marginBottom: '1.5rem' }}>📋 Professional Details</h5>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Professional Summary</label>
                  <textarea
                    rows="4"
                    placeholder="Write a brief summary about yourself..."
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Skills & Technologies</label>
                  <textarea
                    rows="3"
                    placeholder="JavaScript, React, Node.js, MongoDB..."
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Work Experience</label>
                  <textarea
                    rows="5"
                    placeholder="List your work experience..."
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Education</label>
                  <textarea
                    rows="4"
                    placeholder="List your educational qualifications..."
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit' }}
                  />
                </div>

                <hr style={{ margin: '2rem 0', border: 'none', borderTop: '2px solid #e0e0e0' }} />
                <h5 style={{ color: '#667eea', marginBottom: '1.5rem' }}>🔗 Social Links</h5>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>LinkedIn Profile URL</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>GitHub Profile URL</label>
                    <input
                      type="url"
                      placeholder="https://github.com/yourusername"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={createPortfolio}
                    disabled={loading}
                    style={{
                      padding: '1rem 2rem',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.7 : 1
                    }}
                  >
                    {loading ? 'Processing...' : editingId ? '💾 Update Portfolio' : '✅ Save to MongoDB'}
                  </button>
                  <button
                    onClick={() => {
                      clearForm();
                      setEditingId(null);
                    }}
                    style={{
                      padding: '1rem 2rem',
                      background: 'white',
                      color: '#666',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    🔄 Clear Form
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '1.5rem 2rem',
                borderRadius: '16px 16px 0 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'white'
              }}>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0' }}>🗄️ Portfolio Database</h3>
                  <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>MongoDB Collection - All Resumes</p>
                </div>
                <button
                  onClick={fetchPortfolios}
                  disabled={loading}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'white',
                    color: '#667eea',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {loading ? 'Loading...' : '🔄 Refresh'}
                </button>
              </div>

              {portfolios.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📭</div>
                  <h5 style={{ color: '#666' }}>No portfolios in MongoDB database</h5>
                  <p style={{ color: '#999', marginBottom: '2rem' }}>Create your first portfolio to get started</p>
                  <button
                    onClick={() => setCurrentView('form')}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    📝 Create Portfolio
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', padding: '2rem' }}>
                  {portfolios.map((portfolio) => (
                    <div key={portfolio._id} style={{
                      border: '2px solid #e0e0e0',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      background: 'white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'start', marginBottom: '1rem' }}>
                        <div style={{
                          background: 'rgba(102, 126, 234, 0.1)',
                          borderRadius: '50%',
                          padding: '0.75rem',
                          marginRight: '1rem'
                        }}>
                          <span style={{ fontSize: '2rem' }}>👨‍💼</span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <h5 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>{portfolio.fullName}</h5>
                          <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>{portfolio.title}</p>
                        </div>
                      </div>

                      <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: '#666' }}>
                        <div style={{ marginBottom: '0.25rem' }}>📧 {portfolio.email}</div>
                        {portfolio.phone && <div>📱 {portfolio.phone}</div>}
                      </div>

                      {portfolio.summary && (
                        <p style={{
                          fontSize: '0.85rem',
                          color: '#666',
                          marginBottom: '1rem',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}>
                          {portfolio.summary}
                        </p>
                      )}

                      <div style={{ marginBottom: '1rem' }}>
                        <span style={{
                          background: '#f0f0f0',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          color: '#666'
                        }}>
                          📅 {new Date(portfolio.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <button
                          onClick={() => viewPortfolioDetail(portfolio)}
                          style={{
                            padding: '0.5rem',
                            background: '#667eea',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                          }}
                        >
                          👁️ View Full Resume
                        </button>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => editPortfolio(portfolio)}
                            style={{
                              flex: 1,
                              padding: '0.5rem',
                              background: 'white',
                              color: '#667eea',
                              border: '2px solid #667eea',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.9rem'
                            }}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => deletePortfolio(portfolio._id)}
                            disabled={loading}
                            style={{
                              flex: 1,
                              padding: '0.5rem',
                              background: 'white',
                              color: '#dc3545',
                              border: '2px solid #dc3545',
                              borderRadius: '6px',
                              cursor: loading ? 'not-allowed' : 'pointer',
                              fontSize: '0.9rem',
                              opacity: loading ? 0.6 : 1
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {portfolios.length > 0 && (
                <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '0 0 16px 16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
                    <div>
                      <h5 style={{ color: '#667eea', margin: '0 0 0.25rem 0' }}>{portfolios.length}</h5>
                      <small style={{ color: '#666' }}>Total Portfolios</small>
                    </div>
                    <div>
                      <h5 style={{ color: '#667eea', margin: '0 0 0.25rem 0' }}>
                        {new Set(portfolios.map(p => p.title)).size}
                      </h5>
                      <small style={{ color: '#666' }}>Unique Roles</small>
                    </div>
                    <div>
                      <h5 style={{ color: '#667eea', margin: '0 0 0.25rem 0' }}>MongoDB</h5>
                      <small style={{ color: '#666' }}>Database</small>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div style={{
            background: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
            borderRadius: '16px',
            padding: '2rem',
            marginTop: '2rem',
            color: 'white',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
          }}>
            <h5 style={{ marginBottom: '1.5rem' }}>🔧 Database Operations Implemented:</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px' }}>
                <h6 style={{ marginBottom: '0.5rem' }}>✅ CREATE (POST)</h6>
                <small style={{ opacity: 0.85 }}>Insert new portfolio records</small>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px' }}>
                <h6 style={{ marginBottom: '0.5rem' }}>📖 READ (GET)</h6>
                <small style={{ opacity: 0.85 }}>Fetch all portfolios from DB</small>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px' }}>
                <h6 style={{ marginBottom: '0.5rem' }}>✏️ UPDATE (PUT)</h6>
                <small style={{ opacity: 0.85 }}>Modify existing portfolio data</small>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px' }}>
                <h6 style={{ marginBottom: '0.5rem' }}>🗑️ DELETE (DELETE)</h6>
                <small style={{ opacity: 0.85 }}>Remove records from database</small>
              </div>
            </div>
            <div style={{ background: 'rgba(23, 162, 184, 0.3)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <small>
                <strong>⚡ Full-Stack Tech Stack:</strong> React (Frontend) + Node.js + Express (Backend) + MongoDB (NoSQL Database) + Mongoose ODM
              </small>
            </div>
          </div>
        </div>

        <div style={{ background: '#2d2d2d', color: 'white', textAlign: 'center', padding: '1.5rem' }}>
          <p style={{ margin: 0 }}>© 2025 Kishore Raja K | Digital Portfolio & Resume Builder with MongoDB</p>
        </div>
      </div>
    );
  }

  if (showCalorieApp) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div style={{ background: 'white', padding: '1rem 0', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h4 style={{ color: '#667eea', margin: 0 }}>Ex. 7 | React JS Application - Calorie Tracker</h4>
          </div>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
          <button
            onClick={() => {
              setShowCalorieApp(false);
              resetForm();
            }}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            ← Back to Portfolio
          </button>

          <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '2rem',
              borderRadius: '16px 16px 0 0',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ margin: '0 0 0.5rem 0' }}>🍎 Calorie Tracker</h2>
              <p style={{ margin: 0, opacity: 0.9 }}>Track your daily calorie intake and stay healthy!</p>
            </div>

            <div style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Daily Calorie Goal</label>
                <input
                  type="number"
                  placeholder="e.g., 2000"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>🌅 Breakfast</label>
                  <input
                    type="number"
                    placeholder="Calories"
                    value={breakfast}
                    onChange={(e) => setBreakfast(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>☀️ Lunch</label>
                  <input
                    type="number"
                    placeholder="Calories"
                    value={lunch}
                    onChange={(e) => setLunch(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>🌙 Dinner</label>
                  <input
                    type="number"
                    placeholder="Calories"
                    value={dinner}
                    onChange={(e) => setDinner(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>🍪 Snacks</label>
                  <input
                    type="number"
                    placeholder="Calories"
                    value={snacks}
                    onChange={(e) => setSnacks(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
                <button
                  onClick={calculateCalories}
                  style={{
                    padding: '1rem 2rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  📊 Calculate
                </button>
                <button
                  onClick={resetForm}
                  style={{
                    padding: '1rem 2rem',
                    background: 'white',
                    color: '#666',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  🔄 Reset
                </button>
              </div>

              {result && (
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  padding: '2rem',
                  borderRadius: '12px',
                  color: 'white'
                }}>
                  <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>📊 Results for {result.name}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', textAlign: 'center' }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '8px' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{result.dailyGoal}</div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Daily Goal</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '8px' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🍽️</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{result.totalConsumed}</div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Consumed</div>
                    </div>
                    <div style={{
                      background: result.remaining >= 0 ? 'rgba(46, 213, 115, 0.3)' : 'rgba(255, 71, 87, 0.3)',
                      padding: '1rem',
                      borderRadius: '8px'
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                        {result.remaining >= 0 ? '✅' : '⚠️'}
                      </div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {Math.abs(result.remaining)}
                      </div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                        {result.remaining >= 0 ? 'Remaining' : 'Over Limit'}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: '1.5rem', textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                    <p style={{ margin: 0, fontSize: '1.1rem' }}>
                      {result.remaining >= 0
                        ? `Great job! You have ${result.remaining} calories left for today. 🎉`
                        : `You've exceeded your limit by ${Math.abs(result.remaining)} calories. Consider adjusting your intake. 💪`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>👨‍💻 Kishore Raja K</h1>
          <h3 style={{ opacity: 0.9, fontWeight: 'normal' }}>Full-Stack Developer Portfolio</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            transition: 'transform 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          onClick={() => setShowCalorieApp(true)}>
            <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '1rem' }}>🍎</div>
            <h3 style={{ color: '#667eea', textAlign: 'center', marginBottom: '1rem' }}>Exercise 7</h3>
            <h4 style={{ textAlign: 'center', marginBottom: '1rem' }}>Calorie Tracker</h4>
            <p style={{ color: '#666', textAlign: 'center' }}>
              React JS application for tracking daily calorie intake with meal breakdown and goal monitoring
            </p>
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <span style={{ background: '#f0f0f0', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem' }}>
                React JS
              </span>
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            transition: 'transform 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          onClick={() => setShowResumeBuilder(true)}>
            <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '1rem' }}>📝</div>
            <h3 style={{ color: '#667eea', textAlign: 'center', marginBottom: '1rem' }}>Exercise 8</h3>
            <h4 style={{ textAlign: 'center', marginBottom: '1rem' }}>Resume Builder with MongoDB</h4>
            <p style={{ color: '#666', textAlign: 'center' }}>
              Full-stack application with Node.js backend and MongoDB database performing CRUD operations
            </p>
            <div style={{ textAlign: 'center', marginTop: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ background: '#f0f0f0', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem' }}>
                Node.js
              </span>
              <span style={{ background: '#f0f0f0', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem' }}>
                MongoDB
              </span>
              <span style={{ background: '#f0f0f0', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem' }}>
                Express
              </span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '3rem', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', padding: '2rem', color: 'white' }}>
          <h4 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>📚 Technologies Used</h4>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', borderRadius: '25px' }}>React</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', borderRadius: '25px' }}>Node.js</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', borderRadius: '25px' }}>Express</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', borderRadius: '25px' }}>MongoDB</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', borderRadius: '25px' }}>Mongoose</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;