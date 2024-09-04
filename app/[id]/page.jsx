import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DownloadIcon, EyeOpenIcon, GroupIcon } from "@radix-ui/react-icons";
import AuthLayout from "../context/AuthLayout";

const url = require("url");

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import ButtonUploadHandler from "./UploadFileHandler";
import { handleGetCookie } from "../context/auth-handler";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MemberSection = ({ members = [] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-none p-0  [&>li]:mt-2">
          {members.map((mmbr, i) => (
            <li key={i} className="flex items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardDescription className="ml-2">
                {mmbr.firstName} {mmbr.lastName}
              </CardDescription>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const basrUrl = "https://2no444qa0h.execute-api.us-east-1.amazonaws.com";

const getGroupData = async (params) => {
  try {
    const groupData = await fetch(`${basrUrl}/group/${params.id}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: await handleGetCookie(),
      },
    }).then((res) => res.json());
    // console.log(groupData)
    return groupData;
  } catch (err) {
    console.log(err);
  }
};

const getMembersData = async (members) => {
  try {
    const membersData = await fetch(`${basrUrl}/get-members`, {
      method: "post",
      body: JSON.stringify({
        userIds: members,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: await handleGetCookie(),
      },
    }).then((res) => res.json());
    return membersData;
  } catch (err) {
    console.log(err);
  }
};

const getFileResourseData = async (params) => {
  try {
    const fileResourseData = await fetch(`${basrUrl}/get-file/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: await handleGetCookie(),
      },
    }).then((res) => res.json());

    return fileResourseData
  } catch (err) {
    console.log(err);
  }
};

export default async function Home({ params }) {
  const { group } = await getGroupData(params);


  // const membersData = await fetch(`${basrUrl}/get-members`, {
  //   method: "post",
  //   body: JSON.stringify({
  //     userIds: group?.members,
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: await handleGetCookie(),
  //   },
  // }).then((res) => res.json());
  const membersData = await getMembersData(group?.members);

  const fileResourseData = await getFileResourseData(params);
  console.log(fileResourseData, group, membersData, "-----");
  // const fileResourseData = await fetch(`${basrUrl}/get-file/${params.id}`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: await handleGetCookie(),
  //   },
  // }).then((res) => res.json());

  function getOriginalUrl(fullUrl) {
    const parsedUrl = url.parse(fullUrl);
    return `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname}`;
  }

  return (
    <AuthLayout route={`/${params.id}`}>
      <main className="flex  bg-gray-900 min-h-screen flex-col items-center justify-between p-5 md:p-10 lg:p-24 ">
        <div className="container z-10 max-w-7xl px-0 md:px-0">
          <div className="grid grid-rosws-3 s-red-700  grid-flow-col gap-4 ">
            <div className="  hidden lg:block w-[300px]">
              <MemberSection members={membersData?.users || []} />
            </div>
            <div className="row-span-3 col-span-5 ...">
              <Card className="py-2">
                <CardHeader className=" sbg-red-500">
                  <CardTitle className="tsext-center">
                    {group?.groupName}
                  </CardTitle>
                  <CardDescription className="">
                    {group?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Sheet>
                    <ButtonUploadHandler />
                    <SheetTrigger className="block lg:hidden" asChild>
                      <Button variant="outline" className="ml-3">
                        Group Member
                        <GroupIcon className="ml-3 h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <ScrollArea className="h-full">
                        <br />
                        <MemberSection members={membersData?.users || []}  />
                      </ScrollArea>
                    </SheetContent>
                  </Sheet>
                </CardContent>
              </Card>
              <div className={"mt-4 bg-transparent"}>
                <Card>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="">Invoice</TableHead>
                          <TableHead>Get</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {fileResourseData &&
                          fileResourseData?.files &&
                          fileResourseData?.files.map((file, i) => (
                            <TableRow key={i}>
                              {/* const parsedUrl = url.parse(fullUrl); */}
                              {/* {// console.log(getOriginalUrl(file.file), "====")} */}

                              <TableCell className="w-full ">
                                <div className="flex bg-sred-600 px-0 flex-row items-center">
                                  <Avatar>
                                    <AvatarImage src="https://cdn-icons-png.flaticon.com/512/4447/4447248.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>
                                  <div className="ml-2">
                                    <CardTitle className="text-md">
                                      {file.title}
                                    </CardTitle>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Link
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  download
                                  href={getOriginalUrl(file.file)}
                                >
                                  <DownloadIcon
                                    width="20"
                                    height="20"
                                    className=" font-bold "
                                  />
                                </Link>
                              </TableCell>
                              {/* <TableCell>
                            <Link
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                              href={file.file}
                              className=" block md:hidden"
                            >
                              <EyeOpenIcon className="mr-2 h-4 w-4" />
                              View
                              <EyeOpenIcon />
                            </Link>
                          </TableCell> */}
                              <TableCell>
                                <Link
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  download
                                  href={getOriginalUrl(file.file)}
                                  locale={false}
                                >
                                  <EyeOpenIcon
                                    width="20"
                                    height="20"
                                    className=" font-bold "
                                  />
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AuthLayout>
  );
}
