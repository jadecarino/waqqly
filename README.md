# Waqq.ly prototype 

## About

This repository contains the source code for Waqq.ly prototype.


Waqq.ly is a web application that helps dog owners identify dog walkers in their area. It is a cloud-based web application that has been deployed in the cloud using various services from Amazon Web Services.


This repository contains the source code for the web application including the HTML using the Bulma CSS framework and the JavaScript files that make the RESTful API calls. Additionally, copies of the Lambda functions that are deployed in AWS can be found in the folder ['lambdas'](./aws/lambdas/). This README also contains instructions for how to deploy the prototype to the cloud.

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

AWS Amplify rebuilds and redeploys the web application when it detects changes to the GitHub repository. In a later step, you will push changes to your fork of this repository, and trigger a rebuild and redeploy of the web application you hosted in this stage.

### 2. Create a serverless backend with Amazon DynamoDB and AWS Lambda

1. Create two Amazon DynamoDB tables for walkers and dogs.
    1. In the Amazon DynamoDB console, choose **Create table**.
    2. For the **Table name**, enter **Walkers**.
    3. For the **Partition key**, enter **WalkerId** and select **String** for the key type. 
    4. In the **Table settings** section, ensure **Default settings** is selected, and choose **Create table**.
    5. On the **Tables** page, wait for the table creation to complete. Once it is completed, the status will say **Active**. Select the **table name**.
    6. In the **Overview** tab > **General Information** section of the new table and choose **Additional info**. This is where the Amazon Resource Name (ARN) is. You will need to use this in the next section.
    7. Complete these steps again but for the **Dogs** table.

2. Create an IAM role for the Lambda functions. Each Lambda function has an IAM role associated with it which defines what other AWS services the function can interact with. You will need an IAM role that grants the Lambda functions permission to read and write items to and from the DynamoDB tables.

    1. In the IAM console, select **Roles** in the navigation pane and select **Create Role**.
    2. In the **Trusted Entity Type** section, select **AWS service**. For **Use case**, select **Lambda**, then choose **Next**.
    3. Enter **AWSLambdaBasicExecutionRole** in the text box and select **Enter**.
    4. Select the checkbox next to the **AWSLambdaBasicExecutionRole** policy name and choose **Next**.
    5. Name the role **WaqqlyLambda**. Keep the other parameters at their default settings.
    6. Choose **Create role**.

3. Give the IAM role four sets of permissions: Read and Write to the **Dogs** table and Read and Write to the **Walkers** table.

    For example, to assign Write permissions for the **Dogs** table:
    1. Navigate to the **WaqqlyLambda** role just created. Go to the **Permissions** tab, and under **Add permissions**, choose **Create Inline Policy**.
    2. In **Select a service**, type **DynamoDB** and select it when it appears.
    3. Choose **Select actions** and in the **Actions allowed** section, type **PutItem**, and select it when it appears.
    4. In the **Resources** section, with the **Specific** option selected, choose the **Add ARN** link and add the ARN for the **Dogs** table. Choose **Next**.
    5. Enter **DogsWriteAccess** for the policy name and choose **Create policy**.
    6. Repeat these steps for assigning the other three permissions. To assign Read permissions, in Step 3, type **BatchGetItem**, **GetItem** and **Scan**, instead of **PutItem**. Ensure to use the ARN for the **Walkers** table when assigning those permissions.

4. Create four Lambda functions for handling requests: **GetDog**, **RegisterDog**, **GetWalker** and **RegisterWalker**.

    For example, to create the **GetWalker** Lambda function:
    1. From the AWS Lambda console, choose **Create a function**.
    2. Enter **GetWalker** in the function name field.
    3. Select **Node.js 16.x** for the **Runtime**.
    5. Select **Use an existing role** from the **Change default execution role** dropdown.
    6. Select the **WaqqlyLambda** role you just created from the **Existing Role** dropdown.
    7. Click on **Create function**.
    8. Copy and paste the code from the ['./aws/lambdas/GetWalker/index.js'](./aws/lambdas/GetWalker/index.js) file and replace the template code in the **Code source** section.
    9. Click **Deploy**.
    10. Repeat these steps for the remaining Lambda functions using the code from the ['./aws/lambdas'](./aws/lambdas) directory of this repository.

### 3. Connect the RESTful API in the application with Amazon API Gateway

1. Create a new REST API in Amazon API Gateway.

    1. In the Amazon API Gateway console, select **APIs**.
    2. Choose **Build** under the **REST API** section.
    3. Select **REST** in the **Choose the protocol** section.
    4. Select **New API** in the **Create new API** section.
    5. In the **Settings** section, enter **Waqqly** for the **API Name** and select **Edge optimised** for the **Endpoint Type**.
    6. Choose **Create API**.

2. Create resources and methods. Create a resource for **dog** with GET and POST methods and a resource for **walker** with GET and POST methods.

    For example, to create the **dog** resource with a POST method:
    1. In the Waqqly API, select **Resources**, then **Create Resource**.
    2. Enter **dog** as the **Resource Name** which creates the API path of **/dog**.
    3. Select the checkbox to **Enable API Gateway CORS**.
    4. Choose **Create Resource**.
    5. Select the newly created **dog** resource and from the **Actions** dropdown, select **Create Method**.
    6. Select **POST** as the method, select **Lambda Function** for **Integration type** and check **Use Lambda Proxy Integration**.
    7. Ensure the AWS Region is the same one as you have been using throughout these instructions.
    8. Enter **RegisterDog** as the **Lambda Function** name, then press **Save**.
    9. Repeat these steps for the remaining methods needed.

3. Deploy the API.

    1. From the Amazon API Gateway console, select the **Waqqly** API. In the **Actions** drop-down, select **Deploy API**.
    2. Select **[New Stage]** for the **Deployment stage**.
    3. Enter **prod** as the **Stage Name** and choose **Deploy**.
    4. Copy the **Invoke URL**. If you wish to use this new API for the Waqqly web application, update Line 1 in the JavaScript files in this repository, [register.js](./resources/js/register.js), [find-walkers.js](./resources/js/find-walkers.js) and [find-dogs.js](./resources/js/find-dogs.js). As AWS Amplify has CI/CD built in, simply push those files with the new API endpoint to your fork of this repository, and after a couple of minutes, the new deployment will use that API.

### 4. Validate your cloud deployment

1. Navigate to the Waqqly web application deployed by AWS Amplify. Find the link by going to the AWS Amplify console, selecting the **Waqqly** app, and clicking the link under the thumbnail.

2. Try out the Waqqly web application that you just deployed to the cloud using Amazon Web Services.

### 5. Resource clean-up

It is best practice to delete resources that are no longer in use to avoid unwanted charges.

1. In the AWS Amplify console, delete the **Waqqly** application.

2. In the AWS Lambda console, delete the Lambda functions, **GetDog**, **RegisterDog**, **RegisterWalker** and **GetWalker**.

3. In the IAM console, delete the **WaqqlyLambda** role.

4. In the Amazon DynamoDB console, delete the **Walkers** and **Dogs** table.

5. In the Amazon API Gateway console, delete the **Waqqly** API.
