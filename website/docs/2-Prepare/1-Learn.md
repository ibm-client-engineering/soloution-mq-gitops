---
id: learn
sidebar_position: 1
title: Learn
---

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
  - [UPDATE STRATEGY](##-Update-Strategy)
    - [ROLLING UPDATE VIA SCRIPT](readme.md#rolling-update-via-script)

- [DEPLOYMENT](#deployment)
- [SECURITY](#security)
- [COST](#cost)
- [RISKS AND TECHNICAL DEBTS](#risks-and-technical-debts)
- [TESTING](#testing)
- [ARCHITECTURE DECISIONS](#architecture-decisions)

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
bash
aws route53 create-hosted-zone --name gitops-mq.demotime.cloud --caller-reference "Route 53 Addition"
```
<details>

```

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
</details>


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

## Install ArgoCD into your cluster
```
kubectl create namespace argocd
kubectl config set-context --current --namespace=argocd 
kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

## Create the ArgoCD service patch template
- Create this file `argocd/argocd-server-patch.yaml`, there is a template in the argocd/templates directory
```
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-ssl-cert: "<ACM_ARGOCD_ARN>"
spec:
  type: LoadBalancer
  loadBalancerSourceRanges:
  - "<LOCAL_IP_RANGES>"

```

## Update the template with the correct arn and IP
```
# NOTE THE ARN IS COPIED FROM THE CREATE CERTIFICATE OUTPUT
ACM_ARGOCD_ARN=" arn:aws:acm:us-east-1:748107796891:certificate/ccc1b02c-8bad-4559-ac61-5efd4087432b"
sed -i "s,<ACM_ARGOCD_ARN>,${ACM_ARGOCD_ARN},g; s/<LOCAL_IP_RANGES>/$(curl -s http://checkip.amazonaws.com/)\/32/g; " argocd/argocd-server-patch.yaml
```

## Apply the patch to the argocd-server service
```
kubectl patch svc argocd-server -p "$(cat argocd/argocd-server-patch.yaml)"
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

## Update the ArgoCD Web UI Password
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

## Login to Argo CD from the Web UI
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


## Add your GIT access token to Argo CD
```
kubectl create secret generic git-demo \
--from-literal=username=<GIT_USERNAME> \
--from-literal=password=<GIT_TOKEN>
```



## This section will be for setting up the project pipeline for the CI/CD pipeline




## Update Strategy


## Rolling update via script
Because this is a HA deployment, we will need to update the statefulset, and then the pods one at a time

you can edit this directly, but I prefer to save it to a file and edit it
```bash
kubectl edit statefulset.apps/gitops-mq-demo-ibm-mq -n gitops-mq
```
- OR
- get the sateful set
```
kubectl get statefulset gitops-mq-demo-ibm-mq -n gitops-mq --output yaml >mq/statefulset.yaml
```
- edit the sateful set and apply
```
vi mq/statefulset.yaml
```

```bash
kubectl apply -f mq/statefulset.yaml

```
- because this statefulset is build around an ondelete update strategy, we will need to manually update the pods
- This script will delete and rebuild the non active instance 
- then it will switch active instances and revuild the other instance

```bash
./rolling-upgrade.sh  gitops-mq-demo-ibm-mq  gitops-mq
Found the following pods to recycle: gitops-mq-demo-ibm-mq-0,gitops-mq-demo-ibm-mq-1,
Determined gitops-mq-demo-ibm-mq-1 is the active instance and will leave until the end
To continue type 'accept' below:
accept
Recycling gitops-mq-demo-ibm-mq-0
pod "gitops-mq-demo-ibm-mq-0" deleted
gitops-mq-demo-ibm-mq-0 deleted, waiting for it to become ready...
Sleeping for 5 seconds to allow pod to resync with native ha pairs
gitops-mq-demo-ibm-mq-0 ready
Leaving gitops-mq-demo-ibm-mq-1 pod until the end
Now recycling gitops-mq-demo-ibm-mq-1
pod "gitops-mq-demo-ibm-mq-1" deleted
gitops-mq-demo-ibm-mq-1 deleted, waiting for it to become ready...
Error from server (NotFound): pods "gitops-mq-demo-ibm-mq-1" not found
Error from server (NotFound): pods "gitops-mq-demo-ibm-mq-1" not found
Error from server (NotFound): pods "gitops-mq-demo-ibm-mq-1" not found
Error from server (NotFound): pods "gitops-mq-demo-ibm-mq-1" not found
Sleeping for 5 seconds to allow pod to resync with native ha pairs
gitops-mq-demo-ibm-mq-1 ready
Recycle complete, the active in
```
- you can check the pods status by running
```bash
# POD 0
kubectl describe pod/gitops-mq-demo-ibm-mq-0 -n  gitops-mq 
# POD 1
kubectl describe pod/gitops-mq-demo-ibm-mq-1 -n  gitops-mq
```