<h1>IBM Client Engineering - Solution Document</h1>

<h2>Solution Name</h2>
<img align="right" src="https://user-images.githubusercontent.com/95059/166857681-99c92cdc-fa62-4141-b903-969bd6ec1a41.png" width="491" >


# Introduction and Goals
In today's fast-paced world, automation has become the key to efficiency and agility. IBM MQ is a powerful messaging middleware that enables reliable communication between applications, and GitOps is a methodology that provides a streamlined approach to software delivery. Together, they offer an automated solution that can help you achieve faster and more efficient deployment of IBM MQ environments.

With GitOps, you can automate the deployment and management of IBM MQ, including rolling upgrades, queue creation, and test data setup. By using version control to manage configuration changes, you can ensure that your IBM MQ environment is always in sync with your code changes.

Rolling upgrades are a breeze with GitOps, as you can easily roll out new versions of IBM MQ across your entire infrastructure without disrupting existing connections. You can also automate the creation and configuration of queues, reducing the likelihood of human error and ensuring consistent performance.

Test data is an essential part of any software development cycle, and with GitOps, you can automate the setup and deployment of test data for your IBM MQ environment. This ensures that your testing is always consistent and that you can easily revert to previous versions if necessary.

## Background and Business Problem
Automating IBM MQ through GitOps offers a powerful solution for managing your messaging middleware. It enables faster and more efficient deployment, reduces the risk of human error, and provides a streamlined approach to software delivery that can help you stay ahead of the competition.

# Solution Strategy
    - Spin up a test MQ Cluster (on aws EKS) and deploy the MQ Container using an older image
    - Build an ArgoCD Pipeline for this repo to that cluster
    - Automate rollng upgrades of MQ to a newer image
    - Automate the creation of queues
    - Automate the creation of test data


## PRE-REQUISITES
- An AWS account
- A AWS EKS environment
- kubectl installed
- helm (Version 3) installed
- aws cli installed

## Login into your AWS EKS Cluster
 [Log into AWS EKS](https://aws.amazon.com/premiumsupport/knowledge-center/eks-cluster-connection/)

## Creating a test EKS CLUSTER
First, make sure you have the IBM MQ Helm chart installed on your system. You can install it using the following command:

```bash
helm repo add mq-helm-eks https://ibm-client-engineering.github.io/mq-helm-eks/
```

Then create the desired namespace, we will be using mq-gitops.
```bash
kubectl create namespace mq-gitops
```

Set the namespace to mq-gitops

```bash
kubectl config set-context --current --namespace=mq-gitops
```

Apply the configmap for ouw mq container. This contains the TLS certificates and other configuration for our MQ container.

```bash
kubectl apply -f mq/config-map.yaml -n mq-gitops
```

Now we can install the IBM MQ Helm chart using the following command:

```bash
helm install mq-gitops-demo mq-helm-eks/ibm-mq \
-f mq/values.yaml \
--set "queueManager.envVariables[0].name=MQ_ADMIN_PASSWORD" \
--set "queueManager.envVariables[0].value=mqpasswd" \
--set "queueManager.envVariables[1].name=MQ_APP_PASSWORD" \
--set "queueManager.envVariables[1].value=mqpasswd" \
--set "LICENSE=accept" 
```

## this takes a few minutes to install, so have a break.

You can verify that the chart has been installed by running the following command:

```bash
helm list -n mq-gitops
```



```bash
 skopeo list-tags docker://icr.io/ibm-messaging/mq
        "9.1.5.0-r2",
        "9.2.0.0-r1",
        "9.2.0.0-r2",
        "9.2.0.0-r3",
        "9.2.1.0-r1",
        "9.2.1.0-r2",
        "9.2.2.0-r1",
        "9.2.3.0-r1",
        "9.2.4.0-r1",
        "9.2.5.0-r1",
        "9.2.5.0-r2",
        "9.2.5.0-r3",
        "9.3.0.0-r1",
        "9.3.0.0-r2",
        "9.3.0.0-r3",
        "9.3.0.1-r1",
        "9.3.0.1-r2",
        "9.3.0.1-r3",
        "9.3.0.1-r4",
        "9.3.0.3-r1",
        "9.3.0.4-r1",
        "9.3.1.0-r1",
        "9.3.1.0-r2",
        "9.3.1.0-r3",
        "9.3.1.1-r1",
        "9.3.2.0-r1"
```



## Overview

## Building Block View

## Deployment
## Security

## Cost

## Risks and Technical Debts

## Testing

# Architecture Decisions
