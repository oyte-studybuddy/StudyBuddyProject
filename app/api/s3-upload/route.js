import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


const s3Client = new S3Client({
	region: process.env.AWS_S3_REGION,
	credentials: {
		accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
	}
});


async function uploadFileToS3(file, fileName, contentType) {

	const fileBuffer = file;
	// console.log(fileName);

	const params = {
		Bucket: process.env.AWS_S3_BUCKET_NAME,
		Key: `${fileName}`,
		Body: fileBuffer,
		ContentType: contentType
	}

	const command = new PutObjectCommand(params);
	await s3Client.send(command);



	return fileName;
}

export async function POST(request) {
	try {

		const formData = await request.formData();
		const file = formData.get("file");

		// // console.log("-------------------------")
		// // console.log(file.type)
		// // console.log("-------------------------")

		if (!file) {
			return NextResponse.json({ error: "File is required." }, { status: 400 });
		}

		const buffer = Buffer.from(await file.arrayBuffer());
		const contentType = file.type;
		const fileName = await uploadFileToS3(buffer, file.name, contentType);

		
		const command = await new GetObjectCommand({
			Bucket: process.env.AWS_S3_BUCKET_NAME,
			Key: fileName,
		})

		const url = await getSignedUrl(s3Client, command)
		// const fileData = await Body.transformToString()
		// // console.log("---------------------------", url, "------------------------")

		return NextResponse.json({ success: true, fileName,url });
	} catch (error) {
		return NextResponse.json({ error, ms: error.message });
	}
}



// import { NextResponse } from "next/server";

// export async function GET(request){
//    return NextResponse.json({"msg":"hello"})
// }
// // 