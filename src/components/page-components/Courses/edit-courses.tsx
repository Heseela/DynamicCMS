import { useParams } from "react-router-dom";
import { useCustomQuery } from "../../../Global/get-query";
import { type TAsyncCourse } from "../../../Models/courses.model";
import { QueryKey } from "../../../Types/query.types";
import Loading from "../../../Global/loader";
import ErrorMessage from "../../../Global/error-message";
import CourseForm from "./courses-form";

const EditCourse = () => {
  const { slug } = useParams();

  const { data: course, isLoading, error } = useCustomQuery<TAsyncCourse>({
    endPoint: `${QueryKey.COURSES}/${slug}`,
    queryKey: [QueryKey.COURSES, slug],
  });
  

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  return <CourseForm courseValues={course} slug={slug} formTitle="Edit Course" />;
};

export default EditCourse;