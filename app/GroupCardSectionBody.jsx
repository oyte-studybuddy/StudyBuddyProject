"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthLayout from "@/app/context/AuthLayout";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { handleGetCookie } from "./context/auth-handler";
import { useEffect, useState } from "react";
const SectionHeader = ({
  sectionTitle,
  sectionButtonTitle,
  sectionButtonRoute,
}) => {
  return (
    <div className=" w-full items-center justify-between text-sm flex">
      <h2 className="mt-10 scroll-m-20 text-2xl md:text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {sectionTitle}
      </h2>
      {/* <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"> */}
      <div className="">
        {sectionButtonTitle ? (
          <Button asChild>
            <Link href={sectionButtonRoute}>CREATE GROUP</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
};

const GroupCardSectionBody = ({
  sectionTitle,
  sectionButtonRoute,
  sectionButtonTitle,
  cardButtonTitle,
  cardButtonRoute,
  groups,
  userID
}) => {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    getId();
  }, []);

  const getId = async () => {
    const id = await localStorage.getItem("id");
    setUserId(id);
  };

  return (
    // <section className="container z-10 max-w-7xl px-0 md:px-0">
    <section>
      <SectionHeader
        sectionButtonRoute={sectionButtonRoute}
        sectionButtonTitle={sectionButtonTitle}
        sectionTitle={sectionTitle}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6   ">
        {groups?.map(({ _id, groupName, members, description }, key) => (
          <Card key={_id + key} className="text-csenter w-full">
            {/* {
  console.log(members.find(x=>x==userId),userId, "----")


            } */}
            <CardHeader>
              <div className="flex justify-between items-center mb-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.ng" />
                  <AvatarFallback className="">CN</AvatarFallback>
                </Avatar>
                <CardDescription>{members?.length} Members</CardDescription>
              </div>
              <CardTitle className="text-xl">{groupName}</CardTitle>
              <CardDescription className="text-ellipsis">
                {description.length > 50
                  ? description.slice(0, 50)
                  : description}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              {members.find((x) => x == userID) ? (
                <Button className="bg-gray-900" size="sm" asChild>
                  {/* <Link
                    href={
                      cardButtonTitle == "Join Group"
                        ? `/join-study-group?grp=${_id}`
                        : `/${_id}`
                    }
                  >
                    {cardButtonTitle}
                  </Link> */}
                  <Link href={`/${_id}`}>{"Vist Group"}</Link>
                </Button>
              ) : (
                <Button className="bg-[#2ab56f]" size="sm" asChild>
                  <Link
                    href={
                      cardButtonTitle == "Join Group"
                        ? `/join-study-group?grp=${_id}`
                        : `/${_id}`
                    }
                  >
                    {cardButtonTitle}
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default GroupCardSectionBody;
