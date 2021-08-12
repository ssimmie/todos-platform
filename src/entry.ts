import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucket = new aws.s3.Bucket("my-bucket", {
    website: {
        indexDocument: "index.html",
    }
});

const bucketObject = new aws.s3.BucketObject("index.html", {
    acl: "public-read",
    contentType: "text/html",
    bucket: bucket,
    source: new pulumi.asset.FileAsset("index.html")
});

export const bucketName = bucket.id;
export const bucketObjectName = bucketObject.id;
export const bucketEndpoint = pulumi.interpolate`http://${bucket.websiteEndpoint}`;
