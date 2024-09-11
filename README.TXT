nvm install 22.8.0
nvm use 22.8.0


Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

npm audit fix --force