"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { getSectionAndGrade } from "@/db/read/getSection";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  pdf: z.any(),
});

const WorkSheetForm: FC<{
  sectionId: String;
  userId: string;
  chapterId: String;
  gradeId: String;
}> = ({ sectionId, chapterId, gradeId, userId }) => {
  const [file, setFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let data = new FormData();
      data.append("file", file || "");
      data.append("title", values.title);
      data.append("chapterId", chapterId.toString());
      data.append("sectionId", sectionId.toString());
      data.append("gradeId", gradeId.toString());
      data.append("userId", userId);

      const response = await fetch(
        "http://129.150.50.164:3000/api/worksheets",
        {
          method: "POST",

          body: data,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
      } else {
        console.error(
          "Failed to create worksheet:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-8 rounded-xl shadow-sm"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WorkSheet Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <Input
          type="file"
          placeholder="Choose Your File"
          onChange={(e) => setFile(e.target.files && e.target.files[0])}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default WorkSheetForm;
