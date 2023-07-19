"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[48],{4137:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>g});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var p=r.createContext({}),c=function(e){var t=r.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},s=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),d=c(a),u=n,g=d["".concat(p,".").concat(u)]||d[u]||m[u]||o;return a?r.createElement(g,l(l({ref:t},s),{},{components:a})):r.createElement(g,l({ref:t},s))}));function g(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,l=new Array(o);l[0]=u;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[d]="string"==typeof e?e:n,l[1]=i;for(var c=2;c<o;c++)l[c]=a[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,a)}u.displayName="MDXCreateElement"},551:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=a(7462),n=(a(7294),a(4137));const o={id:"learn",sidebar_position:1,title:"Learn"},l="Solution Strategy",i={unversionedId:"Prepare/learn",id:"Prepare/learn",title:"Learn",description:"- Spin up a test MQ Cluster (on aws EKS) and deploy the MQ Container using an older image",source:"@site/docs/2-Prepare/1-Learn.md",sourceDirName:"2-Prepare",slug:"/Prepare/learn",permalink:"/solution-mq-gitops/Prepare/learn",draft:!1,editUrl:"https://github.com/ibm-client-engineering/solution-mq-gitops.git/docs/2-Prepare/1-Learn.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{id:"learn",sidebar_position:1,title:"Learn"},sidebar:"tutorialSidebar",previous:{title:"Prepare",permalink:"/solution-mq-gitops/category/prepare"},next:{title:"Organize",permalink:"/solution-mq-gitops/Prepare/organize"}},p={},c=[{value:"Overview",id:"overview",level:2},{value:"get the AWS CLI",id:"get-the-aws-cli",level:2},{value:"Get kubectl",id:"get-kubectl",level:2},{value:"Get the ArgoCD CLI",id:"get-the-argocd-cli",level:2},{value:"Create a hosted Zone in Route 53",id:"create-a-hosted-zone-in-route-53",level:2},{value:"Request a Certificate for the hosted zone",id:"request-a-certificate-for-the-hosted-zone",level:2},{value:"Install ArgoCD into your cluster",id:"install-argocd-into-your-cluster",level:2},{value:"Create the ArgoCD service patch template",id:"create-the-argocd-service-patch-template",level:2},{value:"Update the template with the correct arn and IP",id:"update-the-template-with-the-correct-arn-and-ip",level:2},{value:"Apply the patch to the argocd-server service",id:"apply-the-patch-to-the-argocd-server-service",level:2},{value:"Create an ArgoCD Recordset in the new Zone",id:"create-an-argocd-recordset-in-the-new-zone",level:2},{value:"Create the ArgoCD Load Balncer",id:"create-the-argocd-load-balncer",level:2},{value:"Update the ArgoCD Web UI Password",id:"update-the-argocd-web-ui-password",level:2},{value:"Login to Argo CD from the command line",id:"login-to-argo-cd-from-the-command-line",level:2},{value:"Login to Argo CD from the Web UI",id:"login-to-argo-cd-from-the-web-ui",level:2},{value:"Add users to ArgoCD",id:"add-users-to-argocd",level:2},{value:"Generate a new personal access token for the user",id:"generate-a-new-personal-access-token-for-the-user",level:2},{value:"Add your GIT access token to Argo CD",id:"add-your-git-access-token-to-argo-cd",level:2},{value:"This section will be for setting up the project pipeline for the CI/CD pipeline",id:"this-section-will-be-for-setting-up-the-project-pipeline-for-the-cicd-pipeline",level:2},{value:"Update Strategy",id:"update-strategy",level:2},{value:"Rolling update via script",id:"rolling-update-via-script",level:2}],s={toc:c},d="wrapper";function m(e){let{components:t,...a}=e;return(0,n.kt)(d,(0,r.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"solution-strategy"},"Solution Strategy"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"- Spin up a test MQ Cluster (on aws EKS) and deploy the MQ Container using an older image\n- Build an ArgoCD Pipeline for this repo to that cluster\n- Automate rollng upgrades of MQ to a newer image\n- Automate the creation of queues\n- Automate the creation of test data\n")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"#environment"},"ENVIRONMENT"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"#prerequisites"},"PRE-REQUISITES")),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#login-into-your-aws-eks-cluster"},"LOGIN INTO YOUR AWS EKS CLUSTER")))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"#overview"},"OVERVIEW")),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#tools"},"TOOLS")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#get-the-aws-cli"},"GET THE AWS CLI")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#get-kubectl"},"GET KUBECTL")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#get-the-argocd-cli"},"GET THE ARGOCD CLI")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#argocd"},"ARGOCD"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#create-a-hosted-zone-in-route-53"},"CREATE A HOSTED ZONE IN ROUTE 53")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#request-a-certificate-for-the-hosted-zone"},"REQUEST A CERTIFICATE FOR THE HOSTED ZONE")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#install-argocd-into-your-cluster"},"INSTALL ARGOCD INTO YOUR CLUSTER")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#create-the-argocy-service-patch-template"},"CREATE THE ARGOCY SERVICE PATCH TEMPLATE")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#note-the-arn-is-copied-from-the-create-certificate-output"},"NOTE THE ARN IS COPIED FROM THE CREATE CERTIFICATE OUTPUT")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#update-the-template-with-the-correct-arn-and-ip"},"UPDATE THE TEMPLATE WITH THE CORRECT ARN AND IP")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#apply-the-patch-to-the-argocdserver-service"},"APPLY THE PATCH TO THE ARGOCD-SERVER SERVICE")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#create-an-argocd-recordset-in-the-new-zone"},"CREATE AN ARGOCD RECORDSET IN THE NEW ZONE")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#create-the-argocd-loadbalncer"},"CREATE THE ARGOCD LOADBALNCER")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#update-the-argocd-web-ui-password"},"UPDATE THE ARGOCD WEB UI PASSWORD")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#login-to-argo-cd-from-the-command-line"},"LOGIN TO ARGO CD FROM THE COMMAND LINE")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#login-to-argo-cd-from-the-web-ui"},"LOGIN TO ARGO CD FROM THE WEB UI")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#add-users-to-argocd"},"ADD USERS TO ARGOCD")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#generate-a-new-personal-access-token-for-the-user"},"GENERATE A NEW PERSONAL ACCESS TOKEN FOR THE USER")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#add-your-git-access-token-to-argo-cd"},"ADD YOUR GIT ACCESS TOKEN TO ARGO CD")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"#building-block-view"},"BUILDING BLOCK VIEW")))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"##-Update-Strategy"},"UPDATE STRATEGY"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"readme.md#rolling-update-via-script"},"ROLLING UPDATE VIA SCRIPT")))))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"#deployment"},"DEPLOYMENT"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"#security"},"SECURITY"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"#cost"},"COST"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"#risks-and-technical-debts"},"RISKS AND TECHNICAL DEBTS"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"#testing"},"TESTING"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"#architecture-decisions"},"ARCHITECTURE DECISIONS")))),(0,n.kt)("h2",{id:"overview"},"Overview"),(0,n.kt)("h1",{id:"tools"},"Tools"),(0,n.kt)("h2",{id:"get-the-aws-cli"},"get the AWS CLI"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},'$ curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"\nunzip awscliv2.zip\nsudo ./aws/install\n')),(0,n.kt)("h2",{id:"get-kubectl"},"Get kubectl"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},'curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"\nsudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl\n')),(0,n.kt)("h2",{id:"get-the-argocd-cli"},"Get the ArgoCD CLI"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"wget https://github.com/argoproj/argo-cd/releases/download/v2.6.2/argocd-linux-amd64\nchmod +x  ./argocd-linux-amd64 \nsudo mv argocd-linux-amd64  /usr/bin/argocd\n\n")),(0,n.kt)("h1",{id:"argocd"},"ArgoCD"),(0,n.kt)("h2",{id:"create-a-hosted-zone-in-route-53"},"Create a hosted Zone in Route 53"),(0,n.kt)("p",null,"We are using the domain gitops-mq.demotime.cloud for this demo. You can use any domain you like."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},'bash\naws route53 create-hosted-zone --name gitops-mq.demotime.cloud --caller-reference "Route 53 Addition"\n')),(0,n.kt)("details",null,(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},'\n{\n    "Location": "https://route53.amazonaws.com/2013-04-01/hostedzone/Z05962992YBU6O501Z5JI",\n    "HostedZone": {\n        "Id": "/hostedzone/Z05962992YBU6O501Z5JI",\n        "Name": "gitops-mq.demotime.cloud.",\n        "CallerReference": "Route 53 Addition",\n        "Config": {\n            "PrivateZone": false\n        },\n        "ResourceRecordSetCount": 2\n    },\n    "ChangeInfo": {\n        "Id": "/change/C05639501P5X1SLWTV7IX",\n        "Status": "PENDING",\n        "SubmittedAt": "2023-02-21T18:52:35.108000+00:00"\n    },\n    "DelegationSet": {\n        "NameServers": [\n            "ns-141.awsdns-17.com",\n            "ns-1128.awsdns-13.org",\n            "ns-569.awsdns-07.net",\n            "ns-1793.awsdns-32.co.uk"\n        ]\n    }\n}\n\n'))),(0,n.kt)("h2",{id:"request-a-certificate-for-the-hosted-zone"},"Request a Certificate for the hosted zone"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},'aws acm request-certificate \\\n--domain-name gitops-mq.demotime.cloud \\\n--key-algorithm RSA_2048 \\\n--validation-method DNS \\\n--idempotency-token 1234 \\\n--options CertificateTransparencyLoggingPreference=DISABLED\n{\n    "CertificateArn": "arn:aws:acm:us-east-1:748107796891:certificate/1812a0ef-fc55-45bb-944c-48218a263772"\n}\n')),(0,n.kt)("h2",{id:"install-argocd-into-your-cluster"},"Install ArgoCD into your cluster"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"kubectl create namespace argocd\nkubectl config set-context --current --namespace=argocd \nkubectl apply -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml\n")),(0,n.kt)("h2",{id:"create-the-argocd-service-patch-template"},"Create the ArgoCD service patch template"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Create this file ",(0,n.kt)("inlineCode",{parentName:"li"},"argocd/argocd-server-patch.yaml"),", there is a template in the argocd/templates directory")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},'apiVersion: v1\nkind: Service\nmetadata:\n  annotations:\n    service.beta.kubernetes.io/aws-load-balancer-ssl-cert: "<ACM_ARGOCD_ARN>"\nspec:\n  type: LoadBalancer\n  loadBalancerSourceRanges:\n  - "<LOCAL_IP_RANGES>"\n\n')),(0,n.kt)("h2",{id:"update-the-template-with-the-correct-arn-and-ip"},"Update the template with the correct arn and IP"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},'# NOTE THE ARN IS COPIED FROM THE CREATE CERTIFICATE OUTPUT\nACM_ARGOCD_ARN=" arn:aws:acm:us-east-1:748107796891:certificate/ccc1b02c-8bad-4559-ac61-5efd4087432b"\nsed -i "s,<ACM_ARGOCD_ARN>,${ACM_ARGOCD_ARN},g; s/<LOCAL_IP_RANGES>/$(curl -s http://checkip.amazonaws.com/)\\/32/g; " argocd/argocd-server-patch.yaml\n')),(0,n.kt)("h2",{id:"apply-the-patch-to-the-argocd-server-service"},"Apply the patch to the argocd-server service"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},'kubectl patch svc argocd-server -p "$(cat argocd/argocd-server-patch.yaml)"\nservice/argocd-server patched\n')),(0,n.kt)("h2",{id:"create-an-argocd-recordset-in-the-new-zone"},"Create an ArgoCD Recordset in the new Zone"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},'you only need the base subdomain name, it will be pre-appended with "argocd." ')),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},'PUBLIC_DNS_NAME="gitops-mq.demotime.cloud"\nR53_HOSTED_ZONE_ID="/hostedzone/Z05962992YBU6O501Z5JI"\ncat > argocd-recordset.json << EOF\n{\n            "Changes": [{\n            "Action": "CREATE",\n                        "ResourceRecordSet": {\n                                    "Name": "argocd.${PUBLIC_DNS_NAME}.",\n                                    "Type": "CNAME",\n                                    "TTL": 300,\n                                 "ResourceRecords": [{ "Value": "$(kubectl get services argocd-server --output jsonpath=\'{.status.loadBalancer.ingress[0].hostname}\')"}]\n}}]\n}\nEOF\naws route53 change-resource-record-sets --hosted-zone-id $R53_HOSTED_ZONE_ID --change-batch file://argocd-recordset.json\n{\n    "ChangeInfo": {\n        "Id": "/change/C06486351JH0L1O3UOPJ8",\n        "Status": "PENDING",\n        "SubmittedAt": "2023-02-21T19:53:29.642000+00:00"\n    }\n}\n\n')),(0,n.kt)("h2",{id:"create-the-argocd-load-balncer"},"Create the ArgoCD Load Balncer"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Create this file argocd/argocd-deployment-server.patch.yaml")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"spec:\n  template:\n    spec:\n      containers:\n        - command:\n          - argocd-server\n          - --staticassets\n          - /shared/app\n          - --insecure\n          name: argocd-server\n")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"apply the deployment patch")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},'kubectl patch deployment argocd-server -p "$(cat argocd-deployment-server.patch.yaml)" \n')),(0,n.kt)("h2",{id:"update-the-argocd-web-ui-password"},"Update the ArgoCD Web UI Password"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},'PUBLIC_DNS_NAME="gitops-mq.demotime.cloud"\nARGOCD_ADDR="argocd.${PUBLIC_DNS_NAME}"\nBCRYPT_HASH=$(htpasswd -bnBC 10 "" <PASSWORD> | tr -d \':\\n\' | sed \'s/$2y/$2a/\')\n\n\n$ kubectl patch secret argocd-initial-admin-secret \\\n  -p \'{"stringData": {\n    "admin.password": "\'$BCRYPT_HASH\'",\n    "admin.passwordMtime": "\'$(date +%FT%T%Z)\'"\n  }}\'\n')),(0,n.kt)("h2",{id:"login-to-argo-cd-from-the-command-line"},"Login to Argo CD from the command line"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"argocd login argocd.gitops-mq.demotime.cloud \nUsername: admin\nPassword: \n'admin:login' logged in successfully\n")),(0,n.kt)("h2",{id:"login-to-argo-cd-from-the-web-ui"},"Login to Argo CD from the Web UI"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://argocd.gitops-mq.demotime.cloud"},"https://argocd.gitops-mq.demotime.cloud"),"   (use the password you set above)")),(0,n.kt)("h2",{id:"add-users-to-argocd"},"Add users to ArgoCD"),(0,n.kt)("p",null,"We will add 2 users to the Argo CD Install\nCreate this file and save it as argocd/argocd-rbac-configmap.yaml"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: argocd-rbac-cm\n  namespace: argocd\n  labels:\n    app.kubernetes.io/name: argocd-rbac-cm\n    app.kubernetes.io/part-of: argocd\ndata:\n  policy.default: role:readonly\n  policy.csv: |\n    p, role:ci, applications, sync, *, allow\n    p, role:ci, applications, update, *, allow\n    p, role:ci, applications, override, *, allow\n    p, role:ci, applications, create, *, allow\n    p, role:ci, applications, get, *, allow\n    p, role:ci, applications, list, *, allow\n    p, role:ci, clusters, create, *, allow\n    p, role:ci, clusters, get, *, allow\n    p, role:ci, clusters, list, *, allow\n    p, role:ci, projects, create, *, allow\n    p, role:ci, projects, get, *, allow\n    p, role:ci, projects, list, *, allow\n    p, role:ci, repositories, create, *, allow\n    p, role:ci, repositories, get, *, allow\n    p, role:ci, repositories, list, *, allow\n    g, ci, role:ci\n\n")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"kubectl apply -f argocd/argocd-rbac-configmap.yaml\n")),(0,n.kt)("h2",{id:"generate-a-new-personal-access-token-for-the-user"},"Generate a new personal access token for the user"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/settings/personal-access-tokens/new"},"https://github.com/settings/personal-access-tokens/new"))),(0,n.kt)("h2",{id:"add-your-git-access-token-to-argo-cd"},"Add your GIT access token to Argo CD"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"kubectl create secret generic git-demo \\\n--from-literal=username=<GIT_USERNAME> \\\n--from-literal=password=<GIT_TOKEN>\n")),(0,n.kt)("h2",{id:"this-section-will-be-for-setting-up-the-project-pipeline-for-the-cicd-pipeline"},"This section will be for setting up the project pipeline for the CI/CD pipeline"),(0,n.kt)("h2",{id:"update-strategy"},"Update Strategy"),(0,n.kt)("h2",{id:"rolling-update-via-script"},"Rolling update via script"),(0,n.kt)("p",null,"Because this is a HA deployment, we will need to update the statefulset, and then the pods one at a time"),(0,n.kt)("p",null,"you can edit this directly, but I prefer to save it to a file and edit it"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"kubectl edit statefulset.apps/gitops-mq-demo-ibm-mq -n gitops-mq\n")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"OR"),(0,n.kt)("li",{parentName:"ul"},"get the sateful set")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"kubectl get statefulset gitops-mq-demo-ibm-mq -n gitops-mq --output yaml >mq/statefulset.yaml\n")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"edit the sateful set and apply")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"vi mq/statefulset.yaml\n")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"kubectl apply -f mq/statefulset.yaml\n\n")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"because this statefulset is build around an ondelete update strategy, we will need to manually update the pods"),(0,n.kt)("li",{parentName:"ul"},"This script will delete and rebuild the non active instance "),(0,n.kt)("li",{parentName:"ul"},"then it will switch active instances and revuild the other instance")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},'./rolling-upgrade.sh  gitops-mq-demo-ibm-mq  gitops-mq\nFound the following pods to recycle: gitops-mq-demo-ibm-mq-0,gitops-mq-demo-ibm-mq-1,\nDetermined gitops-mq-demo-ibm-mq-1 is the active instance and will leave until the end\nTo continue type \'accept\' below:\naccept\nRecycling gitops-mq-demo-ibm-mq-0\npod "gitops-mq-demo-ibm-mq-0" deleted\ngitops-mq-demo-ibm-mq-0 deleted, waiting for it to become ready...\nSleeping for 5 seconds to allow pod to resync with native ha pairs\ngitops-mq-demo-ibm-mq-0 ready\nLeaving gitops-mq-demo-ibm-mq-1 pod until the end\nNow recycling gitops-mq-demo-ibm-mq-1\npod "gitops-mq-demo-ibm-mq-1" deleted\ngitops-mq-demo-ibm-mq-1 deleted, waiting for it to become ready...\nError from server (NotFound): pods "gitops-mq-demo-ibm-mq-1" not found\nError from server (NotFound): pods "gitops-mq-demo-ibm-mq-1" not found\nError from server (NotFound): pods "gitops-mq-demo-ibm-mq-1" not found\nError from server (NotFound): pods "gitops-mq-demo-ibm-mq-1" not found\nSleeping for 5 seconds to allow pod to resync with native ha pairs\ngitops-mq-demo-ibm-mq-1 ready\nRecycle complete, the active in\n')),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"you can check the pods status by running")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"# POD 0\nkubectl describe pod/gitops-mq-demo-ibm-mq-0 -n  gitops-mq \n# POD 1\nkubectl describe pod/gitops-mq-demo-ibm-mq-1 -n  gitops-mq\n")))}m.isMDXComponent=!0}}]);