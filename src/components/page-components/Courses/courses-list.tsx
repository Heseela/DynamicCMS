import { DataTable } from "../../../Global/Table/data-table";
import ErrorMessage from "../../../Global/error-message";
import { useCustomQuery } from "../../../Global/get-query";
import Loading from "../../../Global/loader";
import type { TAsyncCourses } from "../../../Models/courses.model";
import { QueryKey } from "../../../Types/query.types";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { CourseColumns } from "./courses-column";

const CourseList = () => {
  const { data: response, isLoading, error } = useCustomQuery<TAsyncCourses>({
    endPoint: QueryKey.COURSES,
    queryKey: [QueryKey.COURSES],
  });
  
  const courses = response?.data || [];

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Courses</h2>
        <Link to="/courses/add">
          <Button>Add New Course</Button>
        </Link>
      </div>

      <DataTable
        columns={CourseColumns}
        data={courses}
      />
    </div>
  );
};

export default CourseList;
