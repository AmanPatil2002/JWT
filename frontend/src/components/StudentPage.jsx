import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

function StudentPage({ username }) {
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    const generateStudentData = () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const fullName = username || `${firstName} ${lastName}`;
      
      const courses = [
        { 
          name: "Mathematics", 
          grade: faker.helpers.arrayElement(['A', 'A-', 'B+', 'A+', 'B']), 
          teacher: `Mrs. ${faker.person.lastName()}` 
        },
        { 
          name: "English Literature", 
          grade: faker.helpers.arrayElement(['A', 'A-', 'B+', 'A+', 'B']), 
          teacher: `Mr. ${faker.person.lastName()}` 
        },
        { 
          name: faker.helpers.arrayElement(['Physics', 'Chemistry', 'Biology']), 
          grade: faker.helpers.arrayElement(['A', 'A-', 'B+', 'A+', 'B']), 
          teacher: `Dr. ${faker.person.lastName()}` 
        },
        { 
          name: "Computer Science", 
          grade: faker.helpers.arrayElement(['A', 'A-', 'B+', 'A+', 'B']), 
          teacher: `Ms. ${faker.person.lastName()}` 
        },
        { 
          name: faker.helpers.arrayElement(['History', 'Geography', 'Art', 'Music']), 
          grade: faker.helpers.arrayElement(['A', 'A-', 'B+', 'A+', 'B']), 
          teacher: `Mr. ${faker.person.lastName()}` 
        }
      ];

      return {
        fullName,
        studentId: `STU${faker.string.numeric({ length: 6 })}`,
        grade: faker.helpers.arrayElement(['9th', '10th', '11th', '12th']) + ' Grade',
        section: faker.helpers.arrayElement(['A', 'B', 'C', 'D']),
        email: faker.internet.email({ firstName, lastName, provider: 'school.edu' }),
        phone: faker.phone.number(),
        address: faker.location.streetAddress({ useFullAddress: true }),
        dateOfBirth: faker.date.birthdate({ min: 14, max: 18, mode: 'age' }).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        enrollmentDate: faker.date.past({ years: 3 }).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        gpa: faker.number.float({ min: 2.0, max: 4.0, fractionDigits: 1 }).toFixed(1),
        attendance: faker.number.int({ min: 85, max: 100 }) + '%',
        parentName: `${faker.person.firstName()} ${faker.person.lastName()}`,
        parentPhone: faker.phone.number(),
        bloodGroup: faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
        emergencyContact: faker.phone.number(),
        avatar: faker.image.avatar(),
        courses,
        recentActivities: [
          `Completed ${faker.helpers.arrayElement(['Math', 'Science', 'English'])} assignment - Due ${faker.date.soon().toLocaleDateString()}`,
          `Submitted ${faker.helpers.arrayElement(['Physics', 'Chemistry', 'Computer'])} project`,
          `Attended ${faker.helpers.arrayElement(['Computer Club', 'Science Club', 'Sports Club', 'Music Club'])} meeting`,
          `Borrowed ${faker.number.int({ min: 1, max: 5 })} books from library`
        ],
        upcomingEvents: [
          `${faker.helpers.arrayElement(['Math', 'Physics', 'Chemistry'])} Test - ${faker.date.soon({ days: 7 }).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`,
          `${faker.helpers.arrayElement(['Science Fair', 'Art Exhibition', 'Sports Day'])} - ${faker.date.soon({ days: 14 }).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`,
          `Parent-Teacher Meeting - ${faker.date.soon({ days: 21 }).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
        ]
      };
    };

    setStudentInfo(generateStudentData());
  }, [username]);

  if (!studentInfo) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-600 to-purple-700 flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">Loading student data...</div>
      </div>
    );
  }

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'bg-green-100 text-green-800';
    if (grade.includes('B')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 to-purple-700 p-4 md:p-8">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <img src={studentInfo.avatar} alt={studentInfo.fullName} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Student Dashboard</h1>
            <p className="text-xl text-gray-600 mb-2">Welcome back, {studentInfo.fullName}!</p>
            <span className="inline-block bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Student ID: {studentInfo.studentId}
            </span>
          </div>
          <div className="flex gap-4">
            <div className="bg-linear-to-br from-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl text-center">
              <div className="text-2xl font-bold">{studentInfo.gpa}</div>
              <div className="text-sm opacity-90">GPA</div>
            </div>
            <div className="bg-linear-to-br from-green-500 to-teal-600 text-white px-6 py-4 rounded-xl text-center">
              <div className="text-2xl font-bold">{studentInfo.attendance}</div>
              <div className="text-sm opacity-90">Attendance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-blue-500">
              📋 Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Full Name', value: studentInfo.fullName },
                { label: 'Grade & Section', value: `${studentInfo.grade} - Section ${studentInfo.section}` },
                { label: 'Email', value: studentInfo.email },
                { label: 'Phone', value: studentInfo.phone },
                { label: 'Address', value: studentInfo.address },
                { label: 'Date of Birth', value: studentInfo.dateOfBirth },
                { label: 'Blood Group', value: studentInfo.bloodGroup },
                { label: 'Enrollment Date', value: studentInfo.enrollmentDate }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <label className="text-xs font-semibold text-blue-600 uppercase block mb-1">{item.label}</label>
                  <span className="text-gray-700 text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Performance */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-blue-500">
              📊 Academic Performance
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-linear-to-br from-blue-500 to-purple-600 text-white p-6 rounded-xl text-center">
                <div className="text-3xl font-bold mb-1">{studentInfo.gpa}</div>
                <div className="text-sm opacity-90">GPA</div>
              </div>
              <div className="bg-linear-to-br from-green-500 to-teal-600 text-white p-6 rounded-xl text-center">
                <div className="text-3xl font-bold mb-1">{studentInfo.attendance}</div>
                <div className="text-sm opacity-90">Attendance</div>
              </div>
              <div className="bg-linear-to-br from-orange-500 to-red-600 text-white p-6 rounded-xl text-center">
                <div className="text-3xl font-bold mb-1">{studentInfo.courses.length}</div>
                <div className="text-sm opacity-90">Courses</div>
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-blue-500">
              👨‍👩‍👧 Parent/Guardian Info
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: 'Parent Name', value: studentInfo.parentName },
                { label: 'Contact Number', value: studentInfo.parentPhone },
                { label: 'Emergency Contact', value: studentInfo.emergencyContact }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <label className="text-xs font-semibold text-blue-600 uppercase block mb-1">{item.label}</label>
                  <span className="text-gray-700 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Current Courses */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-blue-500">
              📚 Current Courses
            </h2>
            <div className="space-y-3">
              {studentInfo.courses.map((course, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500 hover:shadow-md transition-shadow">
                  <div>
                    <h4 className="font-semibold text-gray-800">{course.name}</h4>
                    <p className="text-sm text-gray-600">Teacher: {course.teacher}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(course.grade)}`}>
                    {course.grade}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-blue-500">
              🔄 Recent Activities
            </h2>
            <ul className="space-y-3">
              {studentInfo.recentActivities.map((activity, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700 pb-3 border-b border-gray-200 last:border-0">
                  <span className="text-blue-500 text-xl mt-0.5">•</span>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-blue-500">
              📅 Upcoming Events
            </h2>
            <ul className="space-y-3">
              {studentInfo.upcomingEvents.map((event, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700 pb-3 border-b border-gray-200 last:border-0">
                  <span className="text-lg">📌</span>
                  <span>{event}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;