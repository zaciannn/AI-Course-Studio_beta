const Course = require('../models/Course');
const User = require('../models/User');

// Enroll in a newly generated course
exports.enrollCourse = async (req, res) => {
  try {
    const courseData = req.body;
    
    // Save course to database
    const course = new Course({
      ...courseData,
      createdBy: req.user._id
    });
    
    // If the frontend generated a custom full object include chapters manually if they exist
    await course.save();

    // Add to user enrolledCourses
    const user = await User.findById(req.user._id);
    // Remove if already accidentally exists? No, it's a new course each time
    user.enrolledCourses.push({
      courseId: course._id,
      hidden: false
    });
    
    await user.save();
    
    res.status(201).json({ message: 'Course enrolled successfully', course });
  } catch (error) {
    console.error('EnrollCourse Error:', error);
    res.status(500).json({ message: 'Server error enrolling course' });
  }
};

// Get user courses
exports.getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('enrolledCourses.courseId');
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Filter unhidden courses and map to send back the course data
    const activeCourses = user.enrolledCourses
      .filter(ec => !ec.hidden && ec.courseId) // make sure course exists
      .map(ec => {
        const c = ec.courseId.toObject();
        c.hidden = false;
        return c;
      });
      
    // Sort logic (maybe newest first)
    activeCourses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
    res.json(activeCourses);
  } catch (error) {
    console.error('GetMyCourses Error:', error);
    res.status(500).json({ message: 'Server error fetching courses' });
  }
};

// Hide a course
exports.hideCourse = async (req, res) => {
  try {
    const { id } = req.params; // course id
    
    const user = await User.findById(req.user._id);
    
    // Find the enrollment
    const enrollment = user.enrolledCourses.find(ec => ec.courseId.toString() === id);
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    
    enrollment.hidden = true;
    await user.save();
    
    res.json({ message: 'Course hidden successfully' });
  } catch (error) {
    console.error('HideCourse Error:', error);
    res.status(500).json({ message: 'Server error hiding course' });
  }
};

// Complete a chapter (This affects the global Course object because it's user-specific by generation)
exports.updateChapterProgress = async (req, res) => {
  try {
    const { id, chapterId } = req.params;
    
    const course = await Course.findOne({ _id: id, createdBy: req.user._id });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    
    const chapter = course.chapters.find(c => c.id === chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
    
    if (!chapter.isCompleted) {
      chapter.isCompleted = true;
      course.completedChapters = course.chapters.filter(c => c.isCompleted).length;
      await course.save();
    }
    
    res.json(course);
  } catch (error) {
    console.error('UpdateProgress Error:', error);
    res.status(500).json({ message: 'Server error updating progress' });
  }
};

// Update chapter content
exports.updateChapterContent = async (req, res) => {
  try {
    const { id, chapterId } = req.params;
    const { content_md, quiz, external_links, videoId_1, videoId_2 } = req.body;
    
    const course = await Course.findOne({ _id: id, createdBy: req.user._id });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    
    const chapter = course.chapters.find(c => c.id === chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
    
    // Update the properties
    if (content_md !== undefined) chapter.content_md = content_md;
    if (quiz !== undefined) chapter.quiz = quiz;
    if (external_links !== undefined) chapter.external_links = external_links;
    if (videoId_1 !== undefined) chapter.videoId_1 = videoId_1;
    if (videoId_2 !== undefined) chapter.videoId_2 = videoId_2;
    
    await course.save();
    
    res.json({ message: 'Chapter content updated', chapter });
  } catch (error) {
    console.error('UpdateChapterContent Error:', error);
    res.status(500).json({ message: 'Server error updating chapter content' });
  }
};
