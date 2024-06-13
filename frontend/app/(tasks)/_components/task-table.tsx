"use client";

import type { Project } from "@/_types/project";
import type { Task } from "@/_types/task";
import type { SetStateAction } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { TrashIcon } from "lucide-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

import { Badge } from "@/_components/ui/badge";
import { Button } from "@/_components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/_components/ui/table";

import { deleteTask } from "../_api/client/delete-task";
import { TaskDialog } from "./task-dialog";

export const taskStatusDetails = {
  0: {
    variant: "outline",
    label: "To do",
  },
  1: {
    variant: "yellow",
    label: "In progress",
  },
  2: {
    variant: "green",
    label: "Done",
  },
} as const;

interface TasksTableProps {
  tasks: Array<Task>;
  project: Project;
}

const TABLE_HEADERS = [
  { key: "name", label: "Task Name", sortable: true },
  { key: "assignee", label: "Assignee", sortable: true },
  { key: "dueDate", label: "Due Date", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "actions", label: "Actions", sortable: false },
] as const;

type ColumnNames = "name" | "assignee" | "dueDate" | "status";

export const TaskTable = ({ tasks, project }: TasksTableProps) => {
  const router = useRouter();

  const [sortColumn, setSortColumn] = useState<ColumnNames>("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const { mutate, isLoading } = useMutation<void, Error, number>({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Task deleted successfully");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSort = (column: SetStateAction<ColumnNames>) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedTasks = useMemo(() => {
    return tasks.sort((a, b) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [tasks, sortColumn, sortDirection]);

  return (
    <div className="w-full max-w-4xl xl:mx-auto">
      <div className="mb-4 flex justify-end">
        <TaskDialog project={project} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {TABLE_HEADERS.map((header) => (
              <TableHead
                key={header.key}
                className={header.sortable === false ? "" : "cursor-pointer"}
                onClick={() =>
                  header.sortable !== false
                    ? handleSort(header.key as ColumnNames)
                    : null
                }
              >
                {header.label}
                {sortColumn === header.key && (
                  <span className="ml-2">
                    {sortDirection === "asc" ? "\u2191" : "\u2193"}
                  </span>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.assignee}</TableCell>
              <TableCell>{format(task.dueDate, "PPP")}</TableCell>
              <TableCell>
                <Badge
                  className="whitespace-nowrap"
                  variant={taskStatusDetails[task.status as 0 | 1 | 2].variant}
                >
                  {taskStatusDetails[task.status as 0 | 1 | 2].label}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <TaskDialog project={project} task={task} />
                  <Button
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => mutate(task.id)}
                    disabled={isLoading}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
