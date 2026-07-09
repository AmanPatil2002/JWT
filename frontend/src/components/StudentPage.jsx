import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

function StudentPage({ username }) {
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    const generateStudentData = () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      return {
        fullName: username || `${firstName} ${lastName}`,
        studentId: `STU${faker.string.numeric(6)}`,
        grade: faker.helpers.arrayElement(["9th","10th","11th","12th",]),
        section: faker.helpers.arrayElement(["A", "B", "C", "D"]),
        email: faker.internet.email(),
        attendance: faker.number.int({ min: 85, max: 100 }) + "%",
        gpa: faker.number.float({
          min: 2,
          max: 4,
          fractionDigits: 1,
        }),
        avatar: faker.image.avatar(),
      };
    };

    setStudentInfo(generateStudentData());
  }, [username]);

  if (!studentInfo) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <div className="text-center">
          <img src={studentInfo.avatar} alt="student" className="w-24 h-24 rounded-full mx-auto mb-4"/>
          <h2 className="text-2xl font-bold">
            {studentInfo.fullName}
          </h2>
          <p className="text-gray-600">
            ID: {studentInfo.studentId}
          </p>
        </div>
        <div className="mt-6 space-y-3">
          <div className="flex justify-between">
            <span>Grade</span>
            <span>{studentInfo.grade}</span>
          </div>
          <div className="flex justify-between">
            <span>Section</span>
            <span>{studentInfo.section}</span>
          </div>
          <div className="flex justify-between">
            <span>Email</span>
            <span>{studentInfo.email}</span>
          </div>
          <div className="flex justify-between">
            <span>Attendance</span>
            <span>{studentInfo.attendance}</span>
          </div>
          <div className="flex justify-between">
            <span>GPA</span>
            <span>{studentInfo.gpa}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
