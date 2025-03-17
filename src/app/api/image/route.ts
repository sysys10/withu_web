import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

const Bucket = process.env.AMPLIFY_BUCKET
// S3 클라이언트 설정
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
  }
})

export async function POST(req: Request, res: Response) {
  try {
    // 폼 데이터 처리
    const formData = await req.formData()
    const files = formData.getAll('img') as File[]

    // 업로드할 이미지 파일 수 제한
    if (files.length > 3) {
      return new Response(
        JSON.stringify({
          message: '업로드할 수 있는 이미지 파일의 수는 최대 3장입니다.'
        }),
        { status: 400 }
      )
    }

    // 이미지 파일을 S3에 업로드
    const uploadPromises = files.map(async file => {
      const Body = Buffer.from(await file.arrayBuffer())
      const Key = file.name
      const ContentType = file.type || 'image/jpg'

      await s3.send(
        new PutObjectCommand({
          Bucket,
          Key,
          Body,
          ContentType
        })
      )

      return [`https://${Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${Key}`]
    })

    const imgUrls = await Promise.all(uploadPromises)

    if (imgUrls.length === 1) {
      return new Response(JSON.stringify({ data: imgUrls[0], message: 'OK' }), {
        status: 200
      })
    }

    // 파일 개수가 여러개면 URL 배열 반환
    return new Response(JSON.stringify({ data: [...imgUrls], message: 'OK' }), {
      status: 200
    })
  } catch (error) {
    console.error('Error uploading files:', error)
    return new Response(JSON.stringify({ message: '파일 업로드 중 오류가 발생했습니다.' }), { status: 500 })
  }
}
