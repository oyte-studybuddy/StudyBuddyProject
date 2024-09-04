"use client";
import Link from "next/link";
import { UploadIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const ButtonUploadHandler = ({}) => {
  const { id } = useParams();
  return (
    <Button>
      <Link className="flex items-center" href={`/${id}/create-resource`}>
        <UploadIcon className="mr-2 h-4 w-4" /> Upload File
      </Link>
    </Button>
  );
};

export default ButtonUploadHandler;
