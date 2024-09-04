"use client";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { handleGetCookie } from "@/app/context/auth-handler";
import { POST } from "@/app/request";
import { AuthContext } from "@/app/context/auth-context";
import { useContext } from "react";
import AuthLayout from "@/app/context/AuthLayout";


const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

export default function Home() {
  const [title, setTitle] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { state } = useContext(AuthContext);

  const params = useParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: "",
    },
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (values) => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    // // console.log("file", file.type)
    // setUploading(false);

    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
        headers: {},
      });

      const data = await response.json();

      const postObj = {
        file: data.url,
        groupId: params.id,
        title: values.title,
      };
      const token = await handleGetCookie();

      const postResponse = await POST({
        body: postObj,
        path: "/post-file",
        headers: {
          Authorization: token,
        },
      });




      // console.log(postResponse, "postResponse");
      if (!postResponse.success) {
        // form.setError("groupName", {
        //   type: "manual",
        //   message: postResponse.message,
        // });
        setLoading(false);
      } else {
        setLoading(false);
        router.replace(`/${params.id}`);
      }

      // // console.log(obj);
      setUploading(false);
    } catch (error) {
      // // console.log(error, "----");
      setUploading(false);
    }
  };

  return (
    // 66c4aea3f953c3c6dfbab00a/create-resource
    <AuthLayout route={`/${params.id}/create-resource`} >
    <main className="flex min-h-screen flex-col items-center justify-between py-36  md:p-36">
      {/* <Card className="t w-[600px]"> */}
      <Card className="container  max-w-[90%] md:max-w-[30rem] px-0 md:px-0">
        <CardHeader>
          <CardTitle>Upload File</CardTitle>
          <CardDescription>
            {/* Lorem, ipsum dolor sit amet consectetur elit.... */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            {/* <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="uploadFile"
                render={({ field}) => (
                  <FormItem>
                    <FormLabel>Upload File</FormLabel>
                    <FormControl>
                      <Input type="file" placeholder="Upload File" {...field} />
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

              <Button type="submit">Submit</Button>
            </form> */}
            {/* {// console.log(form.watch())} */}
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Title"
                        // value={title}
                        {...field}
                        // onChange={(e) => form.setValue(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <br />
              {/* <Input type="file" accept="image/*" onChange={handleFileChange} /> */}
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="Upload File"
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <br />
              {/* loading */}
              <Button type="submit" disabled={!file || uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
    </AuthLayout>
  );
}
