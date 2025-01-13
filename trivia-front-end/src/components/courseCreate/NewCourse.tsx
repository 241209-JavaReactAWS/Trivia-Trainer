import React, { useEffect, useState } from "react";
import axios from "axios";
import { Course } from "../interfaces/Course";

interface NewCourseProps {
  onClose: () => void;
  onCourseUpdated: (updatedCourse: Course) => void;
  courseToEdit: Course | null;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function NewCourse({ onClose, onCourseUpdated, courseToEdit }: NewCourseProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    fee: 0.0, // Default type is compatible with double
  });

  useEffect(() => {
    if (courseToEdit) {
      setFormData({
        name: courseToEdit.name,
        description: courseToEdit.description,
        fee: courseToEdit.fee,
      });
    }
  }, [courseToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "fee" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .patch<Course>(`${backendUrl}/courses/${courseToEdit?.courseId}`, formData)
      .then((response) => {
        console.log("Course updated successfully:", response.data);
        onCourseUpdated(response.data); // Pass the updated course back to the parent
        onClose(); // Close the popup
      })
      .catch((error) => {
        console.error("Error updating course:", error);
        alert("Failed to update the course. Please try again.");
      });
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Edit Course</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Course Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Fee:
            <input
              type="number"
              name="fee"
              step="0.01" // Allows input of decimal values
              value={formData.fee}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Edit Course</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewCourse;
