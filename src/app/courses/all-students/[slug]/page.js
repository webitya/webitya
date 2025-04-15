'use client';

import {
  Avatar,
  Chip,
  Link as MuiLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  Paper
} from '@mui/material';
import { FileDownload } from '@mui/icons-material';
import studentViewAllData from '../../../../components/CoursesPage/CourseEnrollStudents/CourseStudentViewAllData/coursestudentviewalldata';
import Link from 'next/link';

export default function StudentDetailPage({ params }) {
  const { slug } = params;
  const student = studentViewAllData[slug];

  if (!student) {
    return <p className="p-6 text-red-500">Student not found.</p>;
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-center mb-10 bg-white p-6 rounded-lg shadow">
        <Avatar
          src={student.image}
          alt={student.name}
          sx={{ width: 100, height: 100 }}
        />
        <div>
          <Typography variant="h4" fontWeight="bold">{student.name}</Typography>
          <Typography color="text.secondary">{student.qualification}</Typography>
          <Typography>{student.course}</Typography>
          <Typography>{student.address}</Typography>
          <MuiLink
            href={student.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            underline="hover"
          >
            LinkedIn Profile
          </MuiLink>
          <Typography variant="body2" color="text.secondary">{student.email}</Typography>
        </div>
      </div>

      {/* 60-Day Journey Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <Typography variant="h6" gutterBottom>60-Day Course Journey</Typography>
        <TableContainer component={Paper} sx={{ maxHeight: 500, overflow: 'auto' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Day</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Topic</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Download Homework</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Homework Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Lecture</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Resource</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {student.journey.map((entry, index) => (
                <TableRow key={index} hover>
                  <TableCell>{entry.day}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.topic}</TableCell>

                  {/* Download Homework */}
                  <TableCell>
                    {entry.homework === 'Done' && entry.homeworkLink ? (
                      <Tooltip title="Download Homework">
                        <MuiLink
                          href={entry.homeworkLink}
                          download
                          underline="none"
                          sx={{ color: 'primary.main' }}
                        >
                          <FileDownload />
                        </MuiLink>
                      </Tooltip>
                    ) : (
                      <Typography variant="body2" color="text.disabled">—</Typography>
                    )}
                  </TableCell>

                  {/* Homework Status */}
                  <TableCell>
                    {entry.homework === 'Done' ? (
                      <Chip label="Completed" color="success" size="small" variant="outlined" />
                    ) : (
                      <Chip label="Pending" color="warning" size="small" variant="outlined" />
                    )}
                  </TableCell>

                  {/* Lecture */}
                  <TableCell>
                    <MuiLink
                      href={entry.lectureLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      color="primary"
                    >
                      Watch
                    </MuiLink>
                  </TableCell>

                  {/* Resource */}
                  <TableCell>
                    <MuiLink
                      href={entry.resourceLink}
                      download
                      underline="hover"
                      color="secondary"
                    >
                      Download
                    </MuiLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
