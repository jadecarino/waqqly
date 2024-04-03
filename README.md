# Waqq.ly prototype 

## About

This repository contains the source code for Waqq.ly prototype.


Waqq.ly is a web application that helps dog owners identify dog walkers in their area. It is a cloud-based web application that has been deployed in the cloud using various services from Amazon Web Services.


This repository contains the source code for the web application including the HTML using the Bulma CSS framework and the JavaScript files that make the RESTful API calls. Additionally, copies of the Lambda functions that are deployed in AWS can be found in the folder ['./aws/lambdas'](./aws/lambdas/). This README also contains instructions for how to deploy the prototype to the cloud.

## Waqq.ly prototype

The Waqq.ly prototype can be found [here](https://main.d3j3pqb0yuhvvz.amplifyapp.com/index.html).

## How to deploy this prototype to the cloud

### Pre-requisites 

1. You will need an AWS account
2. You will need access to a text editor
3. You will need access to a web browser

### 1. Host the static website with AWS Amplify

1. Log into your AWS Management Console.

2. Select an AWS Region to use for all subsequent steps in the upper right corner. The web application can be deployed in any AWS Region that supports all the services used to deploy the web application to the cloud. These include AWS Amplify, AWS Lambda, Amazon API Gateway, and Amazon DynamoDB. The supported regions you can select for this are:
- US East (N. Virginia)
- US East (Ohio)
- US West (Oregon)
- EU (Frankfurt)
- EU (Ireland)
- EU (London)
- Asia Pacific (Tokyo)
- Asia Pacific (Seoul)
- Asia Pacific (Sydney)
- Asia Pacific (Mumbai)

3. Take a fork of this GitHub repository to your own account and then clone your fork to a directory of your choice.
```
git clone git@github.com:<youruserid>/waqqly.git
```

4. Use the AWS Amplify Console to deploy this web application. 

    1. Launch the AWS Amplify console.
    2. Choose **Get Started**.
    3. Under the **Amplify Hosting your web app** header, choose **Get Started**.
    4. On the **Get started with Amplify Hosting** page, select **GitHub** and choose **Continue**. You may need to authorise AWS Amplify to your GitHub account.
    5. On the **Add repository branch** step, select **<youruserid>/waqqly** from the **Select a repository** dropdown.
    6. In the **Branch** dropdown, select **main** and choose **Next**.
    7. On the **Build settings** page, leave all the defaults, select **Allow AWS Amplify to automatically deploy all files hosted in your project root directory** and choose **Next**.
    8. On the **Review** page select **Save and deploy**.
    9. The process may take a couple of minutes for the Amplify Console to deploy the code.

    Once completed, select the link underneath the thumbnail to launch the site in your web browser.


### 2. Create a serverless backend with Amazon DynamoDB, AWS Lambda

1. Create two Amazon DynamoDB tables for walkers and dogs.
    1. In the Amazon DynamoDB console, choose **Create table**.
    2. For the **Table name**, enter **Walkers**.
    3. For the **Partition key**, enter **WalkerId** and select **String** for the key type. 
    4. In the **Table settings** section, ensure **Default settings** is selected, and choose **Create table**.
    5. On the **Tables** page, wait for the table creation to complete. Once it is completed, the status will say **Active**. Select the **table name**.
    6. In the **Overview** tab > **General Information** section of the new table and choose **Additional info**. This is where the Amazon Resource Name (ARN) is. You will need to use this in the next section.
    7. Complete these steps again but for the **Dogs** table.

2. Create an IAM role for the Lambda functions.

Each Lambda function has an IAM role associated with it which defines what other AWS services the function can interact with. You will need an IAM role that grants the Lambda functions permission to read and write items to and from the DynamoDB tables.

    1. ...

### 3. Connect the RESTful API in the application with Amazon API Gateway


