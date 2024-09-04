"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { AuthContext } from "@/app/context/auth-context";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import  AuthLayout  from "@/app/context/AuthLayout";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "group name must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
});

export default function Home() {
  const { signin } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    const signinResponse = await signin(values);
    // console.log(signinResponse, "signinResponse")
    if (!signinResponse.success) {
      form.setError("email", {
        type: "manual",
        message: signinResponse.message,
      });
      form.setError("password", {
        type: "manual",
        message: signinResponse.message,
      });
      setLoading(false);
    } else {
      // console.log(signinResponse, "signinResponse")
      setLoading(false);
      router.replace("/");
    }
  }

  // const {signin} = useContext(AuthContext)
  // const form = useForm({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // });

  // function onSubmit(values) {
  //   alert("")
  //   // console.log(values);

  //   signin(values)
  // }
  return (
    <AuthLayout>
      <main className="bg-gray-900 flex min-h-screen flex-col items-center justify-between py-36  md:p-36">
        {/* <Card className="t w-[600px]"> */}
        <Card className="container  max-w-[90%] md:max-w-[30rem] px-0 md:px-0">
          <CardHeader>
            <CardTitle>Sigin</CardTitle>
            <CardDescription>
              Lorem, ipsum dolor sit amet consectetur elit....
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? "Please Wait..." : "Signin"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </AuthLayout>
  );
}
