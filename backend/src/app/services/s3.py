import boto3
from botocore.exceptions import NoCredentialsError
import uuid
import os
from dotenv import load_dotenv
from fastapi import UploadFile

load_dotenv()

DEFAULT_BUCKET_NAME = os.environ.get("S3_BUCKET_NAME")

def upload_image_to_s3(file: UploadFile, bucket_name=DEFAULT_BUCKET_NAME, object_name=None) -> str | None:
    print("Hello!")
    if object_name is None:
        object_name = str(uuid.uuid4())

    s3_client = boto3.client(
        "s3",
        aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
        region_name=os.environ.get("AWS_DEFAULT_REGION"),
    )

    try:
        print("Trying to upload file")
        s3_client.upload_fileobj(file, bucket_name, object_name)
        print(f"Uploaded file to {bucket_name}/{object_name}")
        url = f"https://{bucket_name}.s3.amazonaws.com/{object_name}"
        return url
    except FileNotFoundError:
        print("The file was not found")
        return None
    except NoCredentialsError:
        print("Credentials not available")
        return None
