import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

function TeacherPage({ username }) {
  const [teacherInfo, setTeacherInfo] = useState(null);

  useEffect(() => {
    const generateTeacherData = () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const fullName = username || `Dr. ${firstName} ${lastName}`;
      
      const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'English'];
      const selectedSubjects = faker.helpers.arrayElements(subjects, faker.number.int({ min: 2, max: 4 }));
      
      const classesAssigned = [
        {
          grade: faker.helpers.arrayElement(['9th', '10th']),
          section: faker.helpers.arrayElement(['A', 'B']),
          subject: selectedSubjects[0],
          students: faker.number.int({ min: 20, max: 35 }),
          schedule: faker.helpers.arrayElement(['Mon/Wed/Fri', 'Tue/Thu/Sat'])
        },
        {
          grade: faker.helpers.arrayElement(['11th', '12th']),
          section: faker.helpers.arrayElement(['A', 'B']),
          subject: selectedSubjects[1],
          students: faker.number.int({ min: 20, max: 35 }),
          schedule: faker.helpers.arrayElement(['Mon/Wed/Fri', 'Tue/Thu/Sat'])
        },
        {
          grade: faker.helpers.arrayElement(['9th', '10th', '11th']),
          section: faker.helpers.arrayElement(['C', 'D']),
          subject: selectedSubjects[2] || selectedSubjects[0],
          students: faker.number.int({ min: 20, max: 35 }),
          schedule: faker.helpers.arrayElement(['Mon/Wed/Fri', 'Tue/Thu/Sat'])
        }
      ];

      // Fixed: Generate valid time ranges
      const morningHour1 = faker.number.int({ min: 8, max: 10 });
      const morningHour2 = faker.number.int({ min: 10, max: 12 });
      const afternoonHour = faker.number.int({ min: 1, max: 3 });

      return {
        fullName,
        teacherId: `TCH${faker.string.numeric({ length: 6 })}`,
        department: faker.helpers.arrayElement(['Science', 'Mathematics', 'English', 'Computer Science']) + ' Department',
        designation: faker.helpers.arrayElement(['Senior Teacher', 'Head of Department', 'Assistant Professor', 'Lead Instructor']),
        specialization: selectedSubjects.join(' & '),
        email: faker.internet.email({ firstName, lastName, provider: 'school.edu' }),
        phone: faker.phone.number(),
        officeLocation: `Room ${faker.number.int({ min: 100, max: 500 })}, ${faker.helpers.arrayElement(['Science Wing', 'Main Building', 'East Wing', 'West Block'])}`,
        officeHours: `Mon-Fri, ${faker.number.int({ min: 1, max: 3 })}:00 PM - ${faker.number.int({ min: 4, max: 6 })}:00 PM`,
        yearsOfExperience: faker.number.int({ min: 3, max: 25 }) + ' years',
        qualification: faker.helpers.arrayElement(['Ph.D.', 'M.Ed.', 'M.Sc.', 'M.A.']) + ' in ' + selectedSubjects[0],
        joinedDate: faker.date.past({ years: 20 }).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        employeeId: `EMP-${faker.string.numeric({ length: 4 })}-${faker.string.numeric({ length: 4 })}`,
        avatar: faker.image.avatar(),
        classesAssigned,
        upcomingClasses: [
          `${classesAssigned[0].subject} - ${classesAssigned[0].grade} ${classesAssigned[0].section} - Monday ${morningHour1}:00 AM`,
          `${classesAssigned[1].subject} - ${classesAssigned[1].grade} ${classesAssigned[1].section} - Monday ${morningHour2}:00 AM`,
          `${classesAssigned[2].subject} - ${classesAssigned[2].grade} ${classesAssigned[2].section} - Tuesday ${afternoonHour}:00 PM`
        ],
        recentAnnouncements: [
          `${selectedSubjects[0]} test scheduled for ${faker.date.soon({ days: 10 }).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`,
          `${faker.helpers.arrayElement(['Science fair', 'Project submission', 'Assignment'])} deadline: ${faker.date.soon({ days: 15 }).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`,
          `Extra class for ${faker.helpers.arrayElement(['struggling students', 'advanced learners', 'revision'])} on Saturday`
        ],
        tasksToDo: [
          `Grade ${selectedSubjects[0]} papers - Due ${faker.date.soon({ days: 5 }).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`,
          `Prepare lesson plan for next week`,
          `Attend department meeting - ${faker.date.soon({ days: 3 }).toLocaleDateString('en-US', { weekday: 'long' })} ${faker.number.int({ min: 2, max: 4 })} PM`,
          `Update student progress reports`,
          `Review ${faker.helpers.arrayElement(['curriculum', 'textbooks', 'exam papers'])}`
        ],
        achievements: [
          `${faker.helpers.arrayElement(['Best Teacher', 'Excellence in Teaching', 'Innovation in Education'])} Award ${faker.date.past({ years: 2 }).getFullYear()}`,
          `Published research paper in ${faker.helpers.arrayElement(['International', 'National', 'Educational'])} Journal`,
          `Mentored winning ${faker.helpers.arrayElement(['science fair', 'math olympiad', 'debate competition'])} team`
        ]
      };
    };

    setTeacherInfo(generateTeacherData());
  }, [username]);

  if (!teacherInfo) {
    return (
      <div className="min-h-screen bg-linear-to-br from-pink-500 to-rose-600 flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">Loading teacher data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-500 to-rose-600 p-4 md:p-8">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-500 shadow-lg">
            <img src={teacherInfo.avatar} alt={teacherInfo.fullName} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Teacher Dashboard</h1>
            <p className="text-xl text-gray-600 mb-2">Welcome back, {teacherInfo.fullName}!</p>
            <span className="inline-block bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Teacher ID: {teacherInfo.teacherId}
            </span>
          </div>
          <div className="flex gap-4">
            <div className="bg-linear-to-br from-pink-500 to-rose-600 text-white px-6 py-4 rounded-xl text-center">
              <div className="text-2xl font-bold">{teacherInfo.classesAssigned.length}</div>
              <div className="text-sm opacity-90">Classes</div>
            </div>
            <div className="bg-linear-to-br from-purple-500 to-indigo-600 text-white px-6 py-4 rounded-xl text-center">
              <div className="text-2xl font-bold">{teacherInfo.yearsOfExperience}</div>
              <div className="text-sm opacity-90">Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Professional Information */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-pink-500">
              👩‍🏫 Professional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Full Name', value: teacherInfo.fullName },
                { label: 'Department', value: teacherInfo.department },
                { label: 'Designation', value: teacherInfo.designation },
                { label: 'Specialization', value: teacherInfo.specialization },
                { label: 'Email', value: teacherInfo.email },
                { label: 'Phone', value: teacherInfo.phone },
                { label: 'Qualification', value: teacherInfo.qualification },
                { label: 'Experience', value: teacherInfo.yearsOfExperience }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <label className="text-xs font-semibold text-pink-600 uppercase block mb-1">{item.label}</label>
                  <span className="text-gray-700 text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Office Information */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-pink-500">
              🏢 Office Information
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: 'Office Location', value: teacherInfo.officeLocation },
                { label: 'Office Hours', value: teacherInfo.officeHours },
                { label: 'Joined Date', value: teacherInfo.joinedDate },
                { label: 'Employee ID', value: teacherInfo.employeeId }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <label className="text-xs font-semibold text-pink-600 uppercase block mb-1">{item.label}</label>
                  <span className="text-gray-700 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-pink-500">
              🏆 Achievements & Awards
            </h2>
            <ul className="space-y-3">
              {teacherInfo.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700 pb-3 border-b border-gray-200 last:border-0">
                  <span className="text-yellow-500 text-xl">⭐</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Classes Assigned */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-pink-500">
              📚 Assigned Classes
            </h2>
            <div className="space-y-3">
              {teacherInfo.classesAssigned.map((classItem, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border-l-4 border-pink-500 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {classItem.subject} - {classItem.grade} {classItem.section}
                  </h4>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <p className="text-gray-600">
                      <span className="font-semibold text-pink-600">Students:</span> {classItem.students}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold text-pink-600">Schedule:</span> {classItem.schedule}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-pink-500">
              📅 Today's Schedule
            </h2>
            <ul className="space-y-3">
              {teacherInfo.upcomingClasses.map((classItem, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700 pb-3 border-b border-gray-200 last:border-0">
                  <span className="text-lg">🕐</span>
                  <span>{classItem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-pink-500">
              📢 Recent Announcements
            </h2>
            <ul className="space-y-3">
              {teacherInfo.recentAnnouncements.map((announcement, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700 pb-3 border-b border-gray-200 last:border-0">
                  <span className="inline-block bg-rose-500 text-white px-2 py-0.5 rounded text-xs font-bold">New</span>
                  <span>{announcement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-pink-500">
              ✅ Pending Tasks
            </h2>
            <ul className="space-y-3">
              {teacherInfo.tasksToDo.map((task, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-700 pb-3 border-b border-gray-200 last:border-0">
                  <input type="checkbox" className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500 cursor-pointer" />
                  <span className="flex-1">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherPage;