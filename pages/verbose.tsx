import { Card, Stack, Box, Flex, Text, HStack } from "@chakra-ui/react";
import Progressbar from "@/components/Progressbar";
import "../styles/verbose.module.css";
import data from "./dummy.json";
import Script from "next/script";
import { useState, useEffect } from "react";

function mainInfo() {
  var progressbar = Progressbar(data.itineraries);
  return (
    <>
      <Stack
        flex="1"
        paddingTop="3"
        overflowY="auto"
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {progressbar}
        {progressbar}
      </Stack>
    </>
  );
}

export default function Verbose() {
  var data1: any;

  const fetch = require("node-fetch");

  const url = "https://apis.openapi.sk.com/transit/routes";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      appKey: "UN27oUnc8Ma0gwH3grXRaat6I163mp0W1Osa5VUy",
    },
    body: JSON.stringify({
      startX: "126.926493082645",
      startY: "37.6134436427887",
      endX: "127.126936754911",
      endY: "37.5004198786564",
      lang: 0,
      format: "json",
      count: 10,
      searchDttm: "202301011200",
    }),
  };

  fetch(url, options)
    .then((res: any) => res.json())
    .then((json: any) => (data1 = json))
    .catch((err: any) => console.error("error:" + err));

  console.log(data);

  return (
    <>
      <Script
        id="mapinit"
        onLoad={() => {
          console.log("map load");
        }}
      >
        {`
				function initTmap(x, y) {
          var map = new Tmapv2.Map("map_div", {
            center: new Tmapv2.LatLng(x, y),
						width: "73%",
            height: "99vh",
            zoom: 17,
          });
          return map;
        }
      	initTmap(37.5652045, 126.98702028);`}
      </Script>
      <Flex id="bg" width="100%" height="100%">
        <Flex height="95vh" m="4" flex={1} flexDirection="column">
          <HStack paddingBottom={2} height="max-content">
            <Text fontSize="xl" as="b" noOfLines={1} maxW="10vw">
              {data.itineraries[0].legs[0].start.name}
            </Text>
            <Text fontSize="xl" as="b" noOfLines={1} maxW="15vw">
              ➡️ {data.itineraries[0].legs[0].end.name}
            </Text>
          </HStack>

          {mainInfo()}
        </Flex>
        <div id="map_div"></div>
      </Flex>
    </>
  );
}
