FROM ubuntu:20.10 as installs

WORKDIR /app

RUN apt-get update && \
    apt-get install -y openjdk-11-jdk && \
    apt-get install -y ant && \
    apt-get clean;

RUN apt-get update && \
    apt-get install ca-certificates-java && \
    apt-get clean && \
    update-ca-certificates -f;

ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk-amd64/

RUN export JAVA_HOME

RUN apt-get install wget --yes && apt-get install unzip --yes

RUN wget https://dl.google.com/android/repository/commandlinetools-linux-6858069_latest.zip

RUN unzip commandlinetools-linux-6858069_latest.zip -d /home

RUN apt-get install android-sdk --yes

RUN apt-get install nodejs npm --yes

RUN apt-get install build-essential --yes

RUN npm install --unsafe-perm -g expo-cli

RUN npm install -g react-native-cli

RUN npm install -g android-tools

COPY ./__tests__/ ./__tests__/

COPY ./android/ ./android/

COPY ./src/ ./src/

COPY App.js .

COPY app.json .

COPY babel.config.js .

COPY index.js .

COPY metro.config.js .

COPY package.json .

COPY yarn.lock .

RUN npm i

FROM installs as build

WORKDIR /app/android/

RUN yes | /home/cmdline-tools/bin/sdkmanager --licenses --sdk_root="/usr/lib/android-sdk"

RUN touch local.properties && echo "sdk.dir = /usr/lib/android-sdk" > local.properties && chmod 755 ./generate_keys_for_release.sh && ./generate_keys_for_release.sh

FROM build as final

WORKDIR /app/android/

CMD ./gradlew assembleRelease