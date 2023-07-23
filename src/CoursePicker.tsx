import React, { useState, useEffect } from "react";
import SelectionButton from "./SelectionButton";
import passImage from "../public/images/pass.png";

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
  const [favoriteCourse, setFavoriteCourse] = useState<Course | null>(null);

  useEffect(() => {
    // Initialize the current courses with the first three shuffled courses
    if (courses) {
      setCurrentCourses(shuffleCourses(courses).slice(0, 3));
    }
  }, [courses]);

  const reintroduceEliminatedCourses = (eliminatorId: string) => {
    const reintroducedCourses = eliminatedCourses.filter(
      (eliminatedCourse) => eliminatedCourse.eliminatedBy === eliminatorId
    );

    setEliminatedCourses(
      eliminatedCourses.filter(
        (eliminatedCourse) => eliminatedCourse.eliminatedBy !== eliminatorId
      )
    );

    setSurvivedCourses([
      ...survivedCourses,
      ...reintroducedCourses.map((eliminatedCourse) => eliminatedCourse.course),
    ]);
  };

  const pickCourse = (pickedCourse: Course) => {
    // Add the picked course to the survived courses
    setSurvivedCourses([...survivedCourses, pickedCourse]);

    // Remove the picked course from the current courses
    const newCurrentCourses = currentCourses.filter(
      (course) => course.id !== pickedCourse.id
    );

    // Add the remaining current courses to the eliminated courses, with the picked course as the eliminator
    setEliminatedCourses([
      ...eliminatedCourses,
      ...newCurrentCourses.map((course) => ({
        course,
        eliminatedBy: pickedCourse.id,
      })),
    ]);

    // Reintroduce any courses that were eliminated by the picked course
    reintroduceEliminatedCourses(pickedCourse.id);

    // Set the next three courses as the current courses
    setCurrentCourses(
      shuffleCourses(
        courses.slice(survivedCourses.length + 1, survivedCourses.length + 4)
      )
    );
    if (survivedCourses.length + 1 === courses.length) {
      setFavoriteCourse(pickedCourse);
    }

    const nextCoursesStartIndex = survivedCourses.length + 1;
    const nextCoursesEndIndex = Math.min(
      nextCoursesStartIndex + 3,
      courses.length
    );
    setCurrentCourses(
      shuffleCourses(courses.slice(nextCoursesStartIndex, nextCoursesEndIndex))
    );

    // Check if the picked course is the last one
    if (nextCoursesStartIndex === courses.length) {
      setFavoriteCourse(pickedCourse);
    }

    // Set the next three courses as the current courses
    const remainingCourses = courses.filter(
      (course) =>
        !survivedCourses.map((c) => c.id).includes(course.id) &&
        !eliminatedCourses.map((ec) => ec.course.id).includes(course.id)
    );
    setCurrentCourses(shuffleCourses(remainingCourses).slice(0, 3));

    // Check if the picked course is the last one
    if (remainingCourses.length <= 1) {
      setFavoriteCourse(pickedCourse);
    }
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

    // Set the next three courses as the current courses
    const remainingCourses = courses.filter(
      (course) =>
        !survivedCourses.map((c) => c.id).includes(course.id) &&
        !eliminatedCourses.map((ec) => ec.course.id).includes(course.id)
    );
    setCurrentCourses(shuffleCourses(remainingCourses).slice(0, 3));
  };

  return (
    <div>
      {favoriteCourse ? (
        <div>
          <h2>Votre circuit préféré est :</h2>
          <SelectionButton
            key={favoriteCourse.id}
            imageSrc={favoriteCourse.imageURL}
            altText={favoriteCourse.name}
            onClick={() => {}}
          />
        </div>
      ) : currentCourses.length > 0 ? (
        currentCourses.map((course) => (
          <SelectionButton
            key={course.id}
            imageSrc={course.imageURL}
            altText={course.name}
            onClick={() => pickCourse(course)}
          />
        ))
      ) : (
        <p>Tous les circuits ont été choisis ou passés.</p>
      )}
      {!favoriteCourse && (
        <SelectionButton imageSrc={passImage} altText="Pass" onClick={pass} />
      )}
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
