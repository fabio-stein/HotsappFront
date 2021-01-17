docker build -t fabiolux/hotsappfront .
PAUSE
docker push fabiolux/hotsappfront
PAUSE
kubectl rollout restart deployment/appfront
PAUSE