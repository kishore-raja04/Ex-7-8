import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showCalorieApp, setShowCalorieApp] = useState(false);
  
  // Calorie Tracker States
  const [name, setName] = useState('');
  const [dailyGoal, setDailyGoal] = useState('');
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const [snacks, setSnacks] = useState('');
  const [result, setResult] = useState(null);

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
      alert('Please enter valid positive numbers for all calorie fields!');
      return;
    }

    const totalConsumed = breakfastCal + lunchCal + dinnerCal + snacksCal;
    const remaining = goal - totalConsumed;

    setResult({
      name,
      dailyGoal: goal,
      totalConsumed,
      remaining
    });
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

  if (showCalorieApp) {
    return (
      <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="bg-dark text-white py-3 shadow">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h5 className="mb-0">23CS2049-Web Technology Lab-2025</h5>
              </div>
              <div className="col-md-6 text-md-end">
                <h5 className="mb-0">URK23CS1284</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-3 shadow-sm">
          <div className="container text-center">
            <h4 className="mb-0" style={{ color: '#667eea' }}>
              Ex. 7 | React JS Application - Calorie Tracker
            </h4>
          </div>
        </div>

        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="mb-3">
                <button
                  className="btn btn-light shadow-sm px-4"
                  onClick={() => {
                    setShowCalorieApp(false);
                    resetForm();
                  }}
                >
                  ← Back to Portfolio
                </button>
              </div>

              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-header text-white text-center py-4" style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                }}>
                  <h2 className="mb-1">🍎 Calorie Tracker</h2>
                  <p className="mb-0 opacity-75">Track your daily calorie intake and stay healthy!</p>
                </div>

                <div className="card-body p-4 p-md-5">
                  <div className="mb-4">
                    <label className="form-label fw-bold">Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">Daily Calorie Goal</label>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      placeholder="Enter your daily calorie goal (e.g., 2000)"
                      value={dailyGoal}
                      onChange={(e) => setDailyGoal(e.target.value)}
                    />
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">🌅 Breakfast Calories</label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="Breakfast calories"
                        value={breakfast}
                        onChange={(e) => setBreakfast(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">☀️ Lunch Calories</label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="Lunch calories"
                        value={lunch}
                        onChange={(e) => setLunch(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">🌙 Dinner Calories</label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="Dinner calories"
                        value={dinner}
                        onChange={(e) => setDinner(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">🍿 Snacks Calories</label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="Snacks calories"
                        value={snacks}
                        onChange={(e) => setSnacks(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-center mb-4">
                    <button
                      className="btn btn-lg px-5 text-white"
                      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                      onClick={calculateCalories}
                    >
                      Calculate Calories
                    </button>
                    <button
                      className="btn btn-secondary btn-lg px-5"
                      onClick={resetForm}
                    >
                      Reset
                    </button>
                  </div>

                  {result !== null && (
                    <div className="mt-4">
                      <div className="alert alert-info border-0 shadow-sm">
                        <h5 className="alert-heading mb-3">📊 Calorie Summary for {result.name}</h5>
                        <hr />
                        <div className="row text-center mt-4 g-3">
                          <div className="col-md-4">
                            <div className="p-4 bg-white rounded shadow-sm">
                              <h6 className="text-muted mb-2">Daily Goal</h6>
                              <h2 className="mb-0" style={{ color: '#667eea' }}>
                                {result.dailyGoal}
                              </h2>
                              <small className="text-muted">calories</small>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="p-4 bg-white rounded shadow-sm">
                              <h6 className="text-muted mb-2">Total Consumed</h6>
                              <h2 className="mb-0" style={{ color: '#764ba2' }}>
                                {result.totalConsumed}
                              </h2>
                              <small className="text-muted">calories</small>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="p-4 bg-white rounded shadow-sm">
                              <h6 className="text-muted mb-2">Remaining</h6>
                              <h2 className="mb-0" style={{ 
                                color: result.remaining < 0 ? '#dc3545' : '#28a745' 
                              }}>
                                {result.remaining}
                              </h2>
                              <small className="text-muted">calories</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {result.remaining < 0 ? (
                        <div className="alert alert-danger border-0 shadow-sm" role="alert">
                          <h5 className="alert-heading">⚠️ Warning!</h5>
                          <p className="mb-0">
                            <strong>You exceeded your daily calorie goal!</strong>
                            <br />
                            You consumed {Math.abs(result.remaining)} calories over your limit.
                          </p>
                        </div>
                      ) : (
                        <div className="alert alert-success border-0 shadow-sm" role="alert">
                          <h5 className="alert-heading">✅ Great Job!</h5>
                          <p className="mb-0">
                            <strong>You are within your daily goal!</strong>
                            <br />
                            You have {result.remaining} calories remaining. Keep it up!
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dark text-white text-center py-3">
          <p className="mb-0">© 2025 Kishore Raja K | Web Technology Lab</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="bg-dark text-white py-3 shadow">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h5 className="mb-0">23CS2049-Web Technology Lab-2025</h5>
            </div>
            <div className="col-md-6 text-md-end">
              <h5 className="mb-0">URK23CS1284</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-3 fw-bold mb-3" style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Welcome to My Portfolio
              </h1>
              <p className="lead text-muted mb-4">
                <em>Learn more About Me - Kishore Raja K</em>
              </p>
              <p className="fs-5">
                Hello! I'm <strong>Kishore Raja K</strong>, a passionate web developer enthusiastic about front-end and back-end technologies.
              </p>
            </div>
            <div className="col-lg-4 text-center">
              <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center" 
                   style={{ width: '200px', height: '200px' }}>
                <div className="text-center">
                  <div style={{ fontSize: '80px' }}>👨‍💻</div>
                  <small className="text-muted d-block">Profile Image</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-bottom sticky-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul className="navbar-nav">
                  {['home', 'about', 'skills', 'projects', 'contact'].map(section => (
                    <li className="nav-item" key={section}>
                      <button
                        className={`nav-link btn btn-link ${activeSection === section ? 'fw-bold' : ''}`}
                        style={{ color: activeSection === section ? '#667eea' : '#6c757d' }}
                        onClick={() => setActiveSection(section)}
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="container py-5">
        {/* Home Section */}
        {activeSection === 'home' && (
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-lg border-0 rounded-4 mb-4">
                <div className="card-body p-5">
                  <h2 className="mb-4" style={{ color: '#667eea' }}>🏠 Home</h2>
                  <p className="fs-5 mb-4">
                    Welcome to my personal portfolio website. Here you'll find information about my journey as a web developer.
                  </p>
                  <p className="text-muted">
                    I began my journey at <strong>Prodigy</strong> in 2024 and now intern at <strong>Webgapp</strong> working on full stack projects.
                  </p>
                  <p className="text-muted">
                    My stack includes <em>HTML, CSS, JavaScript, Python, MySQL</em> and I'm learning <em>React and Django</em>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About Section */}
        {activeSection === 'about' && (
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-5">
                  <h2 className="mb-4" style={{ color: '#667eea' }}>👨‍💻 About Me</h2>
                  <p className="fs-5 mb-4">
                    Hello! I'm <strong>Kishore Raja K</strong>, a passionate web developer enthusiastic about front-end and back-end technologies.
                  </p>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="p-4 bg-light rounded">
                        <h5 className="mb-3">🎓 Education</h5>
                        <p className="mb-0">Studying Web Technology and Full Stack Development</p>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="p-4 bg-light rounded">
                        <h5 className="mb-3">💼 Experience</h5>
                        <p className="mb-2"><strong>Prodigy</strong> - 2024</p>
                        <p className="mb-0"><strong>Webgapp</strong> - Intern (Current)</p>
                      </div>
                    </div>
                  </div>
                  <div className="alert alert-info border-0">
                    <h6>🛠️ Technologies I Use:</h6>
                    <p className="mb-2"><strong>Frontend:</strong> HTML5, CSS3, JavaScript, React</p>
                    <p className="mb-2"><strong>Backend:</strong> Python, Django, Flask</p>
                    <p className="mb-0"><strong>Database:</strong> MySQL, PostgreSQL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-5">
                  <h2 className="mb-4" style={{ color: '#667eea' }}>🎯 My Technical Skills</h2>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>Technology</th>
                          <th>Proficiency</th>
                          <th>Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>HTML/CSS</strong></td>
                          <td><span className="badge bg-success">Advanced</span></td>
                          <td>
                            <div className="progress">
                              <div className="progress-bar bg-success" style={{ width: '90%' }}>90%</div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>JavaScript</strong></td>
                          <td><span className="badge bg-primary">Intermediate</span></td>
                          <td>
                            <div className="progress">
                              <div className="progress-bar bg-primary" style={{ width: '70%' }}>70%</div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Python</strong></td>
                          <td><span className="badge bg-primary">Intermediate</span></td>
                          <td>
                            <div className="progress">
                              <div className="progress-bar bg-primary" style={{ width: '75%' }}>75%</div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>React</strong></td>
                          <td><span className="badge bg-info">Learning</span></td>
                          <td>
                            <div className="progress">
                              <div className="progress-bar bg-info" style={{ width: '60%' }}>60%</div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Django</strong></td>
                          <td><span className="badge bg-warning text-dark">Beginner</span></td>
                          <td>
                            <div className="progress">
                              <div className="progress-bar bg-warning" style={{ width: '40%' }}>40%</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-5">
                    <h4 className="mb-3">📚 My Learning Path:</h4>
                    <ol className="list-group list-group-numbered">
                      <li className="list-group-item">Master HTML & CSS ✅</li>
                      <li className="list-group-item">Learn JavaScript ✅</li>
                      <li className="list-group-item">Dive into Python & Django 🔄</li>
                      <li className="list-group-item">Build Full Stack Projects 🎯</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && (
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <h2 className="text-white mb-4">🚀 My Projects</h2>
              
              <div className="card shadow-lg border-0 rounded-4 mb-4">
                <div className="card-header text-white py-3" style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                }}>
                  <h4 className="mb-0">💻 Web Development Projects</h4>
                </div>
                <div className="card-body p-4">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex align-items-center">
                      <span className="fs-4 me-3">🌐</span>
                      <div>
                        <h6 className="mb-1">Personal Portfolio Website</h6>
                        <small className="text-muted">HTML, CSS, JavaScript</small>
                      </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center">
                      <span className="fs-4 me-3">🛒</span>
                      <div>
                        <h6 className="mb-1">Responsive E-commerce Landing Page</h6>
                        <small className="text-muted">HTML, CSS, Bootstrap</small>
                      </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center">
                      <span className="fs-4 me-3">📝</span>
                      <div>
                        <h6 className="mb-1">Flask-based ToDo Web App</h6>
                        <small className="text-muted">Python, Flask, MySQL</small>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card shadow-lg border-0 rounded-4 mb-4" style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
              }}>
                <div className="card-body p-5 text-white text-center">
                  <h3 className="mb-3">⚛️ Latest React Application</h3>
                  <h2 className="display-6 mb-4">🍎 Calorie Tracker</h2>
                  <p className="mb-4 opacity-75">
                    A fully functional React application that helps users track their daily calorie intake 
                    with real-time calculations and visual feedback.
                  </p>
                  <div className="row g-3 mb-4">
                    <div className="col-md-3 col-6">
                      <div className="bg-white bg-opacity-25 rounded p-3">
                        <div className="fs-3">🌅</div>
                        <small>Breakfast</small>
                      </div>
                    </div>
                    <div className="col-md-3 col-6">
                      <div className="bg-white bg-opacity-25 rounded p-3">
                        <div className="fs-3">☀️</div>
                        <small>Lunch</small>
                      </div>
                    </div>
                    <div className="col-md-3 col-6">
                      <div className="bg-white bg-opacity-25 rounded p-3">
                        <div className="fs-3">🌙</div>
                        <small>Dinner</small>
                      </div>
                    </div>
                    <div className="col-md-3 col-6">
                      <div className="bg-white bg-opacity-25 rounded p-3">
                        <div className="fs-3">🍿</div>
                        <small>Snacks</small>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="btn btn-light btn-lg px-5 py-3 shadow"
                    onClick={() => setShowCalorieApp(true)}
                  >
                    Launch Calorie Tracker →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-5">
                  <h2 className="mb-4" style={{ color: '#667eea' }}>📧 Contact Me</h2>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="p-4 bg-light rounded">
                        <h5 className="mb-3">📨 Email</h5>
                        <a href="mailto:kishoreraja.kkr@gmail.com" className="text-decoration-none">
                          kishoreraja.kkr@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="p-4 bg-light rounded">
                        <h5 className="mb-3">🔗 Connect With Me</h5>
                        <div className="d-flex flex-column gap-2">
                          <a href="https://www.linkedin.com/in/kishore-raja-k" target="_blank" rel="noopener noreferrer" 
                             className="btn btn-outline-primary btn-sm">
                            LinkedIn →
                          </a>
                          <a href="https://github.com/kishoreraja-k" target="_blank" 
                             className="btn btn-outline-dark btn-sm">
                            GitHub →
                          </a>
                          <a href="https://twitter.com/kishoreraja_k" target="_blank" 
                             className="btn btn-outline-info btn-sm">
                            Twitter →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-dark text-white text-center py-4 mt-5">
        <div className="container">
          <p className="mb-1">© 2025 Kishore Raja K. All rights reserved.</p>
          <p className="mb-0"><small>Built with React & Bootstrap | Last updated: November 2025</small></p>
        </div>
      </div>
    </div>
  );
}

export default App;