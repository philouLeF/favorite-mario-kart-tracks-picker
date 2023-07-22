import React, { useState, useEffect } from "react";
import SelectionButton from "./SelectionButton";
import passImage from "../public/images/random-icon.webp";

type Course = {
  id: string;
  name: string;
  imageURL: string;
};

type EliminatedCourse = {
  course: Course;
  eliminatedBy: string;
};

type CoursePickerProps = {
  courses: Course[];
};

const CoursePicker: React.FC<CoursePickerProps> = ({ courses }) => {
  const [currentCourses, setCurrentCourses] = useState<Course[]>([]);
  const [survivedCourses, setSurvivedCourses] = useState<Course[]>([]);
  const [eliminatedCourses, setEliminatedCourses] = useState<
    EliminatedCourse[]
  >([]);
  // const [favoriteCourses, setFavoriteCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Initialize the current courses with the first three shuffled courses
    if (courses) {
      setCurrentCourses(shuffleCourses(courses).slice(0, 3));
    }
  }, [courses]);

  const pickCourse = (pickedCourse: Course) => {
    // Add the picked course to the survived courses
    setSurvivedCourses([...survivedCourses, pickedCourse]);

    // Remove the picked course from the current courses
    const newCurrentCourses = currentCourses.filter(
      (course) => course.id !== pickedCourse.id
    );
    setCurrentCourses(newCurrentCourses);

    // Add the remaining current courses to the eliminated courses
    setEliminatedCourses([
      ...eliminatedCourses,
      ...newCurrentCourses.map((course) => ({
        course,
        eliminatedBy: pickedCourse.id,
      })),
    ]);

    // Set the next three courses as the current courses
    setCurrentCourses(
      shuffleCourses(
        courses.slice(survivedCourses.length + 1, survivedCourses.length + 4)
      )
    );
  };

  const pass = () => {
    // Add the current courses to the survived courses
    setSurvivedCourses([...survivedCourses, ...currentCourses]);

    // Set the next three courses as the current courses
    setCurrentCourses(
      shuffleCourses(
        courses.slice(survivedCourses.length, survivedCourses.length + 3)
      )
    );
  };

  return (
    <div>
      {currentCourses.map((course) => (
        // <button key={course.id} onClick={() => pickCourse(course)}>
        //   <img className="w-32" src={course.imageURL} alt={course.name} />
        // </button>
        <SelectionButton
          key={course.id}
          imageSrc={course.imageURL}
          altText={course.name}
          onClick={() => pickCourse(course)}
        />
      ))}
      {/* <button onClick={pass}>
        <img src="public\images\random-icon.webp" alt="Pass" />
      </button> */}
      <SelectionButton imageSrc={passImage} altText="Pass" onClick={pass} />
    </div>
  );
};

const shuffleCourses = (courses: Course[]): Course[] => {
  // Shuffle the courses using the Fisher-Yates algorithm
  const shuffledCourses = [...courses];
  for (let i = shuffledCourses.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCourses[i], shuffledCourses[j]] = [
      shuffledCourses[j],
      shuffledCourses[i],
    ];
  }
  return shuffledCourses;
};

export default CoursePicker;
