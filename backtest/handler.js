'use strict';
const query = require('./bd');
const AWS = require('aws-sdk');
const parseMultipart = require('parse-multipart');
const BUCKET = process.env.imageUploadBucket;

const s3 = new AWS.S3();


module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.login = async (event,_, callback) => {
  let body =  JSON.parse(event.body)
  let dataLogin = {
    body: {
      clave: body.clave,
      usuario: body.usuario
    }
  } 
  let data = await query.singIn(dataLogin);
  return {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify(
      {
        message: 'login!',
        ...data,
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.procedure = async (event,_, callback) => {

  let body,name,parameters
  let data = {}
  if(event.body !== null) {
    body =  JSON.parse(event.body)
    name = body.name
    parameters = body.parameters
    data = await query.Procedure(name, parameters);
  } else {
    let name = event.queryStringParameters.name
    data = await query.Query(name)
  }
  
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*", 
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify(
      {
        message: name,
        data,
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.imageupload  = async (event) => {
  try {
    const { filename, data } = extractFile(event)
    
    const nameImage = `${new Date().toISOString()}` + filename;
    await s3.putObject({ Bucket: BUCKET, Key: nameImage, ACL: 'public-read', Body: data }).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true
      },
      body: JSON.stringify(
        {
          message: nameImage,
          link: `https://${BUCKET}.s3.amazonaws.com/${nameImage}`
        })
    };  
  } catch (err) {
    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true
      },
      body: JSON.stringify(
        {
          message: nameImage,
          link: `https://${BUCKET}.s3.amazonaws.com/${nameImage}`
        })
    };     
  }
}

function extractFile(event) {
  const boundary = parseMultipart.getBoundary(event.headers['content-type'])
  const parts = parseMultipart.Parse(Buffer.from(event.body, 'base64'), boundary);
  const [{ filename, data }] = parts

  return {
    filename,
    data
  }
}

