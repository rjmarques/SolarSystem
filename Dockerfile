FROM node:9 as build

WORKDIR /solar_system

COPY . .

RUN npm install --dev --legacy-peer-deps

RUN npm run build

FROM scratch as release
COPY --link --from=build /solar_system/dist /dist