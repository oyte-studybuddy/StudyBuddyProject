"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { handleGetCookie } from "../context/auth-handler";
import { POST } from "../request";
import AuthLayout from "../context/AuthLayout";

// https://2no444qa0h.execute-api.us-east-1.amazonaws.com/join-group
const formSchema = z.object({
  groupId: z.string().min(2, {
    message: "group name must be at least 2 characters.",
  }),
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupId: "",
    },
  });
  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const grp = params.get("grp");
    console.log(grp, "--");
    if (!grp) {
      router.back();
    }
    form.setValue("groupId", grp);
  }, []);

  async function onSubmit(values) {
    const token = await handleGetCookie();
    setLoading(true);
    const response = await POST({
      body: values,
      path: "/join-group",
      headers: {
        Authorization: token,
      },
    });
    // console.log(response.success)
    if (!response.success) {
      form.setError("groupId", {
        type: "manual",
        message: response.message,
      });
      setLoading(false);
    } else {
      // console.log(response, "response")
      router.push(`/${values.groupId}`);
    }
    // console.log(response);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-36  md:p-36">
      {/* <Card className="t w-[600px]"> */}
      <Card className="container  max-w-[90%] md:max-w-[30rem] px-0 md:px-0">
        <CardHeader>
          <CardTitle>Join Study Group</CardTitle>
          <CardDescription>
            Lorem, ipsum dolor sit amet consectetur elit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="groupId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group ID</FormLabel>
                    <FormControl>
                      <Input disabled placeholder="Group Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <Button type="submit">Join</Button> */}

              <Button type="submit" disabled={loading}>
                {loading ? "Please Wait..." : "Join"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
