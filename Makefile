NAMESPACE=gitops-mq

describe-pod-0:
	@kubectl describe pod/gitops-mq-ibm-mq-0 -n $(NAMESPACE)

describe-pod-1:
	@kubectl describe pod/gitops-mq-ibm-mq-1 -n $(NAMESPACE)


dry:
	@helm install --dry-run   \
	  -f mq/values.yaml \
	  $(NAMESPACE) \
	  mq-helm-eks/ibm-mq \
	  --set "queueManager.envVariables[0].name=MQ_ADMIN_PASSWORD" \
	  --set "queueManager.envVariables[0].value=mqpasswd" \
	  --set "queueManager.envVariables[1].name=MQ_APP_PASSWORD" \
	  --set "queueManager.envVariables[1].value=mqpasswd"  \
	  -n $(NAMESPACE)

install:
	@helm install \
	  $(NAMESPACE) \
	  mq-helm-eks/ibm-mq \
	  -f mq/values.yaml \
	  --set "queueManager.envVariables[0].name=MQ_ADMIN_PASSWORD" \
	  --set "queueManager.envVariables[0].value=mqpasswd" \
	  --set "queueManager.envVariables[1].name=MQ_APP_PASSWORD" \
	  --set "queueManager.envVariables[1].value=mqpasswd"  \
	  -n $(NAMESPACE)

upgrade:
	@helm upgrade --dry-run \
	  $(NAMESPACE) \
	  -f mq/values-9.3.2.yaml \
	  mq-helm-eks/ibm-mq \
	  -n $(NAMESPACE)
#--set image.tag="9.3.2.0-r1" \

downgrade:
	@helm upgrade  \
	  $(NAMESPACE) \
	  mq-helm-eks/ibm-mq \
	  --set image.tag="9.3.1.0-r1" \
	  -n $(NAMESPACE)

uninstall:
	@-helm uninstall $(NAMESPACE)-demo 	  -n $(NAMESPACE)
	@-kubectl delete namespace $(NAMESPACE)

get-console:
	CONSOLE_PORT=$(shell kubectl get services mq-gitops-demo-ibm-mq-web -n mq-gitops -o jsonpath="{.spec.ports[?(@.port==9443)].nodePort}")
	CONSOLE_IP=$(shell kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="ExternalIP")].address}')
	@echo https://$(CONSOLE_IP):$(CONSOLE_PORT)/ibmmq/console



namespace:
	@-kubectl create namespace $(NAMESPACE)

set-context:
	@kubectl config set-context --current --namespace=$(NAMESPACE)

config-map:
	@kubectl apply -f apps/gitops-mq/config-map.yaml -n $(NAMESPACE)



build: namespace set-context config-map install