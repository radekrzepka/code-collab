"use client";

import type { CreateProjectTaskDto } from "@/_types/dto/dto";
import type { Project } from "@/_types/project";
import type { Task } from "@/_types/task";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, subDays } from "date-fns";
import { CalendarIcon, FilePenIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/_components/ui/button";
import { Calendar } from "@/_components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import { cn } from "@/_utils/utils";

import { createTask } from "../_api/client/create-task";
import { editTask } from "../_api/client/edit-task";

const createTaskSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  assigneeId: z.string().min(1, "Assignee is required"),
  dueDate: z.date({
    required_error: "A due date is required.",
  }),
  status: z.string({ required_error: "Status is required" }),
});

type CreateTaskForm = z.infer<typeof createTaskSchema>;

interface TaskDialogProps {
  project: Project;
  task?: Task;
}

const statusOptions = [
  {
    value: "0",
    label: "To do",
  },
  {
    value: "1",
    label: "In progress",
  },
  {
    value: "2",
    label: "Done",
  },
] as const;

export const TaskDialog = ({ project, task }: TaskDialogProps) => {
  console.log(task);

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const { mutate, isLoading } = useMutation<void, Error, CreateProjectTaskDto>({
    mutationFn: (body: CreateProjectTaskDto) => {
      if (!task) {
        return createTask(body);
      }

      return editTask(body, task.id);
    },
    onSuccess: () => {
      toast.success(
        !task ? "Task added successfully" : "Task edited successfully",
      );
      setOpen(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<CreateTaskForm>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      assigneeId:
        project.developers.find((dev) => dev.name === task?.assignee)?.id ||
        undefined,
      dueDate: task?.dueDate ? new Date(task.dueDate) : new Date(),
      name: task?.name || undefined,
      status:
        statusOptions.find((option) => parseInt(option.value) === task?.status)
          ?.value || undefined,
    },
  });

  const onSubmit = (data: CreateTaskForm) => {
    mutate({
      ...data,
      dueDate: data.dueDate.toISOString(),
      assigneeId: parseInt(data.assigneeId),
      projectId: parseInt(project.id),
      status: parseInt(data.status) as 0 | 1 | 2,
    });
  };

  const buttonText = useMemo(() => {
    if (task && isLoading) return "Editing task...";
    if (task && !isLoading) return "Edit task";
    if (!task && isLoading) return "Adding task...";
    if (!task && !isLoading) return "Add task";
  }, [isLoading, task]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {task ? (
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <FilePenIcon className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="secondary">Add Task</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task ? "Edit task" : "Create a new task"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Task Name</Label>
                <Input
                  id="name"
                  placeholder="Enter task name"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <Popover
                      open={isCalendarOpen}
                      onOpenChange={setIsCalendarOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(e) => {
                            field.onChange(e);
                            setIsCalendarOpen(false);
                          }}
                          disabled={(date) => date < subDays(new Date(), 1)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <Label htmlFor="assigneeId">Assignee</Label>
                <Controller
                  control={form.control}
                  name="assigneeId"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select assignee " />
                      </SelectTrigger>
                      <SelectContent>
                        {project.developers.map((developer) => (
                          <SelectItem key={developer.id} value={developer.id}>
                            {developer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {form.formState.errors.assigneeId && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.assigneeId.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Controller
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status " />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {form.formState.errors.assigneeId && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.assigneeId.message}
                  </p>
                )}
              </div>
              {/* <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select id="status" {...register("status")}>
                <SelectOption value="">Select status</SelectOption>
                {Object.values(TaskStatus).map((status) => (
                  <SelectOption key={status} value={status}>
                    {status}
                  </SelectOption>
                ))}
              </Select>
              {errors.status && (
                <p className="text-sm text-red-500">{errors.status.message}</p>
              )}
            </div> */}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {buttonText}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
