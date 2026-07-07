import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

function TeacherPage({ username }) {
  const [teacherInfo, setTeacherInfo] = useState(null);

  useEffect(() => {
    const generateTeacherData = () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      const subjects = [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Biology",
        "Computer Science",
        "English",
      ];

      return {
        fullName: username || `Dr. ${firstName} ${lastName}`,
        teacherId: `TCH${faker.string.numeric(6)}`,
        department: faker.helpers.arrayElement([
          "Science",
          "Mathematics",
          "Computer Science",
          "English",
        ]),
        designation: faker.helpers.arrayElement([
          "Teacher",
          "Senior Teacher",
          "Head of Department",
        ]),
        specialization: faker.helpers.arrayElement(subjects),
        email: faker.internet.email(),
        experience: faker.number.int({
          min: 2,
          max: 20,
        }) + " Years",
        avatar: faker.image.avatar(),
      };
    };

    setTeacherInfo(generateTeacherData());
  }, [username]);

  if (!teacherInfo) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <div className="text-center">
          <img
            src={teacherInfo.avatar}
            alt="teacher"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />

          <h2 className="text-2xl font-bold">
            {teacherInfo.fullName}
          </h2>

          <p className="text-gray-600">
            ID: {teacherInfo.teacherId}
          </p>
        </div>

        <div className="mt-6 space-y-3">

          <div className="flex justify-between">
            <span>Department</span>
            <span>{teacherInfo.department}</span>
          </div>

          <div className="flex justify-between">
            <span>Designation</span>
            <span>{teacherInfo.designation}</span>
          </div>

          <div className="flex justify-between">
            <span>Specialization</span>
            <span>{teacherInfo.specialization}</span>
          </div>

          <div className="flex justify-between">
            <span>Email</span>
            <span>{teacherInfo.email}</span>
          </div>

          <div className="flex justify-between">
            <span>Experience</span>
            <span>{teacherInfo.experience}</span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default TeacherPage;