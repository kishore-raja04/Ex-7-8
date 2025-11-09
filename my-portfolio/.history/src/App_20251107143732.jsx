import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [name, setName] = useState('');
  const [dailyGoal, setDailyGoal] = useState('');
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const [snacks, setSnacks] = useState('');
  const [result, setResult] = useState(null);

  const calculateCalories = () => {
    // Validation
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

    // Calculate
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

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
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

      {/* Title Bar */}
      <div className="bg-white py-3 shadow-sm">
        <div className="container">
          <h4 className="mb-0 text-center" style={{ color: '#667eea' }}>
            Ex. 7 | React JS Application Development
          </h4>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        {!showCalculator ? (
          // Portfolio Landing Page
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-5 text-center">
                  <div className="mb-4">
                    <div className="display-1 mb-3">🍎</div>
                    <h1 className="display-4 fw-bold mb-3" style={{ color: '#667eea' }}>
                      React JS Application Portfolio
                    </h1>
                    <p className="lead text-muted mb-4">
                      Developed by URK23CS1284
                    </p>
                  </div>

                  <div className="row g-4 mb-5">
                    <div className="col-md-4">
                      <div className="p-3">
                        <div className="fs-1 mb-2">⚛️</div>
                        <h5>React JS</h5>
                        <p className="text-muted small">Functional Components</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="p-3">
                        <div className="fs-1 mb-2">🎣</div>
                        <h5>React Hooks</h5>
                        <p className="text-muted small">useState Management</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="p-3">
                        <div className="fs-1 mb-2">🎨</div>
                        <h5>Bootstrap</h5>
                        <p className="text-muted small">Responsive Design</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-top pt-4 mb-4">
                    <h3 className="mb-3">Featured Application</h3>
                    <h4 style={{ color: '#764ba2' }}>Calorie Tracker</h4>
                    <p className="text-muted">
                      Track your daily calorie intake and maintain a healthy lifestyle
                    </p>
                  </div>

                  <button
                    className="btn btn-lg px-5 py-3 text-white shadow-lg"
                    style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      fontSize: '1.2rem'
                    }}
                    onClick={() => setShowCalculator(true)}
                  >
                    Open Calorie Tracker →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Calorie Tracker Application
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="mb-3">
                <button
                  className="btn btn-light shadow-sm"
                  onClick={() => {
                    setShowCalculator(false);
                    resetForm();
                  }}
                >
                  ← Back to Portfolio
                </button>
              </div>

              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-header text-white text-center py-4 rounded-top-4" 
                     style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <h2 className="mb-0">🍎 Calorie Tracker</h2>
                  <p className="mb-0 mt-2">Track your daily calorie intake and stay healthy!</p>
                </div>

                <div className="card-body p-4">
                  {/* Input Form */}
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
                      placeholder="Enter your daily calorie goal"
                      value={dailyGoal}
                      onChange={(e) => setDailyGoal(e.target.value)}
                    />
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">🌅 Breakfast Calories</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Breakfast calories"
                        value={breakfast}
                        onChange={(e) => setBreakfast(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">☀️ Lunch Calories</label>
                      <input
                        type="number"
                        className="form-control"
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
                        className="form-control"
                        placeholder="Dinner calories"
                        value={dinner}
                        onChange={(e) => setDinner(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">🍿 Snacks Calories</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Snacks calories"
                        value={snacks}
                        onChange={(e) => setSnacks(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
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

                  {/* Results Display */}
                  {result !== null && (
                    <div className="mt-5">
                      <div className="alert alert-info border-0 shadow-sm">
                        <h5 className="alert-heading mb-3">📊 Calorie Summary for {result.name}</h5>
                        <hr />
                        <div className="row text-center mt-3">
                          <div className="col-md-4 mb-3">
                            <div className="p-3 bg-white rounded shadow-sm">
                              <h6 className="text-muted mb-2">Daily Goal</h6>
                              <h3 className="mb-0" style={{ color: '#667eea' }}>
                                {result.dailyGoal}
                              </h3>
                              <small className="text-muted">calories</small>
                            </div>
                          </div>
                          <div className="col-md-4 mb-3">
                            <div className="p-3 bg-white rounded shadow-sm">
                              <h6 className="text-muted mb-2">Total Consumed</h6>
                              <h3 className="mb-0" style={{ color: '#764ba2' }}>
                                {result.totalConsumed}
                              </h3>
                              <small className="text-muted">calories</small>
                            </div>
                          </div>
                          <div className="col-md-4 mb-3">
                            <div className="p-3 bg-white rounded shadow-sm">
                              <h6 className="text-muted mb-2">Remaining</h6>
                              <h3 className="mb-0" style={{ 
                                color: result.remaining < 0 ? '#dc3545' : '#28a745' 
                              }}>
                                {result.remaining}
                              </h3>
                              <small className="text-muted">calories</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status Message */}
                      {result.remaining < 0 ? (
                        <div className="alert alert-danger border-0 shadow-sm" role="alert">
                          <h5 className="alert-heading">⚠️ Warning!</h5>
                          <p className="mb-0">
                            You exceeded your daily calorie goal by {Math.abs(result.remaining)} calories!
                          </p>
                        </div>
                      ) : (
                        <div className="alert alert-success border-0 shadow-sm" role="alert">
                          <h5 className="alert-heading">✅ Great Job!</h5>
                          <p className="mb-0">
                            You are within your daily goal! Keep it up!
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-dark text-white text-center py-3 mt-5">
        <p className="mb-0">
          © 2025 Web Technology Lab | URK23CS1284
        </p>
      </div>
    </div>
  );
}

export default App;