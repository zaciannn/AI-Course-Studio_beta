import { Course } from '../types';

const API_URL = 'http://localhost:5000/api/courses';

const getHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const fetchMyCourses = async (): Promise<Course[]> => {
  const res = await fetch(`${API_URL}/my-courses`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch courses');
  return res.json();
};

export const enrollCourse = async (courseData: Course): Promise<Course> => {
  const res = await fetch(`${API_URL}/enroll`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(courseData),
  });
  if (!res.ok) throw new Error('Failed to enroll course');
  const data = await res.json();
  return data.course;
};

export const hideCourse = async (courseId: string): Promise<void> => {
  const res = await fetch(`${API_URL}/${courseId}/hide`, {
    method: 'PUT',
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Failed to hide course');
};

export const updateChapterProgress = async (courseId: string, chapterId: string): Promise<Course> => {
  const res = await fetch(`${API_URL}/${courseId}/progress/${chapterId}`, {
    method: 'PUT',
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Failed to update progress');
  return res.json();
};

export const saveChapterContent = async (courseId: string, chapterId: string, data: any): Promise<void> => {
  const res = await fetch(`${API_URL}/${courseId}/chapter/${chapterId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save chapter content');
};
