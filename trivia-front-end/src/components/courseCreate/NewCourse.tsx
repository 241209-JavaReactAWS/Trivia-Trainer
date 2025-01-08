import React, { useEffect, useState } from "react";
import axios from "axios";
import { Course } from "../interfaces/Course";

interface NewCourseProps {
  onClose: () => void;
  onCourseAdded: (course: Course) => void;
  courseToEdit: Course | null
}

function NewCourse({ onClose, onCourseAdded, courseToEdit }: NewCourseProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    fee: 0.0,
  });

  useEffect(() => {
    if (courseToEdit) {
      setFormData({
        name: courseToEdit.name,
        description: courseToEdit.description,
        fee: courseToEdit.fee
      });
    }
  }, [courseToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    const submitAction = courseToEdit
    ? axios.patch<Course>(`http://localhost:8080/courses/${courseToEdit.courseId}`, formData)
    : axios.post<Course>("http://localhost:8080/courses", formData);

    submitAction
    .then((response) => {
      console.log(courseToEdit ? "Course edited:" : "New course added:", response.data);
      onCourseAdded(response.data);
      onClose();
    })
    .catch((error) => {
      console.error("Error submitting Course:", error);
      alert("Failed to submit the Course.");
    });
};

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{courseToEdit ? "Edit Course" : "Add a New Course"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Course Name:
            <input
              type="text"
              name="courseName"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="desc"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Fee:
            <input
              type="text"
              name="courseFee"
              value={formData.fee}
              onChange={handleChange}
            />
          </label>
          <button type="submit">{courseToEdit ? "Update Course" : "Add Course"}</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewCourse;
