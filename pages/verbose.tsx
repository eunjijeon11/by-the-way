import {
  Card,
  Stack,
  Box,
  Flex,
  Text,
  HStack,
  Circle,
  CardHeader,
  Heading,
  CardBody,
  List,
} from "@chakra-ui/react";
import "../styles/verbose.module.css";
import data from "./dummy.json";
import Script from "next/script";
import { useState } from "react";

function verboseBox(leg: any) {
  var icon: "🚍" | "🚊" | "🚆" | "🚶🏻" = "🚶🏻";
  var color: string = "gray.200";
  var verbose: string = "";
  if (leg.mode === "WALK" || leg.mode === "TRANSFER") {
    icon = "🚶🏻";
    color = "gray.200";
    verbose = "도보로 " + leg.distance + "m 이동";
  } else if (leg.mode === "BUS") {
    icon = "🚍";
    color = "#" + leg.routeColor;
    verbose = leg.route + "로 " + leg.type + "개 정류장 이동";
  } else if (leg.mode === "SUBWAY") {
    icon = "🚊";
    color = "orange.300";
    verbose = "지하철";
  } else if (leg.mode === "TRAIN") {
    icon = "🚆";
    color = "#" + leg.routeColor;
    verbose = "기차";
  }

  return (
    <>
      <Flex width="100%" height="150px" flexDirection="row">
        <Flex width="40px" height="100%" flexDirection="column">
          <Circle size="40px" bg={color}>
            <Text fontSize="xl">{icon}</Text>
          </Circle>
          <Box
            width="10px"
            flex="1"
            bg={color}
            alignSelf="center"
            marginTop="-2"
            marginBottom="-4"
          />
        </Flex>
        <Card
          flex="1"
          marginLeft="4"
          shadow="lg"
          onClick={() => {
            <Script id="onClickCard">{`moveCenter(${leg.start.lat}, ${leg.start.lon})`}</Script>;
          }}
        >
          <CardHeader>
            <Heading size="sm">
              {leg.start.name +
                "에서 " +
                (leg.sectionTime / 60).toFixed() +
                "분"}
            </Heading>
          </CardHeader>
          <CardBody>{verbose}</CardBody>
        </Card>
      </Flex>
    </>
  );
}

function Progressbar(
  legs: any[] // itineraries
) {
  var progressList: any[] = [];
  for (var i = 0; i < legs.length; i++) {
    if (legs[i].sectionTime > 0) progressList.push(verboseBox(legs[i]));
  }

  return (
    <>
      <Stack direction="column" height="-webkit-fit-content">
        {progressList}
      </Stack>
    </>
  );
}

function mainInfo() {
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
        {data.routes.map((way, i) => (
          <Box key={i} flexDirection="column">
            {Progressbar(way.legs)}
            <Card
              width="100%"
              height="100px"
              display="flex"
              shadow="lg"
              marginTop="4"
              direction="row"
              alignItems="center"
              p="4"
              onClick={() => {
                <Script id="onClick">{`
									moveCenter(${way.legs[way.legs.length - 1].end.lat}, ${
                  way.legs[way.legs.length - 1].end.lon
                })
								`}</Script>;
              }}
            >
              <Text fontSize="2xl" m="4">
                🚩
              </Text>
              <Text fontSize="md" as="b">
                {way.legs[way.legs.length - 1].end.name}
              </Text>
            </Card>
          </Box>
        ))}
      </Stack>
    </>
  );
}

function placeMarker(leg: any) {
  return (
    <Script
      id={leg.start.name}
    >{`makeMarker(${leg.start.lat}, ${leg.start.lon});`}</Script>
  );
}

export default function Verbose() {
  var scriptList: any[] = [];
  var i = 0;
  data.routes[0].legs.map((way, _) => {
    scriptList.push(
      <Script key={(i++).toString()} id={(i++).toString()}>{`
		makeMarker(${way.start.lat}, ${way.start.lon});
	`}</Script>
    );
  });
  return (
    <>
      <Flex id="bg" width="100%" height="100%">
        <Flex height="95vh" m="4" flex={1} flexDirection="column">
          <HStack paddingBottom={2} height="max-content">
            <Text fontSize="xl" as="b" noOfLines={1} maxW="10vw">
              {data.routes[0].legs[0].start.name}
            </Text>
            <Text fontSize="xl" as="b" noOfLines={1} maxW="15vw">
              ➡️ {data.routes[data.routes.length - 1].legs[0].end.name}
            </Text>
          </HStack>

          {mainInfo()}
        </Flex>
        <Script id="mapinit">
          {`
				var map = new Tmapv2.Map("map_div", {
					center: new Tmapv2.LatLng(${data.routes[0].legs[0].start.lat}, ${data.routes[0].legs[0].start.lon}),
					width: "73%",
					height: "99vh",
					zoom: 17,
				});
			
				function makeMarker(x, y) {
					var marker = new Tmapv2.Marker({
						position: new Tmapv2.LatLng(x, y),
						map: map,
					});
				}

				function makeLine(path, color) {
					var polyline = new Tmapv2.Polyline({
						path: path,
					 	strokeColor: "#" + color,
					 	strokeWeight: 6,
					 	map: map
				 	});
				}

				function moveCenter(x, y) {
					console.log("hihi");
					map.setCenter(new Tmapv2.LatLng(x, y));
				}
				`}
        </Script>
        {scriptList}
        <div id="map_div"></div>
      </Flex>
    </>
  );
}
