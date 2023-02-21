
describe-pod:
	@kubectl describe pod/mq-gitops-demo-ibm-mq-0 -n gitops-mq

install:
	@helm install  mq-gitops-demo mq-helm-eks/ibm-mq \
	  -f mq/values.yaml \
	  --set "queueManager.envVariables[0].name=MQ_ADMIN_PASSWORD" \
	  --set "queueManager.envVariables[0].value=mqpasswd" \
	  --set "queueManager.envVariables[1].name=MQ_APP_PASSWORD" \
	  --set "queueManager.envVariables[1].value=mqpasswd" 

upgrade:
	@helm upgrade  mq-gitops-demo mq-helm-eks/ibm-mq \
	  -f mq/values.yaml \
	  --set "queueManager.envVariables[0].name=MQ_ADMIN_PASSWORD" \
	  --set "queueManager.envVariables[0].value=mqpasswd" \
	  --set "queueManager.envVariables[1].name=MQ_APP_PASSWORD" \
	  --set "queueManager.envVariables[1].value=mqpasswd" 

uninstall:
	@helm uninstall  mq-gitops-demo 

get-console:
	CONSOLE_PORT=$(shell kubectl get services mq-gitops-demo-ibm-mq-web -n mq-gitops -o jsonpath="{.spec.ports[?(@.port==9443)].nodePort}")
	CONSOLE_IP=$(shell kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="ExternalIP")].address}')
	@echo https://$(CONSOLE_IP):$(CONSOLE_PORT)/ibmmq/console



namespace:
	@-kubectl create namespace mq-gitops

set-context:
	@kubectl config set-context --current --namespace=mq-gitops

config-map:
	@kubectl apply -f mq/config-map.yaml -n mq-gitops



build: namespace config-map install