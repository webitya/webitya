// app/courses/all-students/page.js
import studentCardData from '../../../components/CoursesPage/CourseEnrollStudents/CourseStudentsCardData/coursestudentcarddata';
import Link from 'next/link';

export default function AllStudentsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {studentCardData.map(student => (
        <div key={student.id} className="border p-4 rounded shadow">
          <img src={student.image} alt={student.name} className="w-full h-40 object-cover rounded" />
          <h2 className="text-xl font-semibold mt-2">{student.name}</h2>
          <p className="text-gray-600">{student.course}</p>
          <p className="text-sm mt-1">{student.shortDesc}</p>
          <Link href={`/courses/all-students/${student.slug}`}>
            <button className="mt-3 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
              View More Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
