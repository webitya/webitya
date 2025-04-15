'use client';

import Footer from '@/components/FooterEl';
import studentCardData from '../../../components/CoursesPage/CourseEnrollStudents/CourseStudentsCardData/coursestudentcarddata';
import Link from 'next/link';
import Image from 'next/image';

// MUI Icons
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function AllStudentsPage() {
  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="md:text-4xl text-3xl font-bold text-center text-gray-800 mb-12 flex justify-center items-center gap-2">
            <SchoolIcon className="text-blue-600 !text-5xl" />
            Meet Our Students
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {studentCardData.map((student) => (
              <div
                key={student.id}
                className="bg-white border border-gray-200 rounded-3xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition duration-300"
              >
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-full h-52 object-cover rounded-t-3xl"
                />
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
                    <PersonIcon className="text-blue-500" />
                    {student.name}
                  </h2>

                  <p className="text-blue-700 font-medium mb-1 flex items-center gap-2">
                    <MenuBookIcon className="text-sm" />
                    {student.course}
                  </p>

                  <p className="text-gray-600 text-sm">{student.shortDesc}</p>
                                    {/* Branding Footer */}
      <div className="flex justify-start items-center py-2 text-sm text-slate-500">
        <span>Powered by</span>
        <Link href="/">
          <Image
            src="/brand/logo1.png"
            alt="Webitya Logo"
            width={80}
            height={24}
            className="object-contain cursor-pointer"
          />
        </Link>
      </div>

                  <Link href={`/courses/all-students/${student.slug}`}>
                    <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-200 w-full">
                      <VisibilityIcon className="text-sm" />
                      View More
                    </button>
                  </Link>
  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    

      <Footer />
    </>
  );
}
