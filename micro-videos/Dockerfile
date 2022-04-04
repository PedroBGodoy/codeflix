FROM node:16.14.2-slim

RUN apt update && apt install -y \
    git \
    ca-certificates \
    openjdk-11-jre-headless \
    zsh \
    curl \
    wget \
    fonts-powerline

ENV JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"

USER node

WORKDIR /home/node/app

RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.2/zsh-in-docker.sh)" -- \
    -t https://github.com/romkatv/powerlevel10k \
    -p git zsh-autosuggestions \
    -p https://github.com/zsh-users/zsh-completions \
    -a 'export TERM=xterm-256color'

RUN echo '[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh' >> ~/.zshrc

CMD [ "sh", "-c", "npm install && tail -f /dev/null" ]