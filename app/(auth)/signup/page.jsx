"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
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
import AuthLayout from "@/app/context/AuthLayout";
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "group name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "group name must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
});

export default function Home() {
  const { signup } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    const signupResponse = await signup(values);
    if (!signupResponse.success) {
      form.setError("email", {
        type: "manual",
        message: signupResponse.message,
      });
      setLoading(false);
    } else {
      router.replace("/signin");
      setLoading(false);
    }
  }
  return (
    <AuthLayout>
      <main className="bg-gray-900 flex min-h-screen flex-col items-center justify-between py-36  md:p-36">
        <Card className="container  max-w-[90%] md:max-w-[30rem] px-0 md:px-0">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
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
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>FirstName</FormLabel>
                      <FormControl>
                        <Input placeholder="FirstName" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LastName</FormLabel>
                      <FormControl>
                        <Input placeholder="LastName" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                {/* <Button  type="submit">Submit</Button> */}
                <Button type="submit" disabled={loading}>
                  {loading ? "Please Wait..." : "Signup"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </AuthLayout>
  );
}

// "use client";

// import { Button } from "@/components/ui/button";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardDescription,
//   CardTitle,
//   CardFooter,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import { Textarea } from "@/components/ui/textarea"

// const formSchema = z.object({
//   groupName: z.string().min(2, {
//     message: "group name must be at least 2 characters.",
//   }),
//   description: z.string().min(2, {
//     message: "description must be at least 2 characters.",
//   }),
// });

// export default function Home() {
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       groupName: "",
//       description: "",
//     },
//   });

//   function onSubmit(values) {
//     // console.log(values);
//   }
//   return (
//     <main className="bg-gray-900 flex min-h-screen flex-col items-center justify-between py-36  md:p-36">
//       {/* <Card className="t w-[600px]"> */}
//       <Card className="container  max-w-[90%] md:max-w-[30rem] px-0 md:px-0">

//         <CardHeader>
//           <CardTitle>Create Group</CardTitle>
//           <CardDescription>
//             Lorem, ipsum dolor sit amet consectetur elit....
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="groupName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>First Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="First Name" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Last Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Last Name" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//                 <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Email" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//                 <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input type="password" placeholder="Password" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit">Submit</Button>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </main>
//   );
// }
