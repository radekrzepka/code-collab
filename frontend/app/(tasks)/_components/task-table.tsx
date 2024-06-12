"use client";

import type { Task } from "@/_types/task";
import type { SetStateAction } from "react";
import { useMemo, useState } from "react";

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
import { TaskStatus } from "@/_types/task";

export const TaskTable = () => {
  const [tasks, setTasks] = useState<Array<Task>>([
    {
      id: 1,
      name: "Redesign website homepage",
      assignee: "John Doe",
      dueDate: "2023-06-30",
      status: TaskStatus.DONE,
    },
    {
      id: 2,
      name: "Implement new checkout flow",
      assignee: "Jane Smith",
      dueDate: "2023-07-15",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: 3,
      name: "Write technical documentation",
      assignee: "Michael Johnson",
      dueDate: "2023-08-01",
      status: TaskStatus.TODO,
    },
    {
      id: 4,
      name: "Optimize database queries",
      assignee: "Emily Davis",
      dueDate: "2023-07-31",
      status: TaskStatus.DONE,
    },
    {
      id: 5,
      name: "Develop mobile app prototype",
      assignee: "David Lee",
      dueDate: "2023-09-01",
      status: TaskStatus.DONE,
    },
    {
      id: 6,
      name: "Refactor codebase to use React Hooks",
      assignee: "Sarah Kim",
      dueDate: "2023-08-15",
      status: TaskStatus.TODO,
    },
    {
      id: 7,
      name: "Implement user authentication system",
      assignee: "Tom Wilson",
      dueDate: "2023-07-20",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: 8,
      name: "Create marketing campaign assets",
      assignee: "Jessica Nguyen",
      dueDate: "2023-09-10",
      status: TaskStatus.DONE,
    },
    {
      id: 9,
      name: "Optimize website performance",
      assignee: "Robert Hernandez",
      dueDate: "2023-08-31",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: 10,
      name: "Develop new product feature",
      assignee: "Olivia Gonzalez",
      dueDate: "2023-10-01",
      status: TaskStatus.DONE,
    },
  ]);
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (column: SetStateAction<string>) => {
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
    <div className="w-full max-w-4xl">
      <div className="mb-4 flex justify-end">
        <Button>Add Task</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Task Name
              {sortColumn === "name" && (
                <span className="ml-2">
                  {sortDirection === "asc" ? "\u2191" : "\u2193"}
                </span>
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("assignee")}
            >
              Assignee
              {sortColumn === "assignee" && (
                <span className="ml-2">
                  {sortDirection === "asc" ? "\u2191" : "\u2193"}
                </span>
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("dueDate")}
            >
              Due Date
              {sortColumn === "dueDate" && (
                <span className="ml-2">
                  {sortDirection === "asc" ? "\u2191" : "\u2193"}
                </span>
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Status
              {sortColumn === "status" && (
                <span className="ml-2">
                  {sortDirection === "asc" ? "\u2191" : "\u2193"}
                </span>
              )}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.assignee}</TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell>
                <Badge>{task.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete
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
