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



- [ENVIRONMENT](#environment)
- [PRE-REQUISITES](#prerequisites)
  - [LOGIN INTO YOUR AWS EKS CLUSTER](#login-into-your-aws-eks-cluster)
- [OVERVIEW](#overview)
    - [TOOLS](#tools)
    - [GET THE AWS CLI](#get-the-aws-cli)
    - [GET KUBECTL](#get-kubectl)
    - [GET THE ARGOCD CLI](#get-the-argocd-cli)
  - [ARGOCD](#argocd)
    - [CREATE A HOSTED ZONE IN ROUTE 53](#create-a-hosted-zone-in-route-53)
    - [REQUEST A CERTIFICATE FOR THE HOSTED ZONE](#request-a-certificate-for-the-hosted-zone)
    - [INSTALL ARGOCD INTO YOUR CLUSTER](#install-argocd-into-your-cluster)
    - [CREATE THE ARGOCY SERVICE PATCH TEMPLATE](#create-the-argocy-service-patch-template)
    - [NOTE THE ARN IS COPIED FROM THE CREATE CERTIFICATE OUTPUT](#note-the-arn-is-copied-from-the-create-certificate-output)
    - [UPDATE THE TEMPLATE WITH THE CORRECT ARN AND IP](#update-the-template-with-the-correct-arn-and-ip)
    - [APPLY THE PATCH TO THE ARGOCD-SERVER SERVICE](#apply-the-patch-to-the-argocdserver-service)
    - [CREATE AN ARGOCD RECORDSET IN THE NEW ZONE](#create-an-argocd-recordset-in-the-new-zone)
    - [CREATE THE ARGOCD LOADBALNCER](#create-the-argocd-loadbalncer)
    - [UPDATE THE ARGOCD WEB UI PASSWORD](#update-the-argocd-web-ui-password)
    - [LOGIN TO ARGO CD FROM THE COMMAND LINE](#login-to-argo-cd-from-the-command-line)
    - [LOGIN TO ARGO CD FROM THE WEB UI](#login-to-argo-cd-from-the-web-ui)
    - [ADD USERS TO ARGOCD](#add-users-to-argocd)
    - [GENERATE A NEW PERSONAL ACCESS TOKEN FOR THE USER](#generate-a-new-personal-access-token-for-the-user)
    - [ADD YOUR GIT ACCESS TOKEN TO ARGO CD](#add-your-git-access-token-to-argo-cd)
    - [BUILDING BLOCK VIEW](#building-block-view)
- [DEPLOYMENT](#deployment)
- [SECURITY](#security)
- [COST](#cost)
- [RISKS AND TECHNICAL DEBTS](#risks-and-technical-debts)
- [TESTING](#testing)
- [ARCHITECTURE DECISIONS](#architecture-decisions)



# Environment
- An AWS account
- A AWS EKS environment
- An available eks cluster with ibm-mq 

## PRE-REQUISITES

## Login into your AWS EKS Cluster
 [Log into AWS EKS](https://aws.amazon.com/premiumsupport/knowledge-center/eks-cluster-connection/)


## Overview

# Tools


## get the AWS CLI
```
$ curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

## Get kubectl 
```
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

## Get the ArgoCD CLI

```
wget https://github.com/argoproj/argo-cd/releases/download/v2.6.2/argocd-linux-amd64
chmod +x  ./argocd-linux-amd64 
sudo mv argocd-linux-amd64  /usr/bin/argocd

```

# ArgoCD


## Create a hosted Zone in Route 53
We are using the domain gitops-mq.demotime.cloud for this demo. You can use any domain you like.
```
aws route53 create-hosted-zone --name gitops-mq.demotime.cloud --caller-reference "Route 53 Addition"
{
    "Location": "https://route53.amazonaws.com/2013-04-01/hostedzone/Z05962992YBU6O501Z5JI",
    "HostedZone": {
        "Id": "/hostedzone/Z05962992YBU6O501Z5JI",
        "Name": "gitops-mq.demotime.cloud.",
        "CallerReference": "Route 53 Addition",
        "Config": {
            "PrivateZone": false
        },
        "ResourceRecordSetCount": 2
    },
    "ChangeInfo": {
        "Id": "/change/C05639501P5X1SLWTV7IX",
        "Status": "PENDING",
        "SubmittedAt": "2023-02-21T18:52:35.108000+00:00"
    },
    "DelegationSet": {
        "NameServers": [
            "ns-141.awsdns-17.com",
            "ns-1128.awsdns-13.org",
            "ns-569.awsdns-07.net",
            "ns-1793.awsdns-32.co.uk"
        ]
    }
}

```

## Request a Certificate for the hosted zone
```
aws acm request-certificate \
--domain-name gitops-mq.demotime.cloud \
--key-algorithm RSA_2048 \
--validation-method DNS \
--idempotency-token 1234 \
--options CertificateTransparencyLoggingPreference=DISABLED
{
    "CertificateArn": "arn:aws:acm:us-east-1:748107796891:certificate/1812a0ef-fc55-45bb-944c-48218a263772"
}
```

## Install ArgoCd into your cluster
```
kubectl create namespace argocd
kubectl config set-context --current --namespace=argocd 
kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

## Create the argocy service patch template
```
cat > argocd-server.patch.yaml << EOF
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-ssl-cert: "<ACM_ARGOCD_ARN>"
spec:
  type: LoadBalancer
  loadBalancerSourceRanges:
  - "<LOCAL_IP_RANGES>"
EOF

# NOTE THE ARN IS COPIED FROM THE CREATE CERTIFICATE OUTPUT
```

## Update the template with the correct arn and IP
```
ACM_ARGOCD_ARN=" arn:aws:acm:us-east-1:748107796891:certificate/ccc1b02c-8bad-4559-ac61-5efd4087432b"
sed -i "s,<ACM_ARGOCD_ARN>,${ACM_ARGOCD_ARN},g; s/<LOCAL_IP_RANGES>/$(curl -s http://checkip.amazonaws.com/)\/32/g; " argocd-server.patch.yaml
```

## Apply the patch to the argocd-server service
```
kubectl patch svc argocd-server -p "$(cat argocd-server.patch.yaml)"
service/argocd-server patched
```

## Create an ArgoCD Recordset in the new Zone
- you only need the base subdomain name, it will be pre-appended with "argocd." 
```
PUBLIC_DNS_NAME="gitops-mq.demotime.cloud"
R53_HOSTED_ZONE_ID="/hostedzone/Z05962992YBU6O501Z5JI"
cat > argocd-recordset.json << EOF
{
            "Changes": [{
            "Action": "CREATE",
                        "ResourceRecordSet": {
                                    "Name": "argocd.${PUBLIC_DNS_NAME}.",
                                    "Type": "CNAME",
                                    "TTL": 300,
                                 "ResourceRecords": [{ "Value": "$(kubectl get services argocd-server --output jsonpath='{.status.loadBalancer.ingress[0].hostname}')"}]
}}]
}
EOF
aws route53 change-resource-record-sets --hosted-zone-id $R53_HOSTED_ZONE_ID --change-batch file://argocd-recordset.json
{
    "ChangeInfo": {
        "Id": "/change/C06486351JH0L1O3UOPJ8",
        "Status": "PENDING",
        "SubmittedAt": "2023-02-21T19:53:29.642000+00:00"
    }
}

```

## Create the ArgoCD Load Balncer

- Create this file argocd/argocd-deployment-server.patch.yaml

```
spec:
  template:
    spec:
      containers:
        - command:
          - argocd-server
          - --staticassets
          - /shared/app
          - --insecure
          name: argocd-server
```
- apply the deployment patch
```bash
kubectl patch deployment argocd-server -p "$(cat argocd-deployment-server.patch.yaml)" 
```

## Update the ArgoCD web UI Password
```
PUBLIC_DNS_NAME="gitops-mq.demotime.cloud"
ARGOCD_ADDR="argocd.${PUBLIC_DNS_NAME}"
BCRYPT_HASH=$(htpasswd -bnBC 10 "" <PASSWORD> | tr -d ':\n' | sed 's/$2y/$2a/')


$ kubectl patch secret argocd-initial-admin-secret \
  -p '{"stringData": {
    "admin.password": "'$BCRYPT_HASH'",
    "admin.passwordMtime": "'$(date +%FT%T%Z)'"
  }}'
```

## Login to Argo CD from the command line
```
argocd login argocd.gitops-mq.demotime.cloud 
Username: admin
Password: 
'admin:login' logged in successfully
```

## Login to Argo CD from the web UI
- https://argocd.gitops-mq.demotime.cloud   (use the password you set above)


## Add users to ArgoCD
We will add 2 users to the Argo CD Install
Create this file and save it as argocd/argocd-rbac-configmap.yaml
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-rbac-cm
  namespace: argocd
  labels:
    app.kubernetes.io/name: argocd-rbac-cm
    app.kubernetes.io/part-of: argocd
data:
  policy.default: role:readonly
  policy.csv: |
    p, role:ci, applications, sync, *, allow
    p, role:ci, applications, update, *, allow
    p, role:ci, applications, override, *, allow
    p, role:ci, applications, create, *, allow
    p, role:ci, applications, get, *, allow
    p, role:ci, applications, list, *, allow
    p, role:ci, clusters, create, *, allow
    p, role:ci, clusters, get, *, allow
    p, role:ci, clusters, list, *, allow
    p, role:ci, projects, create, *, allow
    p, role:ci, projects, get, *, allow
    p, role:ci, projects, list, *, allow
    p, role:ci, repositories, create, *, allow
    p, role:ci, repositories, get, *, allow
    p, role:ci, repositories, list, *, allow
    g, ci, role:ci

```

```
kubectl apply -f argocd/argocd-rbac-configmap.yaml
```


## Generate a new personal access token for the user
- https://github.com/settings/personal-access-tokens/new


## add your GIT access token to Argo CD
```
kubectl create secret generic git-demo \
--from-literal=username=<GIT_USERNAME> \
--from-literal=password=<GIT_TOKEN>
```



## Building Block View

## Deployment
## Security

## Cost

## Risks and Technical Debts

## Testing

# Architecture Decisions
