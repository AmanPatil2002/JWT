import { useState, useEffect } from 'react';
import StudentPage from './StudentPage';
import TeacherPage from './TeacherPage';
import './Home.css'

function Home() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem("role") || "";
    const storedUsername = localStorage.getItem("username") || "";
    
    const userRole = storedRole || 
      (storedUsername.toLowerCase() === "student" ? "student" : 
       storedUsername.toLowerCase() === "teacher" ? "teacher" : "");
    
    setRole(userRole);
    setUsername(storedUsername);
    
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
<div class="loader">
  <div class="dot dot-1"></div>
  <div class="dot dot-2"></div>
  <div class="dot dot-3"></div>
  <div class="dot dot-4"></div>
  <div class="dot dot-5"></div>
</div>

    );
  }

  return (
    <div>
      {!role ? (
        <div className="min-h-screen bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 text-center">
            <div className="space-y-4 mb-6">
              <span className="block text-white text-4xl font-bold animate-fade-in">Welcome</span>
              <span className="block text-white/90 text-3xl font-semibold animate-slide-up">Dashboard</span>
              <span className="block text-white/80 text-2xl animate-slide-up">Home Page</span>
            </div>
            <p className="text-white/70 text-xl">User</p>
          </div>
        </div>
      ) : role === "student" ? (
        <StudentPage username={username} />
      ) : (
        <TeacherPage username={username} />
      )}
    </div>
  );
}

export default Home;