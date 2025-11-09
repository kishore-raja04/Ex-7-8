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
        <div className="container text-center">
          <h4 className="mb-0" style={{ color: '#667eea' }}>
            Ex. 7 | React JS Application Development
          </h4>
        </div>
      </div>

      <div className="container py-5">
        {!showCalculator ? (
          /* Portfolio Home Page */
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-lg border-0 rounded-4 mb-4">
                <div className="card-body p-5 text-center">
                  <h1 className="display-3 fw-bold mb-3" style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    React JS Portfolio
                  </h1>
                  <p className="lead text-muted mb-4">
                    Dynamic Website Design with React JS
                  </p>
                  <div className="row g-3 mb-4">
                    <div className="col-md-3">
                      <div className="p-3 bg-light rounded">
                        <div className="fs-1">⚛️</div>
                        <h6 className="mt-2 mb-0">React JS</h6>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="p-3 bg-light rounded">
                        <div className="fs-1">🎣</div>
                        <h6 className="mt-2 mb-0">Hooks</h6>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="p-3 bg-light rounded">
                        <div className="fs-1">🎨</div>
                        <h6 className="mt-2 mb-0">Bootstrap</h6>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="p-3 bg-light rounded">
                        <div className="fs-1">📱</div>
                        <h6 className="mt-2 mb-0">Responsive</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Cards */}
              <div className="row g-4">
                {/* Calorie Tracker Card */}
                <div className="col-md-12">
                  <div className="card shadow-lg border-0 rounded-4 h-100 overflow-hidden">
                    <div className="card-header text-white py-4" style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    }}>
                      <div className="row align-items-center">
                        <div className="col">
                          <h3 className="mb-0">🍎 Calorie Tracker</h3>
                        </div>
                        <div className="col-auto">
                          <span className="badge bg-light text-dark px-3 py-2">Question 5</span>
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-4">
                      <p className="text-muted mb-4">
                        Track your daily calorie intake and maintain a healthy lifestyle. 
                        Monitor breakfast, lunch, dinner, and snacks to stay within your daily calorie goal.
                      </p>
                      
                      <div className="row g-3 mb-4">
                        <div className="col-md-3">
                          <div className="text-center p-2">
                            <div className="fs-4">🌅</div>
                            <small className="text-muted">Breakfast</small>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="text-center p-2">
                            <div className="fs-4">☀️</div>
                            <small className="text-muted">Lunch</small>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="text-center p-2">
                            <div className="fs-4">🌙</div>
                            <small className="text-muted">Dinner</small>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="text-center p-2">
                            <div className="fs-4">🍿</div>
                            <small className="text-muted">Snacks</small>
                          </div>
                        </div>
                      </div>

                      <div className="d-grid">
                        <button 
                          className="btn btn-lg text-white py-3"
                          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                          onClick={() => setShowCalculator(true)}
                        >
                          Open Calorie Tracker →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Calorie Tracker Application */
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="mb-3">
                <button
                  className="btn btn-light shadow-sm px-4"
                  onClick={() => {
                    setShowCalculator(false);
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
        )}
      </div>

      {/* Footer */}
      <div className="bg-dark text-white text-center py-3 mt-5">
        <div className="container">
          <p className="mb-0">© 2025 Web Technology Lab | URK23CS1284</p>
        </div>
      </div>
    </div>
  );
}

export default App;