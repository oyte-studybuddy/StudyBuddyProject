"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { union, z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { handleGetCookie } from "../context/auth-handler";
import { POST } from "../request";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import AuthLayout from "../context/AuthLayout";
const formSchema = z.object({
  groupName: z.string().min(2, {
    message: "group name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { state } = useContext(AuthContext);
  const [userId, setUserId] = useState("");

  
  useEffect(() => {
    getId();
  }, []);

  const getId = async () => {
    const id = await localStorage.getItem("id");
    setUserId(id);
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupName: "",
      description: "",
    },
  });

  async function onSubmit(values) {
    const token = await handleGetCookie();
    setLoading(true);
    // console.log(state?.user?._id, "state?.user?._id");
    values.members = [userId || state?.user?._id];
    const response = await POST({
      body: values,
      path: "/create-group",
      headers: {
        Authorization: token,
      },
    });

    if (!response.success) {
      form.setError("groupName", {
        type: "manual",
        message: response.message,
      });
      setLoading(false);
    } else {
      setLoading(false);
      router.push(`/${response.group._id}`);
    }
  }

  return (
    <AuthLayout route="/create-study-group">
      <main className="flex min-h-screen flex-col items-center justify-between py-36  md:p-36">
        <Card className="container  max-w-[90%] md:max-w-[30rem] px-0 md:px-0">
          <CardHeader>
            <CardTitle>Create Group</CardTitle>
            <CardDescription>
              Lorem, ipsum dolor sit amet consectetur elit....
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="groupName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Group Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? "Please Wait..." : "Create Group"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </AuthLayout>
  );
}
