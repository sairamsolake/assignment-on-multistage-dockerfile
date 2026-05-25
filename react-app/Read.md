
📌 Project Overview

This project demonstrates a Production-Ready Kubernetes Deployment for a React application served using NGINX.

The React application is containerized using a multi-stage Docker build and deployed on Kubernetes using production best practices including:

Namespace Isolation
ConfigMap & Secret Management
Persistent Volume & PVC
Node Affinity
Taints & Tolerations
Health Probes
Rolling Updates
Horizontal Pod Autoscaler (HPA)
Non-root Container Security
NodePort Service Exposure


🏗️ Architecture

React App
    ↓
Docker Multi-Stage Build
    ↓
NGINX Container
    ↓
Kubernetes Deployment
    ↓
NodePort Service
    ↓
HPA Auto Scaling


🚀 Technologies Used

React JS
Docker
NGINX
Kubernetes
Metrics Server
Horizontal Pod Autoscaler (HPA)

📁 Kubernetes Manifests

k8s-manifests/
│
├── 01-namespace.yaml
├── 02-configmap.yaml
├── 03-secret.yaml
├── 04-pv.yaml
├── 05-pvc.yaml
├── 06-serviceaccount.yaml
├── 07-deployment.yaml
├── 08-service.yaml
└── 09-hpa.yaml

⚙️ Features Implemented

✅ Namespace
Dedicated namespace: react
✅ ConfigMap
Mounted as file inside container
✅ Secret
Mounted using volumeMounts
✅ Deployment Best Practices
Included:
Replicas
revisionHistoryLimit
RollingUpdate strategy
Resource Requests & Limits
imagePullPolicy
Service Account
✅ Security Best Practices

Container runs as non-root user using:

runAsUser: 1001
runAsGroup: 1001
fsGroup: 1001
✅ Health Probes

Implemented:

Liveness Probe
Readiness Probe
Startup Probe
✅ Scheduling

Implemented:

Node Affinity
Taints & Tolerations
✅ Persistent Storage

Configured:

PersistentVolume (PV)
PersistentVolumeClaim (PVC)
✅ Service Exposure

Used:

NodePort Service

Application exposed on:

http://<NODE-IP>:30080
✅ Horizontal Pod Autoscaler (HPA)

Configured:

Minimum Replicas: 5
Maximum Replicas: 10
CPU-based scaling


🐳 Docker Build
Build Image
docker build -t yourdockerhub/react-nginx-app:v2 .

Push Image
docker push yourdockerhub/react-nginx-app:v2

☸️ Kubernetes Deployment Steps
1️⃣ Create Namespace
kubectl apply -f 01-namespace.yaml

2️⃣ Deploy Remaining Resources
kubectl apply -f .

🖥️ Node Label & Taint Configuration
Add Label
kubectl label node <worker-node> environment=prod
Add Taint
kubectl taint nodes <worker-node> environment=prod:NoSchedule

📈 Configure Metrics Server
Install Metrics Server
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
Patch Metrics Server
kubectl patch deployment metrics-server -n kube-system \
--type='json' \
-p='[
{"op":"add","path":"/spec/template/spec/containers/0/args/-","value":"--kubelet-insecure-tls"},
{"op":"add","path":"/spec/template/spec/containers/0/args/-","value":"--kubelet-preferred-address-types=InternalIP"}
]'

📊 Verify Deployment
Check Resources
kubectl get all -n react
Check HPA
kubectl get hpa -n react
Check Metrics
kubectl top nodes
kubectl top pods -n react


🔥 Load Testing HPA
Create Load Generator
kubectl run -i --tty load-generator --rm --image=busybox -n react -- /bin/sh

Inside container:

while true; do wget -q -O- http://react-service:8080; done
📈 Observe Auto Scaling
kubectl get pods -n react -w

Expected scaling:

5 → 6 → 7 → 10 Pods
🌐 Access Application
http://<NODE-IP>:30080
📌 Key Learnings
Production-grade Kubernetes deployment
Kubernetes scheduling concepts
Autoscaling using HPA
Metrics Server troubleshooting
Persistent storage handling
Kubernetes security best practices
Health monitoring using probes
✅ Final Outcome

Successfully deployed a Production-Ready React + NGINX application on Kubernetes with:

Secure deployment
Persistent storage
Autoscaling
Scheduling constraints
Health monitoring
NodePort exposure

Production best practices
👨‍💻 Author

Sairam Solake

